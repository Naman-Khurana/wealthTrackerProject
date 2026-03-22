"use client";

import { Plus } from "lucide-react";

type ActionButtonProps = {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
};

export default function ActionButton({
  onClick,
  className = "",
  children,
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2.5
        px-4 py-2.5
        rounded-2xl
        bg-emerald-950
        border border-emerald-700/50
        text-emerald-300 text-sm font-medium tracking-wide
        transition-all duration-200
        hover:bg-emerald-900
        hover:border-emerald-500/70
        hover:text-emerald-100
        // active:scale-[0.97]
        ${className}
      `}
    >
      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-600/40 border border-emerald-500/50 text-emerald-300">
        <Plus size={12} strokeWidth={2.5} />
      </span>
      <span>{children}</span>
    </button>
  );
}