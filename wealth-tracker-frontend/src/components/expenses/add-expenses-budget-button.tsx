'use client'

import { BACKGROUND_COLOR_EMRALD_GREEN } from "@/constants/ui.constants";
import ActionButton from "../comman/ui/action-button";
import { useModal } from "@/context/model-context";

type Props={
    openAddExpenses: ()=> void;
    openAddBudget: ()=> void
}

export default function AddExpensesNBudgetButton( {openAddExpenses,openAddBudget }:Props ){


const { openModal } = useModal()
    const buttonsData=[
        {
            category : "Add Expenses"
        },
        {
            category : "Add Budget"
        }
    ]

    const addButtons=buttonsData.map((element)=>{

        return(
        <ActionButton onClick={element.category==="Add Expenses" ? ()=>openModal("addExpense") : ()=>openModal("addBudget")} className="relative w-[90%] h-[40%] justify-center items-center flex " >
                <div className="absolute top-1 text-white text-[0.8rem] "  >{element.category}</div>
                <div className=" text-[1.8rem] h-[70%]">+</div>
        </ActionButton>
    
        )
    })
    return(

        <section className="flex flex-col w-full h-full justify-center items-center gap-2 ">
            {addButtons}
        </section>
    )
}