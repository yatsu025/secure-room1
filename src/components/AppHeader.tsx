import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  showBack?: boolean;
  onBack?: () => void;
  className?: string;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  subtitle,
  leftSlot,
  rightSlot,
  showBack = false,
  onBack,
  className,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) onBack();
    else navigate(-1);
  };

  return (
    <header
      className={cn("app-header gap-3", className)}
      style={{ background: "var(--gradient-header)" }}
    >
      {showBack && (
        <button
          onClick={handleBack}
          className="text-white/90 hover:text-white transition-colors p-1 -ml-1"
        >
          <ArrowLeft size={22} />
        </button>
      )}
      {leftSlot}
      <div className="flex-1 min-w-0">
        <h1 className="text-white font-semibold text-base leading-tight truncate">{title}</h1>
        {subtitle && (
          <p className="text-white/70 text-xs truncate">{subtitle}</p>
        )}
      </div>
      {rightSlot && (
        <div className="flex items-center gap-1 text-white">{rightSlot}</div>
      )}
    </header>
  );
};
