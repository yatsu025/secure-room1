import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Send, Sparkles, Languages, MoreVertical, Mic, Paperclip } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { Avatar } from "@/components/Avatar";
import { mockGroups, mockMessages, Message, currentUserRole } from "@/data/mockData";
import { cn } from "@/lib/utils";

const ChatPage: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [input, setInput] = useState("");
  const [showAIMenu, setShowAIMenu] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const group = mockGroups.find((g) => g.id === groupId) || mockGroups[0];
  const isAdmin = currentUserRole === "admin" || currentUserRole === "coadmin";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: `msg${Date.now()}`,
      senderId: "me",
      senderName: "Alex Johnson",
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isOwn: true,
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleGroupInfoClick = () => {
    if (isAdmin) navigate(`/group-info-admin/${group.id}`);
    else navigate(`/group-info-user/${group.id}`);
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
          <button className="flex items-center gap-3 px-4 py-3 w-full hover:bg-secondary text-sm text-foreground">
            <Sparkles size={16} className="text-primary" />
            <div className="text-left">
              <div className="font-medium">Summary AI</div>
              <div className="text-xs text-muted-foreground">Summarize conversation</div>
            </div>
          </button>
          <div className="h-px bg-border" />
          <button className="flex items-center gap-3 px-4 py-3 w-full hover:bg-secondary text-sm text-foreground">
            <Languages size={16} className="text-primary" />
            <div className="text-left">
              <div className="font-medium">Translate AI</div>
              <div className="text-xs text-muted-foreground">Translate messages</div>
            </div>
          </button>
        </div>
      )}

      {/* Chat background */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4 space-y-2"
        style={{ backgroundImage: "radial-gradient(hsl(var(--border)) 1px, transparent 1px)", backgroundSize: "20px 20px", backgroundColor: "hsl(210 11% 94%)" }}
      >
        {/* Date divider */}
        <div className="flex items-center justify-center">
          <span className="bg-white/80 text-xs text-muted-foreground px-3 py-1 rounded-full shadow-sm">
            Today
          </span>
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn("flex", msg.isOwn ? "justify-end" : "justify-start")}
          >
            <div className={cn("max-w-[78%]")}>
              {!msg.isOwn && (
                <p className="text-xs text-primary font-medium mb-1 ml-1">{msg.senderName}</p>
              )}
              <div className={cn(msg.isOwn ? "bubble-sent" : "bubble-received")}>
                <p className="text-sm leading-relaxed">{msg.content}</p>
                <p
                  className={cn(
                    "text-xs mt-1 text-right",
                    msg.isOwn ? "text-white/60" : "text-muted-foreground"
                  )}
                >
                  {msg.timestamp}
                  {msg.isOwn && <span className="ml-1">✓✓</span>}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Bar */}
      <div className="bg-card border-t border-border px-3 py-2 flex items-end gap-2">
        <button className="p-2 text-muted-foreground hover:text-primary transition flex-shrink-0">
          <Paperclip size={20} />
        </button>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="chat-input flex-1"
          rows={1}
        />
        <button
          onClick={sendMessage}
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all",
            input.trim()
              ? "bg-primary text-primary-foreground hover:opacity-90 scale-100"
              : "bg-muted text-muted-foreground scale-95"
          )}
        >
          {input.trim() ? <Send size={18} /> : <Mic size={18} />}
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
