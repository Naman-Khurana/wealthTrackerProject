"use client";

import { EllipsisVertical, Pencil, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type NExpensesDataType = {
  category: string;
  amount: number;
  date: string;
};

// Generates a consistent muted colour per category initial
function categoryColor(category: string) {
  const colors = [
    "rgba(255,255,255,0.15)",
    "rgba(255,255,255,0.12)",
    "rgba(255,255,255,0.18)",
    "rgba(255,255,255,0.10)",
  ];
  return colors[category.charCodeAt(0) % colors.length];
}

export default function RecentTransactionRowTemplate({ category, amount, date }: NExpensesDataType) {
  return (
    <div
      className="group w-full flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-200"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.background = "transparent";
      }}
    >
      {/* Category avatar + name */}
      <div className="flex items-center gap-3 w-[38%] min-w-0">
        <div
          className="flex items-center justify-center w-9 h-9 rounded-xl shrink-0 text-sm font-semibold"
          style={{
            background: categoryColor(category),
            color: "rgba(255,255,255,0.75)",
            fontFamily: "'DM Mono', monospace",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {category.charAt(0).toUpperCase()}
        </div>
        <span
          className="truncate text-sm font-medium"
          style={{ color: "rgba(255,255,255,0.85)", fontFamily: "'Sora', sans-serif" }}
        >
          {category}
        </span>
      </div>

      {/* Date */}
      <span
        className="w-[28%] text-xs"
        style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'DM Mono', monospace" }}
      >
        {date}
      </span>

      {/* Amount */}
      <span
        className="w-[22%] text-sm font-semibold"
        style={{ color: "rgba(255,255,255,0.8)", fontFamily: "'Sora', sans-serif" }}
      >
        ₹ {amount.toLocaleString("en-IN")}
      </span>

      {/* Actions */}
      <div className="w-[8%] flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex items-center justify-center w-7 h-7 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              <EllipsisVertical size={14} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="rounded-xl min-w-[120px]"
            style={{
              background: "#1c1c1e",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 16px 48px -12px rgba(0,0,0,0.8)",
              fontFamily: "'Sora', sans-serif",
            }}
          >
            <DropdownMenuItem
              className="flex items-center gap-2 text-sm rounded-lg cursor-pointer"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              <Pencil size={13} />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2 text-sm rounded-lg cursor-pointer"
              style={{ color: "rgba(239,68,68,0.75)" }}
            >
              <X size={13} />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}