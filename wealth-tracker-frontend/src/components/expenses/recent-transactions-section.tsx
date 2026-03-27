"use client";

import SectionCard from "../comman/ui/section-card";
import Divider from "../comman/ui/divider";
import { useNExpenses } from "./expenses-api-fetcher";
import RecentTransactionRowTemplate from "./recent-transaction-row-template";

type NExpensesDataType = {
  category: string;
  amount: number;
  date: string;
};

// ── Skeleton row ────────────────────────────────────────────────────────────
function SkeletonRow() {
  return (
    <div className="flex items-center gap-3 px-3 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="w-9 h-9 rounded-xl shrink-0 animate-pulse" style={{ background: "rgba(255,255,255,0.07)" }} />
      <div className="flex-1 flex flex-col gap-1.5">
        <div className="h-3 w-28 rounded-full animate-pulse" style={{ background: "rgba(255,255,255,0.07)" }} />
        <div className="h-2.5 w-16 rounded-full animate-pulse" style={{ background: "rgba(255,255,255,0.04)" }} />
      </div>
      <div className="h-3 w-14 rounded-full animate-pulse ml-auto" style={{ background: "rgba(255,255,255,0.07)" }} />
    </div>
  );
}

export default function RecentExpensesSection() {
  const {
    data: nExpensesData,
    isLoading: loadingNExpenses,
  } = useNExpenses(10);

  return (
    <SectionCard className="w-full h-full flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <div>
          <p
            className="text-xs font-semibold tracking-[0.18em] uppercase"
            style={{ color: "rgba(160,160,165,0.7)", fontFamily: "'DM Mono', monospace" }}
          >
            Transactions
          </p>
          <h2
            className="text-base font-bold mt-0.5"
            style={{ color: "rgba(255,255,255,0.9)", fontFamily: "'Sora', sans-serif", letterSpacing: "-0.01em" }}
          >
            Recent Expenses
          </h2>
        </div>

        {/* Count badge */}
        {!loadingNExpenses && nExpensesData && (
          <span
            className="text-xs px-2.5 py-1 rounded-lg"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.4)",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            {nExpensesData.length} items
          </span>
        )}
      </div>

      <Divider />

      {/* Column headers */}
      <div
        className="flex items-center px-3 pb-2 text-xs"
        style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'DM Mono', monospace" }}
      >
        <span className="w-[38%]">Category</span>
        <span className="w-[28%]">Date</span>
        <span className="w-[22%]">Amount</span>
        <span className="w-[8%]" />
      </div>

      {/* Rows */}
      <div className="flex-1 overflow-y-auto auto-hide-scrollbar flex flex-col">
        {loadingNExpenses
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)
          : nExpensesData?.map((expense, i) => (
              <RecentTransactionRowTemplate
                key={i}
                category={expense.category}
                amount={expense.amount}
                date={expense.date}
              />
            ))}

        {!loadingNExpenses && (!nExpensesData || nExpensesData.length === 0) && (
          <div
            className="flex-1 flex flex-col items-center justify-center gap-2 py-12"
            style={{ color: "rgba(255,255,255,0.2)", fontFamily: "'Sora', sans-serif" }}
          >
            <span className="text-3xl">₹</span>
            <p className="text-sm">No transactions yet</p>
          </div>
        )}
      </div>
    </SectionCard>
  );
}