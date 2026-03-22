"use client"

import React from "react"
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler, scales, ChartData, } from "chart.js";
import { Bar } from "react-chartjs-2"
import { title } from "process";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLastSixMonthlyEarnings, useLastSixMonthlyExpenses } from "../dashboard-api-fetcher";
import SectionCard from "@/components/comman/ui/section-card";

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler);

type fetchedDataType = {
    year: number;
    month: number;
    total: number;
}


export default function BarChartTemplate() {


    const {
        data: lastSixMonthsEarningsData,
        isLoading: loadingEarnings,
        isError: errorEarnings,
        error: earningsError,
    } = useLastSixMonthlyEarnings();

    const {
        data: lastSixMonthsExpensesData,
        isLoading: loadingExpenses,
        isError: errorExpenses,
        error: expensesError,
    } = useLastSixMonthlyExpenses();

    if (loadingEarnings || loadingExpenses) {
        return (
            <main className="w-full flex flex-col items-center justify-center ">
                <div className="">Loading...</div>
            </main>

        )
    }
    if (errorEarnings || errorExpenses) {
        return (
            <main className="w-full flex flex-col items-center justify-center ">
                <div className="">Error Loading Chart data...</div>
            </main>

        )
    }

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];


    const labels = lastSixMonthsEarningsData?.map(record => months[record.month - 1]);
    const datasets = lastSixMonthsExpensesData?.map(record => record.total) ?? [];
    const datasets2 = lastSixMonthsEarningsData?.map(record => record.total) ?? [];
    const maxValue = Math.max(...datasets, ...datasets2)
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Expenses",
                data: datasets,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 205, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                ],
                borderColor: [
                    "rgb(255, 99, 132)",
                    "rgb(255, 159, 64)",
                    "rgb(255, 205, 86)",
                    "rgb(75, 192, 192)",
                ],
                borderWidth: 1,
                barPercentage: 1,
                borderRadius: {
                    topLeft: 5,
                    topRight: 5,

                },

            },
            {
                label: "Earnings",
                data: datasets2,
                backgroundColor: [
                    "rgba(19, 167, 34, 0.2)",
                    "rgba(177, 15, 232, 0.2)",
                    "rgba(232, 68, 18, 0.2)",
                    "rgba(188, 8, 8, 0.2)",
                ],
                borderColor: [
                    "rgba(19, 167, 34, 1)",
                    "rgba(177, 15, 232, 1)",
                    "rgba(232, 68, 18, 1)",
                    "rgba(188, 8, 8, 1)",
                ],
                borderWidth: 1,
                barPercentage: 1,
                borderRadius: {
                    topLeft: 5,
                    topRight: 5,

                },

            }
        ]
    };

    const options = {
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'INR',

                },
                display: true,
                beginAtZero: true,
                max: maxValue,
                grid: { display: false },

            },
            x: {
                title: {
                    display: false,
                    text: "x-axis Lable",
                },
                display: true,
                grid: { display: false },

            }
        }
    }
    return (

        <main className="w-full h-full">
            <SectionCard className="w-full h-full border-none  bg-zinc-800/30 ">
                {/* //by default data is default to string[] so for typescirpt we specify the data tyep to be of number[] for bar chart */}
                <Bar key={1} data={data as ChartData<"bar", number[], string>} options={options} />
            </SectionCard>
        </main>
    )
}