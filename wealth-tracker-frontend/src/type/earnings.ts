import { IncomeTypeEnum } from "./enums";

export type Earnings = {
  id: number;
  category: string;
  description: string;
  date: string;        // because backend sends ISO string
  amount: number;
  incomeType: IncomeTypeEnum;
};