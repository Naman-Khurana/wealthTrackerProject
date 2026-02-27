import InsightItem from "../comman/ui/insights-item";
import SectionCard from "../comman/ui/section-card";

interface Insight {
  text: string
  highlight: string
} 
const insights: Insight[] = [
  {
    text: "Income increased by",
    highlight: "₹15,000 compared to last month",
  },
  {
    text: "70% of income is",
    highlight: "recurring",
  },
  {
    text: "Top income source:",
    highlight: "Freelancing (42%)",
  },
  {
    text: "Income dropped",
    highlight: "5% compared to 3-month average",
  },
  {
    text: "Savings rate improved to",
    highlight: "28%",
  },
  {
    text: "Highest earning day:",
    highlight: "15th March (₹8,500)",
  },
]


export default function EarningsInsightsSection() {

 
    return (
        <SectionCard className="w-full h-full">
      <h2 className="text-white text-lg font-semibold tracking-wide ">
        INSIGHTS
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
        {insights.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-3 text-zinc-400 text-sm leading-relaxed"
          >
            {/* Green Dot */}
            <span className="mt-[6px] h-[6px] w-[6px] rounded-full bg-green-500 shrink-0" />

            {/* Text */}
            <p>
              {item.text}{" "}
              <span className="text-green-400 font-medium">
                {item.highlight}
              </span>
            </p>
          </div>
        ))}
      </div>
    </SectionCard>
  )

}