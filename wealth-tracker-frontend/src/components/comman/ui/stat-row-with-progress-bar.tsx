import { BACKGROUND_COLOR_EMRALD_GREEN, BACKGROUND_DARK_EMRALD_GREEN, TEXT_COLOR_EMRALD_GREEN, TEXT_DARK_EMRALD_GREEN } from "@/constants/ui.constants";

type StatRowWithProgressBarProps = {
  label: React.ReactNode;
  value: React.ReactNode;
  percentage: React.ReactNode;
  progress: number; // 0–100
  className?: string;
};

export default function StatRowWithProgressBar({
  label,
  value,
  percentage,
  progress,
  className = "",
}: StatRowWithProgressBarProps) {
  return (
    <section
      className={`flex items-center gap-4 py-2 ${className}`}
    >
      {/* Label */}
      <div className="w-24 text-white text-xs font-medium truncate">
        {label}
      </div>

      {/* Progress Bar */}
      <div className="flex-1 h-2.5 bg-zinc-700/50 rounded-full overflow-hidden shadow-inner border border-zinc-600/30">
        <div
          className={`h-full ${BACKGROUND_COLOR_EMRALD_GREEN} transition-all duration-500 rounded-full shadow-lg`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Value */}
      <div className="w-20 text-left text-xs font-medium flex items-center justify-start gap-0.5 text-white">
        <div className={`${TEXT_COLOR_EMRALD_GREEN}`}>₹</div>
        <div className="truncate">{value}</div>
      </div>

      {/* Percentage */}
      <div className={`w-12 text-left text-xs font-semibold ${TEXT_COLOR_EMRALD_GREEN}`}>
        {typeof percentage === 'number' ? Math.round(percentage) : percentage}%
      </div>
    </section>
  );
}