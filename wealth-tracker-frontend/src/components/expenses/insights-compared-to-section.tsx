import { useLastSixMonthlyExpenses } from "../dashboard/dashboard-api-fetcher";
import { MoveDown ,MoveUp } from "lucide-react";
import { useExpensesCategoryWithPercentageUsage,useAllBudgetCategoriesWithPercentageUsage } from "./expenses-api-fetcher";
export default function InsightsNCompareSection(){

    
    const blocks=[
        {
            name : "insights"
            // Average daily expense <br />
            //             Most expensive category this month<br />
            //             Days left in budget cycle<br />
        },
        
    ]

    const{
        data:lastSixMonthsExpensesData,
        isLoading:loadingExpenses,
        isError:errorExpenses,
        error: expensesError,
    }=useLastSixMonthlyExpenses();
    const{
          data:expensesCategoryWithPercentageUsageData,
          isLoading:loadingExpensesCategoryWithPercentageUsage,
          isError:errorExpensesCategoryWithPercentageUsage,
          error: expensesCategoryWithPercentageUsageError,
      }=useExpensesCategoryWithPercentageUsage()


      const{
          data:allBudgetCategoriesWithPercentageUsageData,
          isLoading:loadingAllBudgetCategoriesWithPercentageUsage,
          isError:errorAllBudgetCategoriesWithPercentageUsage,
          error: allBudgetCategoriesWithPercentageUsageError,
        }=useAllBudgetCategoriesWithPercentageUsage()
        console.log(allBudgetCategoriesWithPercentageUsageData);

    const lastMonthDays=()=>{
        const now = new Date();

        // Last month (0-indexed, so 0 = Jan, 11 = Dec)
        const lastMonth = now.getMonth() - 1;

        // Handle January (wrap around to December of previous year)
        const year = lastMonth === -1 ? now.getFullYear() - 1 : now.getFullYear();
        const month = lastMonth === -1 ? 11 : lastMonth;

        // Number of days in last month
        const daysInLastMonth = new Date(year, month + 1, 0).getDate();
        return daysInLastMonth;

    }
    // console.log("NO OF DAYS IN LAST MONTH IS : " + lastMonthDays());

   
    if(loadingExpenses)
            return <div>Loading...</div>
    const highest = expensesCategoryWithPercentageUsageData?.reduce((max, item) =>
        item.percentageUsed > max.percentageUsed ? item : max
    );

    

    const overBudgetCategories = Object.entries(allBudgetCategoriesWithPercentageUsageData??[])
        .filter(([category, info]) => info.percentageUsed > 100)
        .map(([category]) => category);

        console.log(overBudgetCategories);


    const lastSixMonthsData=lastSixMonthsExpensesData??[];

     if (lastSixMonthsData.length < 2) {
    return <div>Not enough data to generate insights</div>;
}
    // console.log(lastSixMonthsData);
    const currentMonthDailyAvg=(lastSixMonthsData[lastSixMonthsData.length-1].total)/(new Date().getDate());
    const lastMonthDailyAvg=(lastSixMonthsData[lastSixMonthsData.length-2].total)/lastMonthDays();
    const buttons = blocks.map((block) => { 
        return(
            <div key={block.name} className=" w-full h-[90%] bg-black/25 rounded-2xl   flex flex-col  justify-center 
            pl-[5%] border border-[1px] border-gray-600 shadow-2xl">
                <h1 className=" ">{block.name.toUpperCase()}</h1>
                <section className="text-white/50 flex flex-col">
                    <div>Your Avg daily Spending <span className="text-white">{currentMonthDailyAvg > lastMonthDailyAvg ? "Increased" : "decreased"}  </span> to <span className="text-white">₹{currentMonthDailyAvg.toFixed(2)} </span> from <span className="text-white">₹{lastMonthDailyAvg.toFixed(2)}</span> <span className="inline-flex">{currentMonthDailyAvg < lastMonthDailyAvg ? <MoveDown color="green" className="h-[15px]" strokeWidth={3}  /> : <MoveUp color="red" className="h-[15px] w-[5px]" strokeWidth={3} />} </span> </div>
                    <div>Highest Expense Category for this Month is <span className="text-white">{highest?.category} ⚠️</span>  </div>
                    <div>You have exceeded your budget in <span className="text-white">{overBudgetCategories.length}</span> Categories  { overBudgetCategories.length > 0 &&  <span className="text-white h-[20px]" >🔺</span>}</div>
                </section>
            </div>
        )
    })
    return(
        <section className="w-[100%] h-full flex justify-center items-center gap-4">
            {buttons}
        </section>
    )
}