import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Phone, Mail, User, Calendar, ChevronRight, LogOut, Bell, Shield } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { Avatar } from "@/components/Avatar";
import { currentUser } from "@/data/mockData";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState(currentUser);
  const [editing, setEditing] = useState<string | null>(null);
  const [tempVal, setTempVal] = useState("");

  const startEdit = (field: string, val: string) => {
    setEditing(field);
    setTempVal(val);
  };

  const saveEdit = (field: string) => {
    setUser((prev) => ({ ...prev, [field]: tempVal }));
    setEditing(null);
  };

  const fields = [
    { key: "name", label: "Name", icon: <User size={16} />, value: user.name },
    { key: "phone", label: "Phone Number", icon: <Phone size={16} />, value: user.phone },
    { key: "email", label: "Email", icon: <Mail size={16} />, value: user.email },
    { key: "dob", label: "Date of Birth", icon: <Calendar size={16} />, value: user.dob || "" },
  ];

  return (
    <div className="app-container bg-background">
      <AppHeader title="Profile" showBack />

      <div className="flex-1 overflow-y-auto">
        {/* Avatar section */}
        <div
          className="px-6 py-8 flex flex-col items-center"
          style={{ background: "var(--gradient-header)" }}
        >
          <div className="relative">
            <Avatar name={user.name} size="xl" className="ring-4 ring-white/30" />
            <button
              onClick={() => fileRef.current?.click()}
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-secondary transition"
            >
              <Camera size={14} className="text-primary" />
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" />
          </div>
          <h2 className="text-white text-lg font-semibold mt-3">{user.name}</h2>
          <p className="text-white/70 text-sm">{user.email}</p>
        </div>

        {/* Fields */}
        <div className="mx-4 mt-4 bg-card rounded-2xl border border-border overflow-hidden shadow-card">
          {fields.map((field, idx) => (
            <div
              key={field.key}
              className={`flex items-center gap-3 px-4 py-4 ${idx < fields.length - 1 ? "border-b border-border" : ""}`}
            >
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground flex-shrink-0">
                {field.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground mb-0.5">{field.label}</p>
                {editing === field.key ? (
                  <input
                    type={field.key === "dob" ? "date" : "text"}
                    value={tempVal}
                    onChange={(e) => setTempVal(e.target.value)}
                    onBlur={() => saveEdit(field.key)}
                    onKeyDown={(e) => e.key === "Enter" && saveEdit(field.key)}
                    className="text-sm text-foreground bg-transparent border-b border-primary outline-none w-full pb-0.5"
                    autoFocus
                  />
                ) : (
                  <p className="text-sm text-foreground truncate">{field.value || "—"}</p>
                )}
              </div>
              <button
                onClick={() => startEdit(field.key, field.value)}
                className="text-xs text-primary font-medium hover:underline flex-shrink-0"
              >
                Edit
              </button>
            </div>
          ))}
        </div>

        {/* Settings */}
        <div className="mx-4 mt-4 bg-card rounded-2xl border border-border overflow-hidden shadow-card">
          <button className="flex items-center gap-3 px-4 py-4 w-full hover:bg-secondary transition border-b border-border">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <Bell size={16} className="text-muted-foreground" />
            </div>
            <span className="flex-1 text-sm text-foreground text-left">Notifications</span>
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>
          <button className="flex items-center gap-3 px-4 py-4 w-full hover:bg-secondary transition">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <Shield size={16} className="text-muted-foreground" />
            </div>
            <span className="flex-1 text-sm text-foreground text-left">Privacy & Security</span>
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>
        </div>

        {/* Logout */}
        <div className="mx-4 mt-4 mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl border border-destructive/30 text-destructive hover:bg-destructive/5 transition text-sm font-medium"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
