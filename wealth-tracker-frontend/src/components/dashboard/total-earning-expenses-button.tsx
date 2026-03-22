"use client"
import { useTotalExpensesNEarnings } from "./dashboard-api-fetcher"
import Card from "../comman/ui/card"

type inputs = {
    title: string;
    value: string;
    image: string;
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

        <Card key={props.title} className="flex  flex-row justify-around item-center  h-1/2 items-center   transition-all duration-200 hover:bg-gray-500/30 ">
            <div className="h-full flex justify-center items-center">
                <div className="bg-gray-600/40 p-6 rounded-3xl shadow-inner">
                    <img
                        src={props.image}
                        className="filter invert opacity-90"
                        height={10}
                        width={100}
                        alt=""
                    />
                </div>
            </div>
            <div className="flex flex-col items-end gap-1">
                <h2 className="text-gray-400 text-lg capitalize">
                    {props.title}
                </h2>
                <h1 className="text-2xl font-bold text-white">
                    Rs.{valueToDisplay}
                </h1>
            </div>

        </Card>
    )
}