"use client";

import { BACKGROUND_COLOR_EMRALD_GREEN } from "@/constants/ui.constants";

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
        bg-black/50
        rounded-lg
        border border-gray-600
        shadow-2xl
        shadow-green-500/20
        transition-all duration-200
        hover:scale-[1.02]
        active:scale-[0.98]
        ${BACKGROUND_COLOR_EMRALD_GREEN}
        ${className}
      `}
    >
      {children}
    </button>
  );
}