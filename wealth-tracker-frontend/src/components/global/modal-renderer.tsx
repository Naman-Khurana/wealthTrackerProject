"use client"

import { useModal } from "@/context/model-context"
// import AddIncomeSection from "@/components/earnings/add-income-section"
import AddExpensesSection from "@/components/expenses/add-expenses-section"
import AddBudgetSection from "../expenses/add-budget-section"

export default function ModalRenderer() {
  const { activeModal, closeModal } = useModal()

  return (
    <>
      {/* {activeModal === "addIncome" && (
        <AddIncomeSection
          isOpen={true}
          closeAddIncome={closeModal}
        />
      )} */}

      {activeModal === "addExpense" && (
        <AddExpensesSection
          isOpen={true}
          closeAddExpenses={closeModal}
        />
      )}

      {activeModal === "addBudget" && (
        <AddBudgetSection
          isOpen={true}
          closeAddBudget={closeModal}
        />
      )}
    </>
  )
}