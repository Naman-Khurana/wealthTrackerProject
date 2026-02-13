"use client"

import AddExpensesNBudgetButton from "./add-expenses-budget-button";
import ExpensesCategoryDoughnutChart from "./charts/expenses-category-doughnut-chart";
import TotalLuxuryEssentialExpensesBlock from "./expense-total-luxury-essentail-block";
import BudgetByCategory from "./charts/budget-by-category-section";
import InsightsNCompareSection from "./insights-compared-to-section";
import RecentExpensesSection from "./recent-transactions-section";
import AddExpensesSection from "./add-expenses-section";
import Example from "./add-expense-section-two";
import { useState } from "react";
import AddBudgetSection from "./add-budget-section";
import ExpensesCategoriesPercentageUsageSection from "./expense-categories-percentage-wise";

export default function ExpensesComponent(){
    const [showAddExpense,setShowAddExpenses]=useState(false);
    const [showAddBudget,setShowAddBudget]=useState(false);
    const openAddExpensesButton=()=>{
        setShowAddExpenses(!showAddExpense);
    }
    const openAddBudgetButton=()=>{
        setShowAddBudget(!showAddBudget);
    }
    
    return(
        <main className="relative w-full h-[99%]  text-white flex justify-center items-center gap-3 ">
            
            { showAddExpense &&(<section className="absolute w-full backdrop-blur-xs h-full z-[9999] flex flex-col  ">
                <AddExpensesSection closeAddExpenses={openAddExpensesButton} />
            </section>)
            }
            {showAddBudget && (<section className="absolute w-full backdrop-blur-xs h-full z-[9999] flex flex-col  ">
                <AddBudgetSection closeAddBudget={openAddBudgetButton} />
            </section>)
            }
            <section className="h-full w-[70%]  flex flex-col ">
                <section className="w-full h-[25%]  flex">
                    <section className="h-full w-[80%] flex">
                        {/* //OVERVIEW SECTION */}
                        <TotalLuxuryEssentialExpensesBlock/>
                        {/* <div className="h-full w-[33.34%] bg-indigo-800">TOTAL EXPENSES</div>
                        <div className="h-full w-[33.34%] bg-cyan-800">LUXURY EXPENSES</div>
                        <div className="h-full w-[33.34%] bg-lime-800">ESSENTIAL EXPENSES</div>     */}
                    </section> 
                    <div className="h-full w-[20%]  flex flex-col">
                        <AddExpensesNBudgetButton openAddExpenses={openAddExpensesButton} openAddBudget={openAddBudgetButton}/>
                    </div>

                </section>
                <section className="w-full h-[50%] flex justify-center items-center">
                    <RecentExpensesSection/>
                </section>
                <section className="w-full h-[25%] flex justify-center">
                    <InsightsNCompareSection/>
                </section>
            </section>



            <section className="h-[97%] w-[30%]  flex flex-col jusitfy-center items-center gap-5">
                <div className="w-full h-[40%]  flex   bg-black/50 rounded-4xl justify-between items-center 
                    pl-[5%] border border-[1px] border-gray-600 shadow-2xl">
                    <section className="w-[100%] h-full"> 
                        <ExpensesCategoriesPercentageUsageSection />
                    </section>
                </div>
                <div className="w-full h-[60%]  flex p-2  bg-black/50 rounded-4xl justify-between 
                     border border-[1px] border-gray-600 shadow-2xl">
                    <BudgetByCategory/>
                </div>
            </section>
        </main>
    )
}