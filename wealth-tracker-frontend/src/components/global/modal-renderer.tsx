"use client"

import { useModal } from "@/context/model-context"
// import AddIncomeSection from "@/components/earnings/add-income-section"
import AddExpensesSection from "@/components/expenses/add-expenses-section"
import AddBudgetSection from "../expenses/add-budget-section"
import AddIncomeModal from "../earnings/add-income-modal-screen"
import EditProfileModal from "../Profile/edit-profile-modal"
import { tr } from "date-fns/locale"
import ChangePasswordModal from "../Profile/change-password-modal"

export default function ModalRenderer() {
  const { activeModal, closeModal } = useModal()

  return (
    <>


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



      {activeModal === "addIncome" && (
        <AddIncomeModal
          isOpen={true}
          closeAddIncome={closeModal}
        />
      )}

      {activeModal === "editProfile" && (
        <EditProfileModal
          isOpen={true}
          closeEditProfileModal={closeModal}
        />
      )}


      {activeModal === "changePassword" && (
        <ChangePasswordModal
          isOpen={true}
          closeChangePasswordModal={closeModal}
        />
      )}



    </>
  )
}