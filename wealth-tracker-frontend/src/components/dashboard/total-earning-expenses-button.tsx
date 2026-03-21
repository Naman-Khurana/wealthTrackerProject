"use client"
import { useTotalExpensesNEarnings } from "./dashboard-api-fetcher"
import Card from "../comman/ui/card"

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

        <Card key={props.title} className="flex  flex-row justify-around item-center  h-1/2 items-center rounded-4xl  transition-all duration-200 hover:bg-gray-500/30 ">
            <div className=" h-full flex justify-center  items-center">
                image
            </div>
            <div className="flex flex-col  h-full justify-center ">
                <h1>{props.title} </h1>
                <h3>Rs.{valueToDisplay}</h3>
            </div>
        </Card>
    )
}