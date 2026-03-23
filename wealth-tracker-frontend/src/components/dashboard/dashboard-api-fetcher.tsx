"use client"
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios_instance";

type fetchedDataType = {
    year: number;
    month: number;
    total: number;
}

type fetchBudgetType = {
    budget: number;
    category: string;
    endDate: string;
    Limit: number;
    startDate: string;
}

type fetchTotalExpensesNEarningsDTO = {
    user: string;
    totalEarnings: number;
    totalExpense: number;
}

type fetchPercentageBudgetUsedDTO = {
    budgetExists: boolean;
    percentageUsed: number;
}

const fetchLastSixMonthlyEarnings = async () => {
    const details = await axiosInstance.get('/earnings/lastSixMonthsData ');
    return details.data;

};

const fetchLastSixMonthlyExpenses = async () => {
    const details = await axiosInstance.get('/expenses/lastSixMonthsData ');
    return details.data;

};

const fetchAllExpensesBudgets = async () => {
    const details = await axiosInstance.get('/expenses/budget/get ');
    return details.data;
}

const fetchTotalExpensesNEarnings = async () => {
    const details = await axiosInstance.get('/dashboard/');
    return details.data;
}


const fetchPercentageBudgetUsed = async (budgetRangeCategory: string) => {
    const details = await axiosInstance.get('/expenses/budget/percentageBudgetUsed',
        {
            params: {
                budgetRangeCategory: budgetRangeCategory,
                expenseCategory: "TOTAL EXPENSES",
            },
        });
    return details.data;
}



export function useLastSixMonthlyEarnings() {
    return useQuery<fetchedDataType[]>({
        queryKey: ["earnings"],
        queryFn: fetchLastSixMonthlyEarnings,
        staleTime: Infinity,
    });

}




export function useLastSixMonthlyExpenses() {
    return useQuery<fetchedDataType[]>({
        queryKey: ["expenses"],
        queryFn: fetchLastSixMonthlyExpenses,
        staleTime: Infinity,
    });

}
export function useAllExpensesBudgets() {
    return useQuery<fetchBudgetType[]>({
        queryKey: ["allSetExpensesBudgets"],
        queryFn: fetchAllExpensesBudgets,
        staleTime: Infinity,
    });
}
export function useTotalExpensesNEarnings() {
    return useQuery<fetchTotalExpensesNEarningsDTO>({
        queryKey: ["totalExpensesNEarnings"],
        queryFn: fetchTotalExpensesNEarnings,
        staleTime: Infinity,
    });
}
export function usePercentageBudgetUsed(budgetRangeCategory: string, expenseCategory: string) {
    return useQuery<fetchPercentageBudgetUsedDTO>({
        queryKey: ["percentageBudgetused", budgetRangeCategory],
        queryFn: () => fetchPercentageBudgetUsed(budgetRangeCategory),
        // staleTime: Infinity
        staleTime: 5 * 60 * 1000, // cache for 5 mins
    });
}