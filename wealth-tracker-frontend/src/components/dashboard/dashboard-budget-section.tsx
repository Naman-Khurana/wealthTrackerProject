"use client"

import CustomDoughnutChart from "./charts/customized-doughnut-chart"
import { useState } from "react"

// Steps : 
// 1. create a state to store the current type of category of budget to show 
// 2. add a onclick to buttons to change the state to store the category of button clicked 
// 3. now pass this category to doughnut chart by passing the state as a prop to Doughnut chart Component.


//Steps for category wise data fetching from backend
// 1. create an api that returns expenses of custom starting date ,so if custom budget exists get from starting date of custom budget 
// 2. otherwise, if yearly, get data by setting starting date as current years first day( i.e 1st jan)
// 3. otherwise, if monthly, get data by setting starting date as current month first day(i.e 1st of the current month)  
export default function DashBoardBudgetSection(){

    const[category,setCategory]=useState<string>("MONTHLY");
    
    const budgetOptions=[
        {
            title: "YEARLY"
        },
        {
            title: "MONTHLY"
        },
        {
            title: "CUSTOM"
        }
    ]
    const buttons=budgetOptions.map((option) => {
        return(
            <button key={option.title} className="w-full text-sm text-white/20 hover:bg-gray-600 p-[4px] rounded-4xl" onClick={()=>setCategory(option.title)}>
                {option.title}
            </button>
        )
    })

    return(
        <section className="w-full flex justify-center items-center gap-5">
            <CustomDoughnutChart type={category}/>
            <div className="flex flex-col justify-center items-center ">
                {buttons}
            </div>
        </section>
    )
    
}