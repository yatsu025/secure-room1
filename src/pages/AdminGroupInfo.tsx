import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  UserPlus, Link, ShieldAlert, BookOpen, ChevronRight,
  Crown, Shield, UserCheck, Mail, Clock, MoreVertical, Check, X
} from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { Avatar } from "@/components/Avatar";
import { RoleBadge } from "@/components/RoleBadge";
import { mockGroups, GroupMember } from "@/data/mockData";

const AdminGroupInfoPage: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const [showRoleMenu, setShowRoleMenu] = useState<string | null>(null);

  const group = mockGroups.find((g) => g.id === groupId) || mockGroups[0];

  const [members, setMembers] = useState<GroupMember[]>(group.members);
  const [pending, setPending] = useState<GroupMember[]>(group.pendingMembers);

  const handleRoleChange = (memberId: string, newRole: "coadmin" | "user") => {
    setMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, role: newRole } : m))
    );
    setShowRoleMenu(null);
  };

  const acceptPending = (id: string) => {
    const member = pending.find((p) => p.id === id);
    if (member) {
      setMembers((prev) => [...prev, { ...member, role: "user" }]);
      setPending((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const declinePending = (id: string) => {
    setPending((prev) => prev.filter((p) => p.id !== id));
  };

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
          <div className="flex items-center gap-2 mt-3 bg-white/10 px-3 py-1.5 rounded-full">
            <Crown size={12} className="text-yellow-300" />
            <span className="text-white/80 text-xs">You are the Admin</span>
          </div>
        </div>

        {/* Admin Actions */}
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
              <p className="text-xs text-muted-foreground">Configure AI providers</p>
            </div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>
          <button
            onClick={() => navigate(`/spam/${group.id}`)}
            className="flex items-center gap-3 px-4 py-4 w-full hover:bg-secondary transition border-b border-border"
          >
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <ShieldAlert size={18} className="text-destructive" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-foreground">Spam Messages</p>
              <p className="text-xs text-muted-foreground">Review flagged content</p>
            </div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>
          <button
            onClick={() => navigate(`/knowledge-base`)}
            className="flex items-center gap-3 px-4 py-4 w-full hover:bg-secondary transition"
          >
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <BookOpen size={18} className="text-muted-foreground" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-foreground">Knowledge Base</p>
              <p className="text-xs text-muted-foreground">Coming soon</p>
            </div>
            <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">Soon</span>
          </button>
        </div>

        {/* Add Member */}
        <div className="mx-4 mt-4">
          <button className="flex items-center gap-3 px-4 py-3 w-full bg-card rounded-2xl border border-border hover:bg-secondary transition shadow-card">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
              <UserPlus size={18} className="text-accent-foreground" />
            </div>
            <span className="text-sm font-medium text-foreground">Add Member</span>
          </button>
        </div>

        {/* Pending Members */}
        {pending.length > 0 && (
          <div className="mx-4 mt-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-2">
              Pending Requests ({pending.length})
            </p>
            <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-card">
              {pending.map((p, idx) => (
                <div
                  key={p.id}
                  className={`flex items-center gap-3 px-4 py-3 ${idx < pending.length - 1 ? "border-b border-border" : ""}`}
                >
                  <Avatar name={p.name} size="md" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{p.email}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => acceptPending(p.id)}
                      className="w-8 h-8 rounded-full bg-accent flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition"
                    >
                      <Check size={14} className="text-accent-foreground" />
                    </button>
                    <button
                      onClick={() => declinePending(p.id)}
                      className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center hover:bg-destructive hover:text-white transition"
                    >
                      <X size={14} className="text-destructive" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Members List */}
        <div className="mx-4 mt-4 mb-8">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-2">
            Members ({members.length})
          </p>
          <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-card">
            {members.map((member, idx) => (
              <div
                key={member.id}
                className={`flex items-center gap-3 px-4 py-3 relative ${idx < members.length - 1 ? "border-b border-border" : ""}`}
              >
                <Avatar name={member.name} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground truncate">{member.name}</p>
                    <RoleBadge role={member.role} />
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{member.email}</p>
                  {member.spamCount > 0 && (
                    <p className="text-xs text-destructive mt-0.5">
                      ⚠️ {member.spamCount}/{member.spamLimit} spam warnings
                    </p>
                  )}
                </div>
                {member.role !== "admin" && (
                  <div className="relative">
                    <button
                      onClick={() => setShowRoleMenu(showRoleMenu === member.id ? null : member.id)}
                      className="p-2 text-muted-foreground hover:text-foreground transition"
                    >
                      <MoreVertical size={16} />
                    </button>
                    {showRoleMenu === member.id && (
                      <div className="absolute right-0 top-8 z-10 bg-card rounded-xl shadow-lg border border-border overflow-hidden animate-scale-in w-40">
                        {member.role !== "coadmin" && (
                          <button
                            onClick={() => handleRoleChange(member.id, "coadmin")}
                            className="flex items-center gap-2 px-3 py-2.5 w-full hover:bg-secondary text-sm"
                          >
                            <Shield size={14} className="text-primary" /> Make Co-Admin
                          </button>
                        )}
                        {member.role !== "user" && (
                          <button
                            onClick={() => handleRoleChange(member.id, "user")}
                            className="flex items-center gap-2 px-3 py-2.5 w-full hover:bg-secondary text-sm"
                          >
                            <UserCheck size={14} /> Set as Member
                          </button>
                        )}
                        <div className="h-px bg-border" />
                        <button className="flex items-center gap-2 px-3 py-2.5 w-full hover:bg-destructive/10 text-sm text-destructive">
                          <X size={14} /> Remove
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminGroupInfoPage;
