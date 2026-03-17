import React from "react";
import { getAvatarColor, getInitials } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface AvatarProps {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showOnline?: boolean;
  className?: string;
}

const sizeMap = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-xl",
};

export const Avatar: React.FC<AvatarProps> = ({
  name,
  src,
  size = "md",
  showOnline = false,
  className,
}) => {
  return (
    <div className={cn("relative flex-shrink-0", className)}>
      <div
        className={cn(
          "rounded-full flex items-center justify-center font-semibold bg-gradient-to-br text-white",
          sizeMap[size],
          getAvatarColor(name)
        )}
      >
        {src ? (
          <img
            src={src}
            alt={name}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          getInitials(name)
        )}
      </div>
      {showOnline && (
        <span
          className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white"
          style={{ background: "hsl(var(--online))" }}
        />
      )}
    </div>
  );
};
