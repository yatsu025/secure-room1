import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserPlus, Link, Languages, ChevronRight, ShieldAlert } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { Avatar } from "@/components/Avatar";
import { RoleBadge } from "@/components/RoleBadge";
import { mockGroups, maskEmail } from "@/data/mockData";

const UserGroupInfoPage: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const [requestSent, setRequestSent] = useState(false);

  const group = mockGroups.find((g) => g.id === groupId) || mockGroups[0];

  // Get current user's spam stats from group
  const myMember = group.members.find((m) => m.id === "m1");

  return (
    <div className="app-container bg-background">
      <AppHeader title="Group Info" showBack />

      <div className="flex-1 overflow-y-auto">
        {/* Group banner */}
        <div
          className="px-6 py-8 flex flex-col items-center text-center"
          style={{ background: "var(--gradient-header)" }}
        >
          <Avatar name={group.name} size="xl" className="ring-4 ring-white/30 mb-3" />
          <h2 className="text-white text-xl font-bold">{group.name}</h2>
          <p className="text-white/70 text-sm mt-1">{group.description}</p>
          <p className="text-white/50 text-xs mt-2">{group.members.length} members</p>
        </div>

        {/* Spam usage stats */}
        {myMember && (
          <div className="mx-4 mt-4 bg-card rounded-2xl border border-border p-4 shadow-card">
            <div className="flex items-center gap-2 mb-3">
              <ShieldAlert size={16} className="text-primary" />
              <p className="text-sm font-semibold text-foreground">Your Spam Usage</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-secondary rounded-full h-2 overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${(myMember.spamCount / myMember.spamLimit) * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium text-foreground">
                {myMember.spamCount}/{myMember.spamLimit}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {myMember.spamLimit - myMember.spamCount} attempts remaining
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="mx-4 mt-4 bg-card rounded-2xl overflow-hidden border border-border shadow-card">
          <button
            onClick={() => navigate(`/api-integration/${group.id}`)}
            className="flex items-center gap-3 px-4 py-4 w-full hover:bg-secondary transition border-b border-border"
          >
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
              <Link size={18} className="text-accent-foreground" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-foreground">API Integration</p>
              <p className="text-xs text-muted-foreground">Configure AI features</p>
            </div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>
          <button className="flex items-center gap-3 px-4 py-4 w-full hover:bg-secondary transition">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <Languages size={18} className="text-muted-foreground" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-foreground">Translation</p>
              <p className="text-xs text-muted-foreground">Auto-translate messages</p>
            </div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>
        </div>

        {/* Add member request */}
        <div className="mx-4 mt-4">
          <button
            onClick={() => setRequestSent(true)}
            disabled={requestSent}
            className="flex items-center gap-3 px-4 py-3 w-full bg-card rounded-2xl border border-border hover:bg-secondary transition shadow-card disabled:opacity-60"
          >
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
              <UserPlus size={18} className="text-accent-foreground" />
            </div>
            <span className="text-sm font-medium text-foreground">
              {requestSent ? "Request Sent ✓" : "Request to Add Member"}
            </span>
          </button>
        </div>

        {/* Members — emails masked */}
        <div className="mx-4 mt-4 mb-8">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-2">
            Members ({group.members.length})
          </p>
          <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-card">
            {group.members.map((member, idx) => (
              <div
                key={member.id}
                className={`flex items-center gap-3 px-4 py-3 ${idx < group.members.length - 1 ? "border-b border-border" : ""}`}
              >
                <Avatar name={member.name} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground truncate">{member.name}</p>
                    <RoleBadge role={member.role} />
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {maskEmail(member.email)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserGroupInfoPage;
