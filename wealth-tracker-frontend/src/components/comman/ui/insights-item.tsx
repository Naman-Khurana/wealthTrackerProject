// components/InsightItem.tsx

interface InsightItemProps {
  text: string
  highlight?: string
}

export default function InsightItem({ text, highlight }: InsightItemProps) {
  return (
    <div className="flex items-start gap-3 text-gray-300 text-sm">
      {/* Green Dot */}
      <span className="mt-2 h-2 w-2 rounded-full bg-green-400 shrink-0" />

      {/* Text */}
      <p>
        {text}{" "}
        {highlight && (
          <span className="text-green-400 font-medium">
            {highlight}
          </span>
        )}
      </p>
    </div>
  )
}