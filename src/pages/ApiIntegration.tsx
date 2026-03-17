import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ExternalLink, Eye, EyeOff, Save, Key, ChevronDown, Lock } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { cn } from "@/lib/utils";

const providers = [
  { id: "anthropic", name: "Anthropic", models: ["claude-opus-4-5", "claude-sonnet-4-5", "claude-haiku-3-5"] },
  { id: "gemini", name: "Gemini", models: ["gemini-2.5-pro", "gemini-2.5-flash", "gemini-1.5-pro"] },
  { id: "openai", name: "OpenAI", models: ["gpt-5", "gpt-5-mini", "gpt-4o"] },
];

const features = [
  { id: "spam", label: "Spam Detection", adminOnly: true, desc: "Auto-detect and flag spam messages" },
  { id: "summary", label: "Summary AI", adminOnly: false, desc: "Summarize long conversations" },
  { id: "translate", label: "Translate AI", adminOnly: false, desc: "Auto-translate messages" },
];

const ApiIntegrationPage: React.FC = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const [provider, setProvider] = useState("");
  const [model, setModel] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [lockPassword, setLockPassword] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [showLockModal, setShowLockModal] = useState(false);
  const [saved, setSaved] = useState(false);

  const currentProvider = providers.find((p) => p.id === provider);

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    setShowLockModal(true);
  };

  const confirmSave = () => {
    if (!lockPassword) return;
    setIsLocked(true);
    setShowLockModal(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  // Locked state — ask for password
  if (isLocked && enteredPassword !== lockPassword) {
    return (
      <div className="app-container bg-background">
        <AppHeader title="API Integration" showBack />
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
          <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center">
            <Lock size={36} className="text-primary" />
          </div>
          <div className="text-center">
            <h2 className="text-lg font-semibold text-foreground">Protected</h2>
            <p className="text-sm text-muted-foreground mt-1">Enter your password to access API settings</p>
          </div>
          <div className="w-full">
            <input
              type="password"
              value={enteredPassword}
              onChange={(e) => setEnteredPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && enteredPassword && setIsLocked(false)}
              placeholder="Enter password..."
              className="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition text-center"
              autoFocus
            />
            <button
              onClick={() => enteredPassword && setIsLocked(false)}
              disabled={!enteredPassword}
              className="w-full mt-3 py-3.5 rounded-xl text-sm font-semibold text-primary-foreground disabled:opacity-50"
              style={{ background: "var(--gradient-header)" }}
            >
              Unlock
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container bg-background">
      <AppHeader title="API Integration" showBack />

      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5">
        {/* Help link */}
        <a
          href="#"
          className="flex items-center gap-2 text-primary text-sm font-medium hover:underline"
          onClick={(e) => e.preventDefault()}
        >
          <ExternalLink size={14} />
          How to get API key & configure it
        </a>

        {/* Provider Select */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            API Provider
          </label>
          <div className="relative">
            <select
              value={provider}
              onChange={(e) => { setProvider(e.target.value); setModel(""); }}
              className="w-full px-4 py-3 pr-10 rounded-xl border border-border bg-card text-sm text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
            >
              <option value="">Select provider...</option>
              {providers.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Model Select */}
        {currentProvider && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Model
            </label>
            <div className="relative">
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full px-4 py-3 pr-10 rounded-xl border border-border bg-card text-sm text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
              >
                <option value="">Select model...</option>
                {currentProvider.models.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        )}

        {/* API Key */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            <Key size={14} className="inline mr-1.5 text-primary" />
            API Key
          </label>
          <div className="relative">
            <input
              type={showKey ? "text" : "password"}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="w-full px-4 py-3 pr-12 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition font-mono"
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
            >
              {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Features */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Enable Features
          </label>
          <div className="space-y-3">
            {features.map((feat) => (
              <div
                key={feat.id}
                onClick={() => toggleFeature(feat.id)}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all",
                  selectedFeatures.includes(feat.id)
                    ? "border-primary bg-accent"
                    : "border-border bg-card hover:bg-secondary"
                )}
              >
                <div
                  className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0",
                    selectedFeatures.includes(feat.id)
                      ? "border-primary bg-primary"
                      : "border-muted-foreground"
                  )}
                >
                  {selectedFeatures.includes(feat.id) && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">{feat.label}</p>
                    {feat.adminOnly && (
                      <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">
                        Admin only
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {saved && (
          <div className="bg-accent text-accent-foreground text-sm px-4 py-3 rounded-xl text-center font-medium">
            ✓ Settings saved and locked successfully
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="px-4 py-4 border-t border-border bg-card">
        <button
          onClick={handleSave}
          disabled={!provider || !model || !apiKey}
          className="w-full py-3.5 rounded-xl text-sm font-semibold text-primary-foreground flex items-center justify-center gap-2 disabled:opacity-50 hover:opacity-90 transition"
          style={{ background: "var(--gradient-header)" }}
        >
          <Save size={16} />
          Save & Lock
        </button>
      </div>

      {/* Lock Password Modal */}
      {showLockModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50 animate-fade-in">
          <div className="bg-card w-full rounded-t-3xl p-6 animate-slide-up">
            <h3 className="text-lg font-semibold text-foreground mb-1">Set Access Password</h3>
            <p className="text-sm text-muted-foreground mb-4">
              This password will protect your API settings. Required to reopen this page.
            </p>
            <input
              type="password"
              value={lockPassword}
              onChange={(e) => setLockPassword(e.target.value)}
              placeholder="Create a secure password..."
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition mb-3"
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowLockModal(false)}
                className="flex-1 py-3 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-secondary transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmSave}
                disabled={!lockPassword}
                className="flex-1 py-3 rounded-xl text-sm font-semibold text-primary-foreground disabled:opacity-50"
                style={{ background: "var(--gradient-header)" }}
              >
                Confirm & Lock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiIntegrationPage;
