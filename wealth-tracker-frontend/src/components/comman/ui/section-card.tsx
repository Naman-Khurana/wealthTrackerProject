type SectionCardProps = {
  className?: string;
  children?: React.ReactNode;
};

export default function SectionCard({ className = "", children }: SectionCardProps) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden ${className}`}
      style={{
        background: "linear-gradient(160deg, #1c1c1e 0%, #161618 50%, #111113 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.04), " +
          "0 16px 48px -12px rgba(0,0,0,0.7)",
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.12) 30%, rgba(0, 0, 0, 0.7) 70%, transparent 100%)",
        }}
      />
      {/* KEY FIX: flex flex-col h-full so children can use flex-1 + overflow-y-auto */}
      <div className="px-4 py-4 w-full h-full flex flex-col">
        {children}
      </div>
    </div>
  );
}