import ExpensesCategoryDoughnutChart from "./charts/expenses-category-doughnut-chart"

import { useExpensesCategoryWithPercentageUsage } from "./expenses-api-fetcher"

export default function ExpensesCategoriesPercentageUsageSection(){

    const{
      data:expensesCategoryWithPercentageUsageData,
      isLoading:loadingExpensesCategoryWithPercentageUsage,
      isError:errorExpensesCategoryWithPercentageUsage,
      error: expensesCategoryWithPercentageUsageError,
    }=useExpensesCategoryWithPercentageUsage()

const categories = expensesCategoryWithPercentageUsageData?.map(item => (
  <section key={item.category} className="flex w-full text-xs text-nowrap ">
    <div className="w-[90%] ">{item.category} : </div>
    <div className="w-[10%] ">{item.percentageUsed.toFixed(2)}%</div>
  </section>
));
    return(
        <main className=" w-full h-full flex gap-2 items-center" >
            <div className="w-[55%]">
                <ExpensesCategoryDoughnutChart/>
            </div>
            <section className="flex flex-col  w-[45%] h-full overflow-y-scroll overflow-x-hidden  ">
                <div className="h-[15%]"></div>
                <h1 className="font-semibold h-[15%] ">Categories</h1>
                <div className="w-[80%] flex flex-col gap-1 h-[80%] ">{categories} </div>
            </section>

        </main>
    )
}