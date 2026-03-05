import { IncomeTypeEnum } from "./enums";

export type Earnings = {
  id: number;
  category: string;
  description: string;
  date: string;        // because backend sends ISO string
  amount: number;
  incomeType: IncomeTypeEnum;
};

export type AddIncomePayload = {
  category: string;
  incomeType: IncomeTypeEnum;
  amount: number;
  date: string;
  description: string;
};

export type EarningsIncomeTypeWise={
  totalEarnings: number;
  oneTimeEarnings: number;
  recurringEarnings: number;
}