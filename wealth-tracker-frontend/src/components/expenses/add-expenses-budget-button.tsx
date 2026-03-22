'use client'

import { BACKGROUND_COLOR_EMRALD_GREEN } from "@/constants/ui.constants";
import ActionButton from "../comman/ui/action-button";
import { useModal } from "@/context/model-context";

type Props = {
    openAddExpenses: () => void;
    openAddBudget: () => void
}

export default function AddExpensesNBudgetButton({ openAddExpenses, openAddBudget }: Props) {


    const { openModal } = useModal()
    const buttonsData = [
        {
            category: "Add Expenses"
        },
        {
            category: "Add Budget"
        }
    ]

    const addButtons = buttonsData.map((element) => {
        return (
            <ActionButton
                key={element.category}
                onClick={element.category === "Add Expenses"
                    ? () => openModal("addExpense")
                    : () => openModal("addBudget")
                }
                className="w-full flex-1 justify-center"
            >
                {element.category}
            </ActionButton>
        )
    })

    return (
        <section className="flex w-full h-[90%] flex-col gap-2 justify-between items-stretch">
            {addButtons}
        </section>
    )
}