"use client";

import { useLastSixMonthlyExpenses } from "../dashboard/dashboard-api-fetcher";
import { MoveDown, MoveUp, TrendingDown, TrendingUp, AlertTriangle, BarChart3 } from "lucide-react";
import {
    useExpensesCategoryWithPercentageUsage,
    useAllBudgetCategoriesWithPercentageUsage,
} from "./expenses-api-fetcher";
import SectionCard from "../comman/ui/section-card";

// ── Skeleton ─────────────────────────────────────────────────────────────────
function InsightSkeleton() {
    return (
        <SectionCard className="w-full h-full">
            <div className="flex flex-col gap-4 p-1">
                <div className="h-3 w-20 rounded-full animate-pulse" style={{ background: "rgba(255,255,255,0.07)" }} />
                <div className="h-4 w-40 rounded-full animate-pulse" style={{ background: "rgba(255,255,255,0.07)" }} />
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex flex-col gap-2 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)" }}>
                        <div className="h-3 w-32 rounded-full animate-pulse" style={{ background: "rgba(255,255,255,0.07)" }} />
                        <div className="h-3 w-48 rounded-full animate-pulse" style={{ background: "rgba(255,255,255,0.05)" }} />
                    </div>
                ))}
            </div>
        </SectionCard>
    );
}

