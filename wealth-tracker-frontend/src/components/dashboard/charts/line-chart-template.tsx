"use client"

import React from "react"
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement,LineElement, Title,Tooltip, Legend, Filler, scales } from "chart.js"
import { Line } from "react-chartjs-2";
import { useLastSixMonthlyEarnings,useLastSixMonthlyExpenses } from "../dashboard-api-fetcher";


ChartJS.register(CategoryScale, LineElement, LinearScale, PointElement, Title, Tooltip, Legend, Filler);

export default function LineChartTemplate(){
    
        const{
            data:lastSixMonthsEarningsData,
            isLoading:loadingEarnings,
            isError:errorEarnings,
            error: earningsError,
        }=useLastSixMonthlyEarnings();
    
        const{
            data:lastSixMonthsExpensesData,
            isLoading:loadingExpeses,
            isError:errorExpenses,
            error: expensesError,
        }=useLastSixMonthlyExpenses();
    
        if(loadingEarnings || loadingExpeses){
            return(
                <main className="w-full flex flex-col items-center justify-center ">
                    <div className="">Loading...</div>
                </main>
                
            )
        }
        if(errorEarnings || errorExpenses){
            return(
                <main className="w-full flex flex-col items-center justify-center ">
                    <div className="">Error Loading Chart data...</div>
                </main>
                
            )
        }
    
        const months=["Jan", "Feb", "Mar", "Apr", "May", "June","July","Aug","Sep","Oct","Nov","Dec"];
        
    
        const labels = lastSixMonthsEarningsData?.map(record => months[record.month-1]);
        const datasets = lastSixMonthsExpensesData?.map(record=> record.total) ?? [];
        const datasets2 = lastSixMonthsEarningsData?.map(record=> record.total) ?? [];
        const maxValue=Math.max(...datasets,...datasets2)
    const data={
        labels: labels,
        datasets : [
        {
            label : "Expenses",
            data: datasets,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension : 0.1
        },
        {
            label : "Earnings",
            data: datasets2,
            fill: false,
            borderColor: "rgba(100, 242, 126, 1)",
            tension : 0.1
        }
        ]
    };
    const options={
        scales: {
            y: {
                title : {
                    display : true,
                    text: "INR",
                },
                display: true,
                min: 0,
            },
            x : {
                title : {
                    display : false,
                    text: "x-axis Label",
                },
                display : true,
            }
        }
    };

    return(
        <main className="w-full">
            <Line data={data} options={options} />
        </main>
    )
}