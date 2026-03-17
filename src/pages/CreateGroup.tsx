import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Users, FileText, UserPlus, X, Zap } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { Avatar } from "@/components/Avatar";
import { mockGroups } from "@/data/mockData";

const CreateGroupPage: React.FC = () => {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [emails, setEmails] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [dpPreview, setDpPreview] = useState<string | null>(null);

  const addEmail = () => {
    const trimmed = emailInput.trim();
    if (trimmed && !emails.includes(trimmed)) {
      setEmails((prev) => [...prev, trimmed]);
      setEmailInput("");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setDpPreview(url);
    }
  };

  const handleGenerate = () => {
    if (!name.trim() || !dpPreview) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 1500);
  };

  const allMembers = mockGroups[0].members.slice(1, 4);

  return (
    <div className="app-container bg-background">
      <AppHeader title="Create Group" showBack />

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-5">
        {/* Group DP */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div
              className="w-24 h-24 rounded-full bg-secondary border-2 border-dashed border-border flex items-center justify-center overflow-hidden cursor-pointer hover:bg-muted transition"
              onClick={() => fileRef.current?.click()}
            >
              {dpPreview ? (
                <img src={dpPreview} alt="Group DP" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center text-muted-foreground">
                  <Camera size={28} />
                  <span className="text-xs mt-1">Add Photo</span>
                </div>
              )}
            </div>
            <button
              onClick={() => fileRef.current?.click()}
              className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow"
            >
              <Camera size={12} />
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </div>
          <p className="text-xs text-muted-foreground">
            {dpPreview ? "Tap to change photo" : "Group photo is required"}
          </p>
        </div>

        {/* Group Name */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            <Users size={14} className="inline mr-1.5 text-primary" />
            Group Name <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter group name..."
            maxLength={60}
            className="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
          />
          <p className="text-xs text-muted-foreground mt-1 text-right">{name.length}/60</p>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            <FileText size={14} className="inline mr-1.5 text-primary" />
            Description
          </label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="What is this group about?"
            rows={3}
            maxLength={200}
            className="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition resize-none"
          />
        </div>

        {/* Add Members */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            <UserPlus size={14} className="inline mr-1.5 text-primary" />
            Add Members
          </label>
          <div className="flex gap-2">
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addEmail()}
              placeholder="Enter email address..."
              className="flex-1 px-4 py-3 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
            />
            <button
              onClick={addEmail}
              className="px-4 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition"
            >
              Add
            </button>
          </div>

          {/* Added emails */}
          {emails.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {emails.map((email) => (
                <div
                  key={email}
                  className="flex items-center gap-1.5 bg-accent text-accent-foreground text-xs px-3 py-1.5 rounded-full"
                >
                  <span className="truncate max-w-32">{email}</span>
                  <button
                    onClick={() => setEmails((prev) => prev.filter((e) => e !== email))}
                    className="hover:text-destructive transition"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Suggested contacts */}
          <p className="text-xs text-muted-foreground mt-3 mb-2">Suggested contacts</p>
          <div className="space-y-2">
            {allMembers.map((m) => (
              <div
                key={m.id}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-secondary cursor-pointer"
                onClick={() => {
                  if (!emails.includes(m.email)) setEmails((prev) => [...prev, m.email]);
                }}
              >
                <Avatar name={m.name} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{m.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{m.email}</p>
                </div>
                {emails.includes(m.email) && (
                  <span className="text-primary text-xs font-medium">Added</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <div className="px-4 py-4 border-t border-border bg-card">
        <button
          onClick={handleGenerate}
          disabled={!name.trim() || !dpPreview || loading}
          className="w-full py-3.5 rounded-xl text-sm font-semibold text-primary-foreground flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
          style={{ background: "var(--gradient-header)" }}
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Creating Group...
            </>
          ) : (
            <>
              <Zap size={16} />
              Generate Group
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CreateGroupPage;
