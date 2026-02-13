"use client"
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type NExpensesDataType={
    category : string;
    amount : number;
    date : string;
}

type essentialExpensesDataType={
    TotalessentialExpenses : number;
    essentialCategories: string[];
    essentialExpenses: NExpensesDataType[];
}

type luxuryExpensesDataType={
    luxuryCategories: string[];
    LuxuryExpenses: NExpensesDataType[],
    TotalluxuryExpenses: number;

}

type ExpensesCategoryWithPercentageUsageDataType={
    category : string;
    percentageUsed : number;
}

type BudgetUsageResponseDTO = {
  budgetExists: boolean;
  percentageUsed: number;
};

type AllCategoriesBudgetUsageResponseMapDTO = Record<string, BudgetUsageResponseDTO>;



const fetchNExpenses=async(n : number)=>{
    const details=await axios.get('http://localhost:8080/api/expenses/recentExpenses', 
    {
        params:{
            n: n,
        },
        withCredentials: true,    
    });
    return details.data;
}

const fetchEssentialExpensesDetailWithDetails=async()=>{
    const details=await axios.get('http://localhost:8080/api/expenses/essential', 
    {
        withCredentials: true,    
    });
    return details.data.body;
} 

const fetchLuxuryExpensesDetailWithDetails=async()=>{
    const details=await axios.get('http://localhost:8080/api/expenses/luxury', 
    {
        withCredentials: true,    
    });
    return details.data.body;
} 

const fetchExpensesCategoryWithPercentageUsage=async()=>{
    const details=await axios.get('http://localhost:8080/api/category/getAllExpensesCategoriesWithPercentageWiseUsage', 
    {
        withCredentials: true,    
    });
    return details.data
}

const fetchAllBudgetCategoriesWithPercentageUsage=async()=>{
    const details=await axios.get('http://localhost:8080/api/expenses/budget/percentageAllCategoriesBudgetUsedBudgetRangeCategoryWise', 
        {
            params:{
                //for now implementation is only availabel for montly criterias 
                budgetRangeCategory : "MONTHLY"
            },
        withCredentials: true,    
    });
    return details.data;
}




export function useNExpenses(n : number){
    return useQuery<NExpensesDataType[]>({
       queryKey: ["nExpenses"],
       queryFn: ()=> fetchNExpenses(n),
       staleTime :Infinity, 
    });

}

export function useAllEssentialExpensesWithDetails(){
    return useQuery<essentialExpensesDataType>({
       queryKey: ["allEssentailExpensesWithDetails"],
       queryFn: fetchEssentialExpensesDetailWithDetails,
       staleTime :Infinity, 
    });

}

export function useAllLuxuryExpensesWithDetails(){
    return useQuery<luxuryExpensesDataType>({
       queryKey: ["allLuxuryExpensesWithDetails"],
       queryFn: fetchLuxuryExpensesDetailWithDetails,
       staleTime :Infinity, 
    });

}
export function useExpensesCategoryWithPercentageUsage(){
    return useQuery<ExpensesCategoryWithPercentageUsageDataType[]>({
        queryKey: ["expensesCategoryWithPercentageUsage"],
        queryFn: fetchExpensesCategoryWithPercentageUsage,
        staleTime : Infinity,
    });
}
export function useAllBudgetCategoriesWithPercentageUsage(){
    return useQuery<AllCategoriesBudgetUsageResponseMapDTO>({
        queryKey: ["allBudgetCategoriesWithPercentageUsage"],
        queryFn: fetchAllBudgetCategoriesWithPercentageUsage,
        staleTime : Infinity,
    });
}

