"use client"
 import { useState } from "react"
import AddExpensesSection from "./add-expenses-section";
export default function ExpensesModalWrapper(){
    const [open,setOpen]=useState(true);
    return(
        <>
            { open &&(<main className=" w-full h-hullabsolute z-[999]">
                
                <AddExpensesSection/>

            </main>)
}

        </>
    )
}