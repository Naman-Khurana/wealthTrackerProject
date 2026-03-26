"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import axiosInstance from "@/lib/axios_instance";
import { useState, useRef } from "react";
import {
  useAllEssentialExpensesWithDetails,
  useAllLuxuryExpensesWithDetails,
} from "./expenses-api-fetcher";
import Modal from "../comman/ui/modal";

type Props = {
  closeAddBudget: () => void;
  isOpen: boolean;
};

export default function AddBudgetSection({ closeAddBudget, isOpen }: Props) {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [category, setCategory] = useState<string>("");
  const [dateCategory, setDateCategory] = useState("custom");
  const amountRef = useRef<HTMLInputElement>(null);

  const { data: allEssentialExpensesData } = useAllEssentialExpensesWithDetails();
  const { data: allLuxuryExpensesData } = useAllLuxuryExpensesWithDetails();

  const categoryList = [
    "Total Expenses",
    "Luxury",
    "Essential",
    ...(allEssentialExpensesData?.essentialCategories ?? []),
    ...(allLuxuryExpensesData?.luxuryCategories ?? []),
  ];

  const handleDateCategoryChange = (type: string) => {
    setDateCategory(type);
    if (type === "current-month") {
      const today = new Date();
      setStartDate(new Date(today.getFullYear(), today.getMonth(), 1));
      setEndDate(new Date(today.getFullYear(), today.getMonth() + 1, 0));
    } else if (type === "current-year") {
      const today = new Date();
      setStartDate(new Date(today.getFullYear(), 0, 1));
      setEndDate(new Date(today.getFullYear() + 1, 0, 0));
    } else {
      setStartDate(undefined);
      setEndDate(undefined);
    }
  };

  const getBudgetRangeCategory = () => {
    if (dateCategory === "current-year") return "YEARLY";
    if (dateCategory === "current-month") return "MONTHLY";
    return "CUSTOM";
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const amountValue = amountRef.current?.value;
    if (!startDate || !endDate || !amountValue || !category) return;

    axiosInstance
      .post("/expenses/budget/set", {
        category,
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
        amount: amountValue,
        budgetRangeCategory: getBudgetRangeCategory(),
      })
      .then(() => closeAddBudget())
      .catch((error) => console.error("error:", error));
  };

  // ── shared styled classes ────────────────────────────────────────────────
  const inputBase: React.CSSProperties = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "1rem",
    color: "rgba(255,255,255,0.9)",
    fontFamily: "'Sora', sans-serif",
    fontSize: "0.875rem",
    padding: "0.625rem 1rem",
    width: "100%",
    outline: "none",
    transition: "all 0.2s",
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeAddBudget}
      title="Add Budget"
      subtitle="Budget"
      width="max-w-md"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        {/* Amount */}
        <input
          ref={amountRef}
          type="number"
          placeholder="Enter amount"
          required
          style={inputBase}
          onFocus={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.08)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255,255,255,0.04)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.05)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
            e.currentTarget.style.boxShadow = "none";
          }}
        />

        {/* Category Select */}
        <Select onValueChange={setCategory}>
          <SelectTrigger
            className="w-full rounded-2xl text-sm"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: category ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
              fontFamily: "'Sora', sans-serif",
              height: "2.6rem",
            }}
          >
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent
            className="rounded-2xl border"
            style={{
              background: "#1c1c1e",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.85)",
              fontFamily: "'Sora', sans-serif",
              zIndex: 9999,
            }}
          >
            <SelectGroup>
              {categoryList.map((ctg) => (
                <SelectItem
                  key={ctg}
                  value={ctg}
                  className="text-sm focus:bg-white/10 focus:text-white"
                >
                  {ctg}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Date range + radio */}
        <div className="flex gap-4">

          {/* Date pickers */}
          <div className="flex flex-col gap-3 flex-1">
            {[
              { label: "Start date", date: startDate, setDate: setStartDate },
              { label: "End date",   date: endDate,   setDate: setEndDate   },
            ].map(({ label, date, setDate }) => (
              <Popover key={label}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    disabled={dateCategory !== "custom"}
                    className="flex items-center gap-2 w-full rounded-2xl px-4 py-2.5 text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: date ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
                      fontFamily: "'Sora', sans-serif",
                    }}
                  >
                    <CalendarIcon size={14} style={{ color: "rgba(255,255,255,0.4)" }} />
                    {date ? format(date, "PPP") : label}
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 rounded-2xl border"
                  style={{
                    background: "#1c1c1e",
                    border: "1px solid rgba(255,255,255,0.1)",
                    zIndex: 9999,
                  }}
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="text-white"
                  />
                </PopoverContent>
              </Popover>
            ))}
          </div>

          {/* Radio group */}
          <div className="flex items-center">
            <RadioGroup
              defaultValue="custom"
              onValueChange={handleDateCategoryChange}
              className="flex flex-col gap-3"
            >
              {[
                { value: "custom",        label: "Custom"        },
                { value: "current-month", label: "Current Month" },
                { value: "current-year",  label: "Current Year"  },
              ].map(({ value, label }) => (
                <div key={value} className="flex items-center gap-2">
                  <RadioGroupItem
                    value={value}
                    id={value}
                    className="border-white/20 data-[state=checked]:bg-white data-[state=checked]:border-white"
                  />
                  <Label
                    htmlFor={value}
                    className="text-xs text-nowrap cursor-pointer"
                    style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Sora', sans-serif" }}
                  >
                    {label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        {/* Submit row */}
        <div className="flex gap-3 mt-1">
          <button
            type="button"
            onClick={closeAddBudget}
            className="flex-1 rounded-2xl py-3 text-sm font-medium transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.5)",
              fontFamily: "'Sora', sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              e.currentTarget.style.color = "rgba(255,255,255,0.8)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              e.currentTarget.style.color = "rgba(255,255,255,0.5)";
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 rounded-2xl py-3 text-sm font-semibold text-white transition-all duration-200"
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
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
}