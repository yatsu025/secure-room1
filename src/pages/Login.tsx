import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, Shield } from "lucide-react";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);
    // Simulate auth (connect to Supabase when ready)
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 1200);
  };

  return (
    <div
      className="app-container"
      style={{ background: "var(--gradient-header)", minHeight: "100vh" }}
    >
      {/* Top branding */}
      <div className="flex flex-col items-center pt-16 pb-8 px-6">
        <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 shadow-lg">
          <Shield size={40} className="text-white" />
        </div>
        <h1 className="text-white text-3xl font-bold tracking-tight">Secure Room</h1>
        <p className="text-white/70 text-sm mt-1">Private. Encrypted. Yours.</p>
      </div>

      {/* Card */}
      <div className="flex-1 bg-background rounded-t-3xl px-6 py-8 animate-slide-up">
        <h2 className="text-foreground text-xl font-semibold mb-1">Welcome back</h2>
        <p className="text-muted-foreground text-sm mb-6">Sign in to your account</p>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email / Phone */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Email or Phone
            </label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="email@example.com or +1 234 567 8901"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-10 pr-12 py-3 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-destructive text-sm bg-destructive/10 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
            style={{ background: "var(--gradient-header)" }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-xs">
            Don't have an account?{" "}
            <span className="text-primary font-medium cursor-pointer hover:underline">
              Contact your admin
            </span>
          </p>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-border" />
          <span className="text-muted-foreground text-xs">secured by</span>
          <div className="flex-1 h-px bg-border" />
        </div>
        <div className="flex items-center justify-center gap-1.5 mt-3">
          <Shield size={14} className="text-primary" />
          <span className="text-primary text-xs font-medium">End-to-End Encryption</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
