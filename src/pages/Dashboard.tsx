import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, User, Shield, Moon, Sun } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { Avatar } from "@/components/Avatar";
import { mockGroups, currentUser } from "@/data/mockData";
import { cn } from "@/lib/utils";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains("dark") || 
           localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const filtered = mockGroups.filter((g) =>
    g.name.toLowerCase().includes(query.toLowerCase()) ||
    g.lastMessage.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="app-container">
      {/* Header */}
      <AppHeader
        title="Secure Room"
        leftSlot={
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Shield size={16} className="text-white" />
          </div>
        }
        rightSlot={
          <>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-white/10 transition"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => navigate("/create-group")}
              className="p-2 rounded-full hover:bg-white/10 transition"
              title="Create Group"
            >
              <Plus size={22} />
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="p-2 rounded-full hover:bg-white/10 transition"
              title="Profile"
            >
              <User size={22} />
            </button>
          </>
        }
      />

      {/* Search Bar */}
      <div className="bg-primary px-4 pb-3">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search groups..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full text-sm bg-card text-foreground placeholder:text-muted-foreground border-0 outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Groups List */}
      <div className="flex-1 overflow-y-auto bg-background">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <Search size={40} className="mb-3 opacity-30" />
            <p className="text-sm">No groups found</p>
          </div>
        ) : (
          filtered.map((group) => (
            <div
              key={group.id}
              className="group-item"
              onClick={() => navigate(`/chat/${group.id}`)}
            >
              <Avatar name={group.name} size="lg" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <h3 className="font-semibold text-sm text-foreground truncate">
                    {group.name}
                  </h3>
                  <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                    {group.lastMessageTime}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground truncate">{group.lastMessage}</p>
                  {group.unreadCount > 0 && (
                    <span
                      className={cn(
                        "ml-2 flex-shrink-0 min-w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium px-1",
                        "bg-primary text-primary-foreground"
                      )}
                    >
                      {group.unreadCount > 99 ? "99+" : group.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* FAB */}
      <button
        className="fab"
        onClick={() => navigate("/create-group")}
        title="Create Group"
      >
        <Plus size={24} />
      </button>
    </div>
  );
};

export default DashboardPage;
