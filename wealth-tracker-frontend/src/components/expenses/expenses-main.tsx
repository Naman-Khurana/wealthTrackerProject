"use client"

import AddExpensesNBudgetButton from "./add-expenses-budget-button";
import TotalLuxuryEssentialExpensesBlock from "./expense-total-luxury-essentail-block";
import BudgetByCategory from "./charts/budget-by-category-section";
import InsightsNCompareSection from "./insights-compared-to-section";
import RecentExpensesSection from "./recent-transactions-section";


import ExpensesCategoriesPercentageUsageSection from "./expense-categories-percentage-wise";

export default function ExpensesComponent(){

    
    return(
        <main className="relative w-full h-[99%]  text-white flex justify-center items-center gap-3 ">
            

            
            <section className="h-full w-[70%]  flex flex-col gap-3">
                <section className="w-full h-[25%] flex items-center gap-2">
                
                    <TotalLuxuryEssentialExpensesBlock/>
        
                    <div className="h-full w-[20%] flex items-center justify-center">
                        <AddExpensesNBudgetButton />
                    </div>

                </section>
                <section className="w-full h-[50%] flex justify-center items-center">
                    <RecentExpensesSection/>
                </section>
                <section className="w-full h-[25%] flex justify-center">
                    <InsightsNCompareSection/>
                </section>
            </section>



            <section className="h-[100%] w-[30%]  flex flex-col jusitfy-center items-center gap-5 ">
                <div className="w-full h-[40%]  flex   bg-black/50 rounded-2xl justify-between items-center 
                    pl-[5%] border border-[1px] border-gray-600 shadow-2xl mt-2" >
                    <section className="w-[100%] h-full"> 
                        <ExpensesCategoriesPercentageUsageSection />
                    </section>
                </div>
                <div className="w-full h-[60%]  flex p-2  bg-black/50 rounded-2xl justify-between 
                     border border-[1px] border-gray-600 shadow-2xl">
                    <BudgetByCategory/>
                </div>
            </section>
        </main>
    )
}