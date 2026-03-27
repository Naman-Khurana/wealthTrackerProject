"use client";

import { Chart as ChartJS, ArcElement, Tooltip,Chart, ChartTypeRegistry, ChartOptions, } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import React, { useState } from "react";
import { usePercentageBudgetUsed } from "../dashboard-api-fetcher";

ChartJS.register(ArcElement, Tooltip);

interface CustomChartOptions extends ChartOptions<"doughnut"> {
  needleValue?: number;
}
type DashBoardDataDTO={
    user:string;
    totalEarnings: number;
    totalExpense : number;
}

type fetchBudgetType={
    budget : number;
    category : string;
    endDate : string;
    Limit : number;
    startDate : string; 
}

type Prop={
  type : string;
}

// 🔌 Plugin to draw needle
// const needlePlugin = {
//   id: "needle",
//   afterDatasetDraw(chart: Chart) {
//     const needleValue = (chart.config.options as any)?.needleValue || 0;

//     const meta = chart.getDatasetMeta(0);
//     const arc = meta.data[0] as ArcElement;
//     if(!arc)
//         return;

//     const cx = arc.x;
//     const cy = arc.y;
//     const r = arc.outerRadius;

//     const angle = (-Math.PI/2) + ((2*Math.PI) * needleValue / 100);
//     const dx = cx + (r - 40) * Math.cos(angle);
//     const dy = cy + (r - 40) * Math.sin(angle);

//     const { ctx } = chart;
//     ctx.save();
//     ctx.beginPath();
//     ctx.lineWidth = 3;
//     ctx.strokeStyle = "#facc15"; // yellow
//     ctx.moveTo(cx, cy);
//     ctx.lineTo(dx, dy);
//     ctx.stroke();
//     ctx.restore();
//   },
// };

//  ChartJS.register(needlePlugin); 
export default function CustomDoughnutChart(props : Prop){
  // const [budgetExists,setBudgetExists] =useState(false);

    


  const{
    data:percentageBudgetUsedData,
    isLoading:loadingPercentageBudgetUsed,
    isError:errorPercentageBudgetUsed,
    error: percentageBudgetUsedError,
  }=usePercentageBudgetUsed(props.type,"Total Expenses");


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
  // console.log(validBudget);
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