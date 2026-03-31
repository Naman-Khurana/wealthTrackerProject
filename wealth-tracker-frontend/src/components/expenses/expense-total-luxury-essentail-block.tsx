"use client"

import { useAllEssentialExpensesWithDetails, useAllLuxuryExpensesWithDetails } from "./expenses-api-fetcher"
import { useTotalExpensesNEarnings } from "../dashboard/dashboard-api-fetcher"
import CommanMoneyStatCardGroup from "../comman/ui/comman-money-stat-card-group";






export default function TotalLuxuryEssentialExpensesBlock() {



    const {
        data: allEssentialExpensesData,
    } = useAllEssentialExpensesWithDetails()


    const {
        data: allLuxuryExpensesData,
    } = useAllLuxuryExpensesWithDetails()

    const {
        data: totalExpensesNEarningsData,
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