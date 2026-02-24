"use client"

import { ReactNode } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  width?: string
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  width = "max-w-lg",
}: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div
        className={`relative w-full ${width} bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl p-6`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          {title && (
            <h2 className="text-xl font-semibold text-white">
              {title}
            </h2>
          )}
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-white/60 hover:text-white"
          >
            <X />
          </Button>
        </div>

        {/* Body */}
        <div className="text-white">
          {children}
        </div>
      </div>
    </div>
  )
}