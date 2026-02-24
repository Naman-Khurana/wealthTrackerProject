"use client"

import { createContext, useContext, useState, ReactNode } from "react"

type ModalType =
  | "addIncome"
  | "addExpense"
  | "addBudget"
//   | "upgradePlan"
  | null

type ModalContextType = {
  activeModal: ModalType
  openModal: (modal: ModalType) => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalType>(null)

  const openModal = (modal: ModalType) => {
    setActiveModal(modal)
  }

  const closeModal = () => {
    setActiveModal(null)
  }

  return (
    <ModalContext.Provider
      value={{ activeModal, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)

  if (!context) {
    throw new Error("useModal must be used inside ModalProvider")
  }

  return context
}