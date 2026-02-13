"use client"

import { useAllEssentialExpensesWithDetails, useAllLuxuryExpensesWithDetails } from "./expenses-api-fetcher"
import { useTotalExpensesNEarnings } from "../dashboard/dashboard-api-fetcher"


type NExpensesDataType={
    category : string;
    amount : number;
    date : string;
}


type essentialExpensesDataType={
    TotalessentialExpenses : number;
    essentialCategories: string[];
    essentialExpenses: NExpensesDataType[];
}


export default function TotalLuxuryEssentialExpensesBlock(){
    const typesOfExpenses=[
        {category: "Total Expenses"},
        {category : "Luxury Expenses"},
        {category: "Essential Expenses"}
    ]


    const{
        data:allEssentialExpensesData,
        isLoading:loadingAllEssentialExpenses,
        isError:errorAllEssentialExpenses,
        error: allEssentialExpensesError,
    }=useAllEssentialExpensesWithDetails()


    const{
        data:allLuxuryExpensesData,
        isLoading:loadingAllLuxuryExpenses,
        isError:errorAllLuxuryExpenses,
        error: allLuxuryExpensesError,
    }=useAllLuxuryExpensesWithDetails()

    const{
            data:totalExpensesNEarningsData,
            isLoading:loadingtotalExpensesNEarningsData,
            isError:errortotalExpensesNEarningsData,
            error: totalExpensesNEarningsDataError,
    }=useTotalExpensesNEarnings();
        


    console.log(allLuxuryExpensesData)
    // console.log(allEssentialExpensesData)
    const allExpensesBlock=typesOfExpenses.map((category) =>{
        let amount=0;
        if(category.category==="Essential Expenses"){
            amount=allEssentialExpensesData?.TotalessentialExpenses ?? 0;
        }
        else if(category.category==="Luxury Expenses")
            amount=allLuxuryExpensesData?.TotalluxuryExpenses ?? 0;
        else
            amount=totalExpensesNEarningsData?.totalExpense ?? 0;
        return(
            <div key={category.category} className="h-[90%] w-[30%] bg-black/50 rounded-4xl   flex flex-col justify-center 
            pl-[5%] border border-[1px] border-gray-600 shadow-2xl">
                <div className="text-white/70 text-[0.9rem] ">{category.category}</div>
                <div className="text-[1.7rem] ">₹ {amount}</div>

            </div>
        )
    })

    return (
        <main className="h-full w-full flex justify-center items-center gap-5">
            {allExpensesBlock}
        </main>
    )
}