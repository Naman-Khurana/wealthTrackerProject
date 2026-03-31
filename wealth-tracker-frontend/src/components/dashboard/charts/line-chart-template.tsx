"use client"

import React from "react"
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js"

import { useLastSixMonthlyEarnings, useLastSixMonthlyExpenses } from "../dashboard-api-fetcher";
import LineChart from "@/components/comman/graphs/linechart";

ChartJS.register(CategoryScale, LineElement, LinearScale, PointElement, Title, Tooltip, Legend, Filler);

export default function LineChartTemplate() {

    const {
        data: earnings,
        isLoading: loadingEarnings,
        error: errorEarnings
    } = useLastSixMonthlyEarnings()

    const {
        data: expenses,
        isLoading: loadingExpenses,
        error: errorExpenses
    } = useLastSixMonthlyExpenses()

    if (loadingEarnings || loadingExpenses) {
        return <div>Loading...</div>
    }
    if (errorEarnings || errorExpenses) {
        return (
            <main className="w-full flex flex-col items-center justify-center ">
                <div className="">Error Loading Chart data...</div>
            </main>

        )
    }

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const labels = earnings?.map(r => months[r.month - 1]) ?? []

    const expenseData = expenses?.map(r => r.total) ?? []
    const earningsData = earnings?.map(r => r.total) ?? []

    return (
        <LineChart
            labels={labels}
            yAxisLabel="INR"
            datasets={[
                {
                    label: "Expenses",
                    data: expenseData,
                    borderColor: "rgb(75,192,192)"
                },
                {
                    label: "Earnings",
                    data: earningsData,
                    borderColor: "rgba(100,242,126,1)"
                }
            ]}
        />
    )
}