"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useState, useRef } from "react";
import {
  useAllEssentialExpensesWithDetails,
  useAllLuxuryExpensesWithDetails,
} from "./expenses-api-fetcher";
import axiosInstance from "@/lib/axios_instance";
import Modal from "../comman/ui/modal";

type Props = {
  closeAddExpenses: () => void;
  isOpen: boolean;
};

// ── Shared input style ───────────────────────────────────────────────────────
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

const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
  e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255,255,255,0.04)";
};

const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
  e.currentTarget.style.boxShadow = "none";
};

export default function AddExpensesSection({ closeAddExpenses, isOpen }: Props) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [category, setCategory] = useState<string>("");

  const amountRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const { data: allEssentialExpensesData } = useAllEssentialExpensesWithDetails();
  const { data: allLuxuryExpensesData } = useAllLuxuryExpensesWithDetails();

  const categoryList = [
    ...(allEssentialExpensesData?.essentialCategories ?? []),
    ...(allLuxuryExpensesData?.luxuryCategories ?? []),
  ];

  const handleCalendarPop = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const amountValue = amountRef.current?.value;
    const descValue = descriptionRef.current?.value;
    if (!date || !amountValue || !category) return;

    axiosInstance
      .post("/expenses/add", {
        category,
        date: date.toISOString().split("T")[0],
        amount: amountValue,
        description: descValue,
      })
      .then(() => closeAddExpenses())
      .catch((error) => console.error("error:", error));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeAddExpenses}
      title="Add Expense"
      subtitle="Expenses"
      width="max-w-md"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* Amount */}
        <input
          ref={amountRef}
          type="number"
          placeholder="Enter amount"
          required
          style={inputBase}
          onFocus={focusStyle}
          onBlur={blurStyle}
        />

        {/* Category */}
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
            className="rounded-2xl"
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

        {/* Date Picker */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-2 w-full rounded-2xl px-4 py-2.5 text-sm transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: date ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
                fontFamily: "'Sora', sans-serif",
              }}
            >
              <CalendarIcon size={14} style={{ color: "rgba(255,255,255,0.4)" }} />
              {date ? format(date, "PPP") : "Pick a date"}
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0 rounded-2xl"
            style={{
              background: "#1c1c1e",
              border: "1px solid rgba(255,255,255,0.1)",
              zIndex: 9999,
            }}
          >
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleCalendarPop}
              className="text-white"
            />
          </PopoverContent>
        </Popover>

        {/* Description */}
        <textarea
          ref={descriptionRef}
          placeholder="Enter expense description"
          rows={3}
          style={{ ...inputBase, resize: "none" }}
          onFocus={focusStyle}
          onBlur={blurStyle}
        />

        {/* Buttons */}
        <div className="flex gap-3 mt-1">
          <button
            type="button"
            onClick={closeAddExpenses}
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