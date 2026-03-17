import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ShieldAlert, Check, X, ChevronRight, AlertTriangle } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { Avatar } from "@/components/Avatar";
import { mockSpamMessages, SpamMessage } from "@/data/mockData";

const SpamMessagesPage: React.FC = () => {
  const { groupId } = useParams();
  const [spamList, setSpamList] = useState<SpamMessage[]>(mockSpamMessages);
  const [selected, setSelected] = useState<SpamMessage | null>(null);
  const [notification, setNotification] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showNotif = (msg: string, type: "success" | "error") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 2500);
  };

  const handleAccept = (id: string) => {
    setSpamList((prev) => prev.filter((s) => s.id !== id));
    setSelected(null);
    showNotif("Message approved and sent ✓", "success");
  };

  const handleDecline = (id: string) => {
    setSpamList((prev) => prev.filter((s) => s.id !== id));
    setSelected(null);
    showNotif("Message declined. Spam count reduced.", "error");
  };

  return (
    <div className="app-container bg-background">
      <AppHeader title="Spam Messages" showBack />

      {/* Notification toast */}
      {notification && (
        <div
          className={`mx-4 mt-2 px-4 py-3 rounded-xl text-sm font-medium animate-scale-in ${
            notification.type === "success"
              ? "bg-accent text-accent-foreground"
              : "bg-destructive/10 text-destructive"
          }`}
        >
          {notification.msg}
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        {spamList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mb-4">
              <ShieldAlert size={36} className="text-primary" />
            </div>
            <p className="text-base font-semibold text-foreground">All clear!</p>
            <p className="text-sm mt-1">No flagged messages in this group</p>
          </div>
        ) : (
          <>
            {/* Info banner */}
            <div className="mx-4 mt-4 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-3">
              <AlertTriangle size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-amber-800">Spam Review Queue</p>
                <p className="text-xs text-amber-700 mt-0.5">
                  {spamList.length} message{spamList.length !== 1 ? "s" : ""} flagged for review.
                  Users with 3+ spam violations are auto-removed.
                </p>
              </div>
            </div>

            {/* List */}
            <div className="mx-4 mt-4 space-y-3">
              {spamList.map((spam) => (
                <div
                  key={spam.id}
                  className="bg-card rounded-2xl border border-border shadow-card overflow-hidden"
                >
                  <div
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-secondary transition"
                    onClick={() => setSelected(selected?.id === spam.id ? null : spam)}
                  >
                    <Avatar name={spam.userName} size="md" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">{spam.userName}</p>
                      <p className="text-xs text-muted-foreground truncate">{spam.preview}</p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className="text-xs text-muted-foreground">{spam.timestamp}</span>
                      <ChevronRight
                        size={14}
                        className={`text-muted-foreground transition-transform ${selected?.id === spam.id ? "rotate-90" : ""}`}
                      />
                    </div>
                  </div>

                  {/* Expanded */}
                  {selected?.id === spam.id && (
                    <div className="px-4 pb-4 border-t border-border">
                      <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-3 mt-3 mb-4">
                        <p className="text-sm text-foreground leading-relaxed">{spam.fullMessage}</p>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleDecline(spam.id)}
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-destructive/30 text-destructive text-sm font-medium hover:bg-destructive/5 transition"
                        >
                          <X size={16} />
                          Decline
                        </button>
                        <button
                          onClick={() => handleAccept(spam.id)}
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition"
                        >
                          <Check size={16} />
                          Accept & Send
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SpamMessagesPage;
