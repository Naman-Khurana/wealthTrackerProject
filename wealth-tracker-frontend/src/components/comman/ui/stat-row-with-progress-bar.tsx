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
      className={`flex items-center gap-3 ${className}`}
    >
      {/* Label */}
      <div className="flex-2 text-white text-sm">
        {label}
      </div>

      {/* Progress Bar */}
      <div className="flex-8 h-3 bg-gray-500/30 rounded overflow-hidden">
        <div
          className={`h-full ${BACKGROUND_COLOR_EMRALD_GREEN} transition-all duration-300`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Value */}
      <div className="flex-2 text-[0.8rem] flex items-center gap-1">
        {value}
      </div>

      {/* Percentage */}
      <div className={`flex-1 text-[0.8rem] ${TEXT_COLOR_EMRALD_GREEN}`}>
        {percentage}%
      </div>
    </section>
  );
}