"use client"

import { ReactNode, useEffect } from "react"
import { X } from "lucide-react"

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  title?: string
  subtitle?: string       // optional — shows a small label above the title
  children: ReactNode
  width?: string
}

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  width = "max-w-lg",
}: ModalProps) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      {/* Google Fonts — loaded once here so every modal gets it */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=DM+Mono:wght@500&display=swap"
        rel="stylesheet"
      />

      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        style={{
          background: "rgba(0,0,0,0.72)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          animation: "fadeIn 0.18s ease",
        }}
        onClick={onClose}   // click outside → close
      >
        {/* Panel */}
        <div
          className={`relative w-full ${width} rounded-3xl overflow-hidden`}
          style={{
            background: "linear-gradient(160deg, #1c1c1e 0%, #161618 50%, #111113 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.04), " +
              "0 32px 72px -16px rgba(0,0,0,0.9), " +
              "0 0 80px -20px rgba(255,255,255,0.04)",
            animation: "slideUp 0.22s cubic-bezier(0.34,1.56,0.64,1)",
          }}
          onClick={(e) => e.stopPropagation()}  // don't bubble to backdrop
        >

          {/* ── Top accent line ── */}
          <div
            className="absolute top-0 left-0 right-0 h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(16,185,129,0.7) 30%, rgba(52,211,153,0.8) 70%, transparent 100%)",
            }}
          />

          {/* ── Radial glow behind header ── */}
          <div
            className="absolute -top-28 left-1/2 -translate-x-1/2 w-72 h-56 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse, rgba(16,185,129,0.12) 0%, transparent 70%)",
            }}
          />

          {/* ── Header ── */}
          <div className="relative flex justify-between items-start px-8 pt-8 pb-5">
            <div>
              {subtitle && (
                <p
                  className="text-xs font-semibold tracking-[0.18em] uppercase mb-1"
                  style={{
                    color: "rgba(52,211,153,0.85)",
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  {subtitle}
                </p>
              )}
              {title && (
                <h2
                  className="text-[1.35rem] font-bold text-white leading-tight"
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {title}
                </h2>
              )}
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 shrink-0 mt-0.5"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.45)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.background = "rgba(239,68,68,0.14)"
                el.style.borderColor = "rgba(239,68,68,0.35)"
                el.style.color = "rgba(239,68,68,0.9)"
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.background = "rgba(255,255,255,0.06)"
                el.style.borderColor = "rgba(255,255,255,0.1)"
                el.style.color = "rgba(255,255,255,0.45)"
              }}
            >
              <X size={15} strokeWidth={2.5} />
            </button>
          </div>

          {/* ── Divider ── */}
          <div
            className="mx-8 mb-6"
            style={{ height: "1px", background: "rgba(255,255,255,0.06)" }}
          />

          {/* ── Body ── */}
          <div
            className="px-8 pb-8 text-white"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            {children}
          </div>
        </div>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(18px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
      `}</style>
    </>
  )
}