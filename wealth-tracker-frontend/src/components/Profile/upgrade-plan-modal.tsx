"use client";

import { Sparkles } from "lucide-react";
import Modal from "../comman/ui/modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function UpgradePlanModal({ isOpen, onClose }: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Upgrade Plan"
      subtitle="Plans"
      width="max-w-sm"
    >
      <div className="flex flex-col items-center gap-6 py-2">

        {/* Icon */}
        <div
          className="flex items-center justify-center w-16 h-16 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Sparkles size={28} style={{ color: "rgba(255,255,255,0.75)" }} />
        </div>

        {/* Message */}
        <div className="flex flex-col items-center gap-2 text-center">
          <p
            className="text-base font-semibold"
            style={{ color: "rgba(255,255,255,0.9)", fontFamily: "'Sora', sans-serif" }}
          >
            Coming Soon
          </p>
          <p
            className="text-sm"
            style={{
              color: "rgba(255,255,255,0.4)",
              fontFamily: "'Sora', sans-serif",
              lineHeight: "1.6",
            }}
          >
            Plan upgrades are on their way. Stay tuned for exciting new features.
          </p>
        </div>

        {/* Divider */}
        <div className="w-full" style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />

        {/* OK Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-2xl py-3 text-sm font-semibold text-white transition-all duration-200"
          style={{
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.18)",
            boxShadow: "0 8px 24px -8px rgba(0,0,0,0.4)",
            fontFamily: "'Sora', sans-serif",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.17)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.12)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
          }}
        >
          OK
        </button>
      </div>
    </Modal>
  );
}