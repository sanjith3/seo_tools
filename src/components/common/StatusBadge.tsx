import React from "react";

interface StatusBadgeProps {
  status: "success" | "warning" | "error" | "neutral";
  label: string;
  icon?: React.ReactNode;
  className?: string;
}

export function StatusBadge({ status, label, icon, className = "" }: StatusBadgeProps) {
  const styles = {
    success: "bg-[rgba(45,212,167,0.10)] text-[#5EE0BA] border-[rgba(45,212,167,0.25)]",
    warning: "bg-[rgba(251,191,36,0.10)] text-[#FCD34D] border-[rgba(251,191,36,0.25)]",
    error: "bg-[rgba(251,113,133,0.10)] text-[#FDA4AF] border-[rgba(251,113,133,0.25)]",
    neutral: "bg-[#111F32] text-[#B5C1D1] border-[#22344C]",
  }[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${styles} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{label}</span>
    </span>
  );
}
