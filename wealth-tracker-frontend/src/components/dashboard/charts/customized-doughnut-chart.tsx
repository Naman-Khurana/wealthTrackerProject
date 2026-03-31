"use client";

import { Chart as ChartJS, ArcElement, Tooltip, ChartOptions, } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import React from "react";
import { usePercentageBudgetUsed } from "../dashboard-api-fetcher";

ChartJS.register(ArcElement, Tooltip);

interface CustomChartOptions extends ChartOptions<"doughnut"> {
  needleValue?: number;
}


type Prop={
  type : string;
}



//  ChartJS.register(needlePlugin); 
export default function CustomDoughnutChart(props : Prop){
  // const [budgetExists,setBudgetExists] =useState(false);

    


  const{
    data:percentageBudgetUsedData,
    isLoading:loadingPercentageBudgetUsed,
  }=usePercentageBudgetUsed(props.type);


  if(loadingPercentageBudgetUsed){
    return(
      <div>Loading...</div>
    )
  }

  
  const budgetExists=percentageBudgetUsedData?.budgetExists;
  
  console.log(budgetExists)
  const budgetUsedPercentage = (percentageBudgetUsedData?.percentageUsed ?? 0) * 100;
  const remaining = Math.max(100 - budgetUsedPercentage, 0);
  const needlePercentageDisplay=Math.min(100,budgetUsedPercentage);
  const data = {
    datasets: [
      {
        data: [needlePercentageDisplay, remaining],
        backgroundColor: [
          "#ef4444", // red for used percentage
          "#1f2937", // dark background for remaining
        ],
        borderWidth: 0,
        circumference:360,
        rotation: 360,
        cutout: "80%",
      },
    ],
  };

  const options : CustomChartOptions = {
    responsive: true,
    cutout: "80%",
    needleValue : needlePercentageDisplay,
    animation: {
            animateRotate: true,
            animateScale: true,
        },
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className="relative w-66 mx-auto">
      <Doughnut data={data} options={options} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xl font-semibold flex flex-col items-center justify-center text-nowrap">
        {budgetExists ?<div> {budgetUsedPercentage.toFixed(2)}% <br/>Budget Used</div> : <div>No Valid Budget Exists</div>}
      </div>
      {budgetUsedPercentage > 100 && (
  <div className="text-xs text-red-400 mt-1">Over Budget 🚨</div>
)}
    </div>
  );
}