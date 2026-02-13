"use client";

import { Chart as ChartJS, ArcElement, Tooltip,TooltipItem,Chart,ChartOptions, ChartTypeRegistry, } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { motion } from "framer-motion";
import { useExpensesCategoryWithPercentageUsage } from "../expenses-api-fetcher";


ChartJS.register(ArcElement, Tooltip);

export default function ExpensesCategoryDoughnutChart(){

  const{
      data:expensesCategoryWithPercentageUsageData,
      isLoading:loadingExpensesCategoryWithPercentageUsage,
      isError:errorExpensesCategoryWithPercentageUsage,
      error: expensesCategoryWithPercentageUsageError,
  }=useExpensesCategoryWithPercentageUsage()

  if(loadingExpensesCategoryWithPercentageUsage){
    return (
      <div>loading...</div>
    )
  }



const categories=expensesCategoryWithPercentageUsageData?.map(item => ({
  name: item.category,
  percentageUsed : item.percentageUsed
}

)) ?? [];

console.log("categories : " ,categories);
// console.log("category : " , categories2);



const categoryColors = [
  "#1f77b4", // blue
  "#ff7f0e", // orange
  "#2ca02c", // green
  "#d62728", // red
  "#9467bd", // purple
  "#8c564b", // brown
  "#e377c2", // pink
  "#7f7f7f", // gray
  "#bcbd22", // lime / yellow-green
  "#17becf", // cyan
  "#f28e2b", // bright orange
  "#4e79a7", // light blue
  "#76b7b2", // teal
  "#59a14f", // fresh green
  "#e15759", // coral red
  "#edc948", // bright yellow
  "#b07aa1", // lavender purple
  "#ff9da7", // light pink
  "#9c755f", // earthy brown
  "#bab0ab"  // light gray
]

    const data = {
  labels: categories.map(cat => cat.name), // Optional: labels on hover
  datasets: [
    {
      data: categories.map(cat => cat.percentageUsed),
      backgroundColor: categoryColors,
      borderWidth: 0,
      circumference: 360,
      rotation: 0,
      cutout: "80%",
    },
  ],
};
    
    const options : ChartOptions<"doughnut"> = {
        animation: {
            animateRotate: true,
            animateScale: true,
        },
        plugins: {
            legend: {
            display: false,
            position: "right",
            },
            tooltip: {
            callbacks: {
                    label: function (context : TooltipItem<"doughnut">) {
                    const label = context.label || "";
                    const value = context.parsed.toFixed(2);
                    return `${label}: ${value}% used`;
                    },
                },
            },
        },
    };
    
      return (
        <div >
          {/* <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}> */}
            <Doughnut data={data} options={options} />
          {/* </motion.div> */}
          
        </div>
      );
}