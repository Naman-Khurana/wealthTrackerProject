"use client"

import React from "react"

import { useLastSixMonthlyEarnings } from "@/components/dashboard/dashboard-api-fetcher";
import LineChart from "@/components/comman/graphs/linechart";
import { error } from "console";




export default function IncomeGrowthLineChart() {

    const {
        data: earnings,
        isLoading: loadingEarnings,
        error: errorEarnings
    } = useLastSixMonthlyEarnings()

        
    if (loadingEarnings) {
        return <div>Loading...</div>
    }
    if (errorEarnings) {
        return (
            <main className="w-full flex flex-col items-center justify-center ">
                <div className="">Error Loading Chart data...</div>
            </main>

        )
    }

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const labels = earnings?.map(r => months[r.month - 1]) ?? []


    const earningsData = earnings?.map(r => r.total) ?? []

    return (
        <LineChart
            labels={labels}
            yAxisLabel="INR"
            datasets={[
            
                {
                    label: "Earnings",
                    data: earningsData,
                    borderColor: "rgba(100,242,126,1)"
                }
            ]}
        />
    )
}