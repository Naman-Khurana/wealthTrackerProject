import { Earnings } from "@/type/earnings";
import InsightItem from "../comman/ui/insights-item";
import SectionCard from "../comman/ui/section-card";
import { lastSixMonthsData, rowTemplateContent } from "@/type/commman";


interface Insight {
  text: string
  highlight: string
}

type Props = {
  dataWithDetails: Earnings[],
  lastSixMonthsEarningsData: lastSixMonthsData[]
}

export default function EarningsInsightsSection({ dataWithDetails, lastSixMonthsEarningsData }: Props) {


  const lastMonthChange = getLastMonthChange(lastSixMonthsEarningsData)
  const threeMonthChange = getThreeMonthComparison(lastSixMonthsEarningsData)

  const lastMonthDirection = lastMonthChange >= 0 ? "increased" : "dropped"
  const threeMonthDirection = threeMonthChange >= 0 ? "increased" : "dropped"


  const recurringPercent = getRecurringIncomePercent(dataWithDetails)
  const topSource = getTopIncomeSource(dataWithDetails)
  const bestDay = getHighestEarningDay(dataWithDetails)

  const insights: Insight[] = [
    {
      text: `Income ${lastMonthDirection} by`,
      highlight: `${Math.abs(lastMonthChange)}% compared to last month`,
    },
    {
      text: `${recurringPercent}% of income is`,
      highlight: "recurring",
    },
    {
      text: "Top income source:",
      highlight: topSource,
    },
    {
      text: `Income ${threeMonthDirection}`,
      highlight: `${Math.abs(threeMonthChange)}% compared to 3-month average`,
    },
    {
      text: "Highest earning day:",
      highlight: bestDay,
    },
  ]

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

function getLastMonthChange(data: lastSixMonthsData[]) {
  if (data.length < 2) return 0

  const current = data[data.length - 1].total
  const lastMonth = data[data.length - 2].total

  if (lastMonth === 0) return 0

  const change = ((current - lastMonth) / lastMonth) * 100
  return Math.round(change)
}

function getThreeMonthComparison(data: lastSixMonthsData[]) {
  if (data.length < 4) return 0

  const current = data[data.length - 1].total

  const lastThreeMonths = data
    .slice(data.length - 4, data.length - 1)
    .map(m => m.total)

  const avg =
    lastThreeMonths.reduce((sum, val) => sum + val, 0) /
    lastThreeMonths.length

  if (avg === 0) return 0

  const change = ((current - avg) / avg) * 100
  return Math.round(change)
}

function getRecurringIncomePercent(data: Earnings[]) {
  if (data.length === 0) return 0

  const totalIncome = data.reduce((sum, e) => sum + e.amount, 0)

  const recurringIncome = data
    .filter(e => e.incomeType === "RECURRING")
    .reduce((sum, e) => sum + e.amount, 0)

  if (totalIncome === 0) return 0

  return Math.round((recurringIncome / totalIncome) * 100)
}

function getTopIncomeSource(data: Earnings[]) {
  if (data.length === 0) return "N/A"

  const categoryTotals: Record<string, number> = {}

  data.forEach(e => {
    categoryTotals[e.category] =
      (categoryTotals[e.category] || 0) + e.amount
  })

  let topCategory = ""
  let max = 0

  Object.entries(categoryTotals).forEach(([cat, amount]) => {
    if (amount > max) {
      max = amount
      topCategory = cat
    }
  })

  const total = data.reduce((s, e) => s + e.amount, 0)
  const percent = total === 0 ? 0 : Math.round((max / total) * 100)

  return `${topCategory} (${percent}%)`
}

function getHighestEarningDay(data: Earnings[]) {
  if (data.length === 0) return "N/A"

  const dayTotals: Record<string, number> = {}

  data.forEach(e => {
    const date = e.date.split("T")[0]

    dayTotals[date] = (dayTotals[date] || 0) + e.amount
  })

  let bestDay = ""
  let max = 0

  Object.entries(dayTotals).forEach(([day, amount]) => {
    if (amount > max) {
      max = amount
      bestDay = day
    }
  })

  const formattedDate = new Date(bestDay).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long"
  })

  return `${formattedDate} (₹${max.toLocaleString()})`
}