// ── Insight row card ──────────────────────────────────────────────────────────
function InsightRow({
    icon,
    label,
    children,
    accent = "neutral",
}: {
    icon: React.ReactNode;
    label: string;
    children: React.ReactNode;
    accent?: "neutral" | "green" | "red" | "yellow";
}) {
    const accentColor = {
        neutral: "rgba(255,255,255,0.1)",
        green: "rgba(34,197,94,0.15)",
        red: "rgba(239,68,68,0.15)",
        yellow: "rgba(234,179,8,0.15)",
    }[accent];

    const iconColor = {
        neutral: "rgba(255,255,255,0.4)",
        green: "rgba(34,197,94,0.8)",
        red: "rgba(239,68,68,0.8)",
        yellow: "rgba(234,179,8,0.8)",
    }[accent];

    return (
        <div
            className="flex items-start gap-3 rounded-xl p-3 transition-all duration-200"
            style={{ background: accentColor, border: "1px solid rgba(255,255,255,0.06)" }}
        >
            <div
                className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0 mt-0.5"
                style={{ background: "rgba(255,255,255,0.06)", color: iconColor }}
            >
                {icon}
            </div>
            <div className="flex flex-col gap-1 min-w-0">
                <span
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'DM Mono', monospace" }}
                >
                    {label}
                </span>
                <div
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Sora', sans-serif" }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function InsightsNCompareSection() {
    const { data: lastSixMonthsExpensesData, isLoading: loadingExpenses } = useLastSixMonthlyExpenses();
    const { data: expensesCategoryWithPercentageUsageData } = useExpensesCategoryWithPercentageUsage();
    const { data: allBudgetCategoriesWithPercentageUsageData } = useAllBudgetCategoriesWithPercentageUsage();

    if (loadingExpenses) return <InsightSkeleton />;

    const lastSixMonthsData = lastSixMonthsExpensesData ?? [];
    if (lastSixMonthsData.length < 2) {
        return (
            <SectionCard className="w-full h-full flex items-center justify-center">
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Sora', sans-serif" }}>
                    Not enough data to generate insights
                </p>
            </SectionCard>
        );
    }

    // ── Derived values ────────────────────────────────────────────────────────
    const lastMonthDays = () => {
        const now = new Date();
        const lastMonth = now.getMonth() - 1;
        const year = lastMonth === -1 ? now.getFullYear() - 1 : now.getFullYear();
        const month = lastMonth === -1 ? 11 : lastMonth;
        return new Date(year, month + 1, 0).getDate();
    };

    const currentMonthDailyAvg =
        lastSixMonthsData[lastSixMonthsData.length - 1].total / new Date().getDate();
    const lastMonthDailyAvg =
        lastSixMonthsData[lastSixMonthsData.length - 2].total / lastMonthDays();

    const dailyIncreased = currentMonthDailyAvg > lastMonthDailyAvg;
    const dailyDiff = Math.abs(currentMonthDailyAvg - lastMonthDailyAvg).toFixed(2);

    const highest = expensesCategoryWithPercentageUsageData?.reduce((max, item) =>
        item.percentageUsed > max.percentageUsed ? item : max
    );

    const overBudgetCategories = Object.entries(allBudgetCategoriesWithPercentageUsageData ?? [])
        .filter(([, info]) => info.percentageUsed > 100)
        .map(([category]) => category);

    return (
        <section className="w-full h-full">
            <SectionCard className="w-full h-full flex flex-col overflow-hidden">

                {/* Header */}
                <div className="mb-4">
                    <p
                        className="text-xs font-semibold tracking-[0.18em] uppercase"
                        style={{ color: "rgba(160,160,165,0.7)", fontFamily: "'DM Mono', monospace" }}
                    >
                        Analytics
                    </p>
                    <h2
                        className="text-base font-bold mt-0.5"
                        style={{ color: "rgba(255,255,255,0.9)", fontFamily: "'Sora', sans-serif", letterSpacing: "-0.01em" }}
                    >
                        Insights
                    </h2>
                </div>

                {/* Divider */}
                <div className="mb-4" style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />

                {/* Insight rows */}

                {/* Insight rows wrapper */}
                <div className="flex-1 overflow-hidden">
                    <div className="flex flex-col gap-3 overflow-y-auto h-full pr-1">

                        {/* Daily avg */}
                        <InsightRow
                            icon={dailyIncreased ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                            label="Daily Average"
                            accent={dailyIncreased ? "red" : "green"}
                        >
                            Your avg daily spending{" "}
                            <span style={{ color: "rgba(255,255,255,0.9)", fontWeight: 600 }}>
                                {dailyIncreased ? "increased" : "decreased"}
                            </span>{" "}
                            to{" "}
                            <span style={{ color: "rgba(255,255,255,0.9)", fontWeight: 600 }}>
                                ₹{currentMonthDailyAvg.toFixed(2)}
                            </span>{" "}
                            from{" "}
                            <span style={{ color: "rgba(255,255,255,0.9)", fontWeight: 600 }}>
                                ₹{lastMonthDailyAvg.toFixed(2)}
                            </span>
                            <span className="inline-flex items-center ml-1.5">
                                {dailyIncreased
                                    ? <MoveUp size={12} color="rgb(239,68,68)" strokeWidth={3} />
                                    : <MoveDown size={12} color="rgb(34,197,94)" strokeWidth={3} />}
                            </span>
                        </InsightRow>

                        {/* Top category */}
                        {highest && (
                            <InsightRow
                                icon={<BarChart3 size={16} />}
                                label="Top Category"
                                accent="yellow"
                            >
                                Highest expense category this month is{" "}
                                <span style={{ color: "rgba(255,255,255,0.9)", fontWeight: 600 }}>
                                    {highest.category}
                                </span>{" "}
                                at{" "}
                                <span style={{ color: "rgba(234,179,8,0.9)", fontWeight: 600 }}>
                                    {highest.percentageUsed.toFixed(0)}% of budget
                                </span>
                            </InsightRow>
                        )}

                        {/* Over budget */}
                        <InsightRow
                            icon={<AlertTriangle size={16} />}
                            label="Budget Alerts"
                            accent={overBudgetCategories.length > 0 ? "red" : "green"}
                        >
                            {overBudgetCategories.length === 0 ? (
                                <span style={{ color: "rgba(255,255,255,0.9)", fontWeight: 600 }}>
                                    All categories within budget ✓
                                </span>
                            ) : (
                                <>
                                    Exceeded budget in{" "}
                                    <span style={{ color: "rgba(239,68,68,0.9)", fontWeight: 600 }}>
                                        {overBudgetCategories.length} {overBudgetCategories.length === 1 ? "category" : "categories"}
                                    </span>
                                    {" — "}
                                    <span style={{ color: "rgba(255,255,255,0.6)" }}>
                                        {overBudgetCategories.join(", ")}
                                    </span>
                                </>
                            )}
                        </InsightRow>

                    </div>
                </div>
            </SectionCard>
        </section>
    );
}