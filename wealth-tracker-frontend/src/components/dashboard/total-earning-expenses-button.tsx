"use client"
import { useTotalExpensesNEarnings } from "./dashboard-api-fetcher"

type inputs = {
    title: string;
    value: string;
}

type DashBoardDataDTO = {
    user: string;
    totalEarnings: number;
    totalExpense: number;
}

export default function TotalEarningNExpensesButtonTemplate(props: inputs) {


    const {
        data: totalExpensesNEarningsData,
        isLoading: loadingtotalExpensesNEarningsData,
        isError: errortotalExpensesNEarningsData,
        error: totalExpensesNEarningsDataError,
    } = useTotalExpensesNEarnings();



    const totalExpensesNEarnings = totalExpensesNEarningsData;

    const valueToDisplay = totalExpensesNEarnings && props.value in totalExpensesNEarnings ?
        totalExpensesNEarnings[props.value as keyof DashBoardDataDTO] : "Loading.."



    return (
        <button key={props.title} className="flex  justify-center h-1/2 items-center w-[100%]  rounded-4xl bg-gray-500/20 shadow-lg shadow-black/40 border-[1px] border-white/5 transition-all duration-200 hover:bg-gray-500/30">
            <div className="w-[30%] h-full flex justify-center items-center">
                image
            </div>
            <div className="flex flex-col w-[70%] h-full justify-center">
                <h1>{props.title} </h1>
                <h3>Rs.{valueToDisplay}</h3>
            </div>
        </button>
    )
}