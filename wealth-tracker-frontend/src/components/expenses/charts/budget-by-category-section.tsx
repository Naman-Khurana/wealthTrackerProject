import { useAllBudgetCategoriesWithPercentageUsage } from "../expenses-api-fetcher";

type BudgetCategory = {
  name: string;
  percentageUsed: number;
};

type BudgetUsageResponseDTO = {
  budgetExists: boolean;
  percentageUsed: number;
};

type AllCategoriesBudgetUsageResponseMapDTO = Record<string, BudgetUsageResponseDTO>;




export default function BudgetByCategory() {

  const{
    data:allBudgetCategoriesWithPercentageUsageData,
    isLoading:loadingAllBudgetCategoriesWithPercentageUsage,
    isError:errorAllBudgetCategoriesWithPercentageUsage,
    error: allBudgetCategoriesWithPercentageUsageError,
  }=useAllBudgetCategoriesWithPercentageUsage()
  if(loadingAllBudgetCategoriesWithPercentageUsage)
      return (<div> Loading </div>);

  const budgetCategories : BudgetCategory[] = allBudgetCategoriesWithPercentageUsageData ? 
   Object.entries(allBudgetCategoriesWithPercentageUsageData).map(([category, usage]) => {
    return {
      name : category,
      percentageUsed :  usage.budgetExists ? usage.percentageUsed *100 : -1    
    }
  }) : [];

  console.log(budgetCategories);

    // budgetCategories
  // const budgetCategoriesDummy: Budge`tCategory[] = [
  //   { name: "Food", percentageUsed: 45 },
  //   { name: "Rent", percentageUsed: 80 },
  //   { name: "Entertainment", percentageUsed: 95 },
  //   { name: "Travel", percentageUsed: 30 },
  //   {name : "vacation", percentageUsed : 50},
  // ];
    const budgetContent=budgetCategories.map((category : BudgetCategory) => {
        const percentage = Math.min(category.percentageUsed, 100); // cap at 100
        const getBarColor = () => {
          if(percentage < 0) return "bg-black"
          if (percentage < 50) return "bg-green-500";
          if (percentage < 75) return "bg-yellow-400";
          if (percentage <= 100) return "bg-red-400";
          return "bg-red-700"; // over budget
        };

        return (
          <div key={category.name}>
            
            <div className="flex justify-between text-white text-sm font-medium mb-1">
              <span>{category.name}</span>
              <span>{percentage>=0 ? `${percentage}%` : `N/A`}</span>
            </div>
            <div className="h-1 bg-gray-300 rounded-full overflow-hidden ">
              <div
                className={`h-full ${getBarColor()}  `}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
    })



  return (
    <section className="w-full flex flex-col justify-center  ">
        <h1 className="pl-4 text-[1rem] h-[15%]">Budget by Category</h1>
    <div className="auto-hide-scrollbar p-4 space-y-3  h-[80%] flex flex-col justify-start overflow-y-scroll mt-[-5px]">
        {budgetContent}
      
      
    </div>
    <div className="h-[5%]"></div>
    </section>
  );
}
