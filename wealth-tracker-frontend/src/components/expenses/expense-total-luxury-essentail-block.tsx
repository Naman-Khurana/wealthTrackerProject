"use client"

import { useAllEssentialExpensesWithDetails, useAllLuxuryExpensesWithDetails } from "./expenses-api-fetcher"
import { useTotalExpensesNEarnings } from "../dashboard/dashboard-api-fetcher"
import MoneyStatCard from "../comman/ui/money_stat_card";
import CommanMoneyStatCardGroup from "../comman/ui/comman-money-stat-card-group";


type NExpensesDataType = {
    category: string;
    amount: number;
    date: string;
}


type essentialExpensesDataType = {
    TotalessentialExpenses: number;
    essentialCategories: string[];
    essentialExpenses: NExpensesDataType[];
}


export default function TotalLuxuryEssentialExpensesBlock() {



    const {
        data: allEssentialExpensesData,
        isLoading: loadingAllEssentialExpenses,
        isError: errorAllEssentialExpenses,
        error: allEssentialExpensesError,
    } = useAllEssentialExpensesWithDetails()


    const {
        data: allLuxuryExpensesData,
        isLoading: loadingAllLuxuryExpenses,
        isError: errorAllLuxuryExpenses,
        error: allLuxuryExpensesError,
    } = useAllLuxuryExpensesWithDetails()

    const {
        data: totalExpensesNEarningsData,
        isLoading: loadingtotalExpensesNEarningsData,
        isError: errortotalExpensesNEarningsData,
        error: totalExpensesNEarningsDataError,
    } = useTotalExpensesNEarnings();



    console.log(allLuxuryExpensesData)
    // console.log(allEssentialExpensesData)
    const totalEssentialExpenses = allEssentialExpensesData?.TotalessentialExpenses ?? 0;
    const totalluxuryExpenses = allLuxuryExpensesData?.TotalluxuryExpenses ?? 0;
    const totalExpenses = totalExpensesNEarningsData?.totalExpense ?? 0;


    const typesOfExpenses = [
        { title: "Total Expenses", amount: totalExpenses },
        { title: "Luxury Expenses", amount: totalluxuryExpenses },
        { title: "Essential Expenses", amount: totalEssentialExpenses },
    ]



    return (
        <main className="h-full w-full flex justify-center items-center gap-2">
            <CommanMoneyStatCardGroup items={typesOfExpenses} />
        </main>
    )
}