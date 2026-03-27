"use client"

import { useModal } from "@/context/model-context"
// import AddIncomeSection from "@/components/earnings/add-income-section"
import AddExpensesSection from "@/components/expenses/add-expenses-section"
import AddBudgetSection from "../expenses/add-budget-section"
import AddIncomeModal from "../earnings/add-income-modal-screen"
import EditProfileModal from "../Profile/edit-profile-modal"
import ChangePasswordModal from "../Profile/change-password-modal"
import PasswordChangedModal from "../Profile/password-changed-modal"
import UpgradePlanModal from "../Profile/upgrade-plan-modal"

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
      {activeModal === "passwordChangedSuccess" && (
        <PasswordChangedModal
          isOpen={true}
          closePasswordChangedModal={closeModal}
          title="Password Changed"
          message="Please log in again to continue using your account."
          variant="success"
        />
      )}


      {activeModal === "passwordChangedError" && (
        <PasswordChangedModal
          isOpen={true}
          closePasswordChangedModal={closeModal}
          title="Password Not Changed"
          message="Current password is incorrect or the request failed. Please try again."
          variant="error"
        />
      )}

      {activeModal === "upgradePlan" && (
        <UpgradePlanModal
          isOpen={true}
          onClose={closeModal}
        />
      )}

    </>
  )
}