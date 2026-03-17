import React from "react";
import { cn } from "@/lib/utils";

interface RoleBadgeProps {
  role: "admin" | "coadmin" | "user";
  className?: string;
}

export const RoleBadge: React.FC<RoleBadgeProps> = ({ role, className }) => {
  const labels = { admin: "Admin", coadmin: "Co-Admin", user: "Member" };
  return (
    <span
      className={cn(
        "role-badge",
        role === "admin" && "role-admin",
        role === "coadmin" && "role-coadmin",
        role === "user" && "role-user",
        className
      )}
    >
      {labels[role]}
    </span>
  );
};
