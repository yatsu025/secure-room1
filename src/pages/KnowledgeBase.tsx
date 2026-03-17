import React from "react";
import { BookOpen, Sparkles } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";

const KnowledgeBasePage: React.FC = () => {
  return (
    <div className="app-container bg-background">
      <AppHeader title="Knowledge Base" showBack />

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        {/* Animated icon */}
        <div className="relative mb-8">
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center"
            style={{ background: "var(--gradient-header)" }}
          >
            <BookOpen size={56} className="text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center animate-pulse">
            <Sparkles size={18} className="text-primary" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-foreground tracking-tight mb-3">
          Coming Soon
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed max-w-xs">
          We're building an intelligent knowledge base to power smarter conversations in your groups.
        </p>

        {/* Feature teasers */}
        <div className="mt-10 space-y-3 w-full max-w-xs">
          {[
            "AI-powered Q&A from documents",
            "Group knowledge sharing",
            "Smart search across files",
            "Context-aware responses",
          ].map((feat) => (
            <div
              key={feat}
              className="flex items-center gap-3 bg-card rounded-xl px-4 py-3 border border-border shadow-card"
            >
              <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
              <p className="text-sm text-muted-foreground">{feat}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mt-8">Stay tuned for updates</p>
      </div>
    </div>
  );
};

export default KnowledgeBasePage;
