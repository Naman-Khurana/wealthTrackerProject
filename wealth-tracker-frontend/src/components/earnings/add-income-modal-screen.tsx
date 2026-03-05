"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { Calendar as CalendarIcon, X } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { useState, useRef } from "react";
import Modal from "../comman/ui/modal";
import { IncomeTypeEnum } from "@/type/enums";
import { useAddIncome } from "./earnings-api-fetcher";

type props = {
  closeAddIncome: () => void;
  isOpen: boolean
}

type formState = {
  source: string;
  incomeType: IncomeTypeEnum;
  amount: number;
  date: Date;
  description: string;

}

export default function AddIncomeModal({ closeAddIncome, isOpen }: props) {
  const { mutate, isPending } = useAddIncome()
  const handleChange = (field: keyof typeof form, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };
  const [form, setForm] = useState({
    source: "",
    incomeType: IncomeTypeEnum.RECURRING,
    amount: "",
    date: undefined as Date | undefined,
    description: "",
  })

  const amountRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.date) return;
    mutate({
      category: form.source,
      incomeType: form.incomeType,
      amount: Number(form.amount),
      date: form.date.toISOString().split("T")[0],
      description: form.description,
    });

    closeAddIncome()
  };


  return (
  <Modal
    isOpen={isOpen}
    onClose={closeAddIncome}
    title="Add Income"
    width="max-w-xl"
  >
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 "
    >
      {/* Income Source */}
      <div className="flex flex-col">
        <Input
          type="text"
          placeholder="Income Source"
          value={form.source}
          onChange={(e) =>
            handleChange("source", e.target.value)
          }
          required
        />
      </div>

      {/* Income Type */}
      <ToggleGroup
        variant="outline"
        type="single"
        value={form.incomeType}
        onValueChange={(value) => {
          if (value) {
            handleChange(
              "incomeType",
              value as typeof form.incomeType
            );
          }
        }}
        
      >
        <ToggleGroupItem
          value={IncomeTypeEnum.RECURRING}
          className="w-full"
        >
          Recurring
        </ToggleGroupItem>

        <ToggleGroupItem
          value={IncomeTypeEnum.ONE_TIME}
          className="w-full"
        >
          One-time
        </ToggleGroupItem>
      </ToggleGroup>

      {/* Amount + Date */}
      <section className="flex flex-row justify-center gap-5">
        {/* Amount */}
        <div className="flex-1">
          <Input
            type="number"
            placeholder="Add Income"
            value={form.amount}
            onChange={(e) =>
              handleChange("amount", Number(e.target.value))
            }
            required
          />
        </div>

        {/* Date Picker */}
        <div className="flex-1 w-full">
          <Popover >
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="justify-start text-left w-full bg-black/0 text-white/60 font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {form.date
                  ? format(form.date, "PPP")
                  : "Pick a date"}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="z-[9999]">
              <Calendar
                mode="single"
                selected={form.date}
                onSelect={(selected) => {
                  if (selected) {
                    handleChange("date", selected);
                    
                  }
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </section>

      {/* Description */}
      <Textarea
        placeholder="Enter income description"
        value={form.description}
        onChange={(e) =>
          handleChange("description", e.target.value)
        }
      />

      {/* Submit */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          type="submit"
          disabled={isPending}
          className="bg-black/10"
        >
          {isPending ? "Adding..." : "Submit"}
        </Button>
      </div>
    </form>
  </Modal>
);
}