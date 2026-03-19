import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Send, Sparkles, Languages, MoreVertical, Mic, Paperclip, Pencil, Trash2, X } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { Avatar } from "@/components/Avatar";
import { mockGroups, mockMessages, Message, currentUserRole } from "@/data/mockData";
import { cn } from "@/lib/utils";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import doubleCheck from "@/PUBLIC/image.png";

const ChatPage: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [input, setInput] = useState("");
  const [showAIMenu, setShowAIMenu] = useState(false);
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);
  const isDarkMode = document.documentElement.classList.contains("dark");
  const bottomRef = useRef<HTMLDivElement>(null);

  const group = mockGroups.find((g) => g.id === groupId) || mockGroups[0];
  const isAdmin = currentUserRole === "admin" || currentUserRole === "coadmin";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    if (editingMessage) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === editingMessage.id ? { ...msg, content: input.trim(), isEdited: true } : msg
        )
      );
      setEditingMessage(null);
    } else {
      const newMsg: Message = {
        id: `msg${Date.now()}`,
        senderId: "me",
        senderName: "Alex Johnson",
        content: input.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isOwn: true,
      };
      setMessages((prev) => [...prev, newMsg]);
    }
    setInput("");
  };

  const handleEdit = (msg: Message) => {
    setEditingMessage(msg);
    setInput(msg.content);
  };

  const cancelEdit = () => {
    setEditingMessage(null);
    setInput("");
  };

  const deleteForMe = (msgId: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== msgId));
  };

  const deleteForEveryone = (msgId: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === msgId ? { ...msg, content: "This message was deleted", isDeleted: true } : msg
      )
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const [showSummary, setShowSummary] = useState(false);
  const [summary, setSummary] = useState("");

  const handleGroupInfoClick = () => {
    if (isAdmin) navigate(`/group-info-admin/${group.id}`);
    else navigate(`/group-info-user/${group.id}`);
  };

  const generateSummary = () => {
    const summaryText = messages
      .slice(-10)
      .map((msg) => `${msg.senderName}: ${msg.content}`)
      .join("\n");
    setSummary(`Here's a summary of the last 10 messages:\n\n${summaryText}`);
  };

  const handleSummary = () => {
    generateSummary();
    setShowSummary(true);
    setShowAIMenu(false);
  };

  const [isTranslated, setIsTranslated] = useState(false);
  const [translatedMessages, setTranslatedMessages] = useState<Message[]>([]);

  const handleTranslate = () => {
    if (isTranslated) {
      setIsTranslated(false);
    } else {
      const newTranslatedMessages = messages.map(msg => ({ ...msg, content: `${msg.content} (translated to Hindi)` }));
      setTranslatedMessages(newTranslatedMessages);
      setIsTranslated(true);
    }
    setShowAIMenu(false);
  };

  return (
    <div className="app-container bg-background">
      {/* Header */}
      <AppHeader
        title={group.name}
        subtitle={`${group.members.length} members`}
        showBack
        leftSlot={
          <button onClick={handleGroupInfoClick} className="flex-shrink-0">
            <Avatar name={group.name} size="md" className="ring-2 ring-white/30" />
          </button>
        }
        rightSlot={
          <>
            <button
              onClick={() => setShowAIMenu(!showAIMenu)}
              className="p-2 rounded-full hover:bg-white/10 transition relative"
              title="AI Tools"
            >
              <Sparkles size={20} />
            </button>
            <button
              className="p-2 rounded-full hover:bg-white/10 transition"
              title="More"
            >
              <MoreVertical size={20} />
            </button>
          </>
        }
      />

      {/* AI Dropdown */}
      {showAIMenu && (
        <div
          className="absolute top-16 right-2 z-50 bg-card rounded-xl shadow-lg border border-border overflow-hidden animate-scale-in"
          onMouseLeave={() => setShowAIMenu(false)}
        >
          <button onClick={handleSummary} className="flex items-center gap-3 px-4 py-3 w-full hover:bg-secondary text-sm text-foreground">
            <Sparkles size={16} className="text-primary" />
            <div className="text-left">
              <div className="font-medium">Summary AI</div>
              <div className="text-xs text-muted-foreground">Summarize conversation</div>
            </div>
          </button>
          <div className="h-px bg-border" />
          <button onClick={handleTranslate} className="flex items-center gap-3 px-4 py-3 w-full hover:bg-secondary text-sm text-foreground">
            <Languages size={16} className="text-primary" />
            <div className="text-left">
              <div className="font-medium">{isTranslated ? "Original" : "Translate AI"}</div>
              <div className="text-xs text-muted-foreground">{isTranslated ? "Show original messages" : "Translate messages"}</div>
            </div>
          </button>
        </div>
      )}

      <Dialog open={showSummary} onOpenChange={setShowSummary}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chat Summary</DialogTitle>
            <DialogDescription>
              {summary}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Chat background */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
        style={{ 
          backgroundImage: isDarkMode 
            ? "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)" 
            : "radial-gradient(hsl(var(--border)) 1px, transparent 1px)", 
          backgroundSize: "20px 20px", 
          backgroundColor: isDarkMode ? "hsl(210 15% 8%)" : "hsl(210 11% 94%)" 
        }}
      >
        {/* Date divider */}
        <div className="flex items-center justify-center mb-4">
          <span className="bg-card text-[10px] uppercase tracking-wider font-semibold text-muted-foreground px-3 py-1 rounded-full shadow-sm border border-border">
            Today
          </span>
        </div>

        {(isTranslated ? translatedMessages : messages).map((msg) => (
          <div
            key={msg.id}
            className={cn("flex", msg.isOwn ? "justify-end" : "justify-start")}
          >
            <div className={cn("max-w-[85%]")}>
              {!msg.isOwn && (
                <p className="text-[11px] text-primary font-bold mb-0.5 ml-2 opacity-90">{msg.senderName}</p>
              )}
              <Popover>
                <PopoverTrigger asChild>
                  <div className={cn(
                    msg.isOwn ? "bubble-sent cursor-pointer" : "bubble-received",
                    "relative pr-4 min-w-[60px]",
                    msg.isDeleted && "italic opacity-60"
                  )}>
                    <div className="flex flex-wrap items-end gap-x-2 gap-y-0.5">
                      <p className="text-sm leading-relaxed break-words flex-1 min-w-[80px]">
                        {msg.content}
                        {msg.isEdited && !msg.isDeleted && (
                          <span className="text-[10px] ml-1 opacity-70">(edited)</span>
                        )}
                      </p>
                      <div className="flex items-center gap-0.5 ml-auto pt-1 pb-0.5 shrink-0">
                        <span className={cn(
                          "text-[10px] font-medium leading-none",
                          msg.isOwn ? "text-white/70" : "text-muted-foreground"
                        )}>
                          {msg.timestamp}
                        </span>
                        {msg.isOwn && !msg.isDeleted && (
                          <img 
                            src={doubleCheck} 
                            alt="check" 
                            className="w-3.5 h-3.5 object-contain -mr-1"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </PopoverTrigger>
                {msg.isOwn && !msg.isDeleted && (
                  <PopoverContent className="w-48 p-1" align="end">
                    <div className="flex flex-col">
                      <button
                        onClick={() => handleEdit(msg)}
                        className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary rounded-md transition-colors"
                      >
                        <Pencil size={14} />
                        Edit Message
                      </button>
                      <button
                        onClick={() => deleteForMe(msg.id)}
                        className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary rounded-md transition-colors"
                      >
                        <Trash2 size={14} />
                        Delete for me
                      </button>
                      <button
                        onClick={() => deleteForEveryone(msg.id)}
                        className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-destructive/10 text-destructive rounded-md transition-colors font-medium"
                      >
                        <Trash2 size={14} />
                        Delete for everyone
                      </button>
                    </div>
                  </PopoverContent>
                )}
                {!msg.isOwn && !msg.isDeleted && (
                  <PopoverContent className="w-40 p-1" align="start">
                    <button
                      onClick={() => deleteForMe(msg.id)}
                      className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-secondary w-full rounded-md transition-colors"
                    >
                      <Trash2 size={14} />
                      Delete for me
                    </button>
                  </PopoverContent>
                )}
              </Popover>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Editing indicator */}
      {editingMessage && (
        <div className="bg-secondary/30 px-4 py-2 flex items-center justify-between border-t border-border animate-in slide-in-from-bottom-2">
          <div className="flex items-center gap-2 text-primary">
            <Pencil size={14} />
            <div className="text-xs truncate max-w-[200px]">
              Editing: <span className="italic">"{editingMessage.content}"</span>
            </div>
          </div>
          <button onClick={cancelEdit} className="p-1 hover:bg-secondary rounded-full">
            <X size={16} className="text-muted-foreground" />
          </button>
        </div>
      )}

      {/* Input Bar */}
      <div className="bg-card border-t border-border px-3 py-2 flex items-end gap-2">
        <button className="p-2 text-muted-foreground hover:text-primary transition flex-shrink-0">
          <Paperclip size={20} />
        </button>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={editingMessage ? "Edit message..." : "Type a message..."}
          className="chat-input flex-1 bg-secondary/50 focus:bg-secondary transition-colors"
          rows={1}
        />
        <button
          onClick={sendMessage}
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all shadow-sm",
            input.trim()
              ? "bg-primary text-primary-foreground hover:opacity-90 scale-100"
              : "bg-muted text-muted-foreground scale-95"
          )}
        >
          {editingMessage ? <Send size={18} /> : (input.trim() ? <Send size={18} /> : <Mic size={18} />)}
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
