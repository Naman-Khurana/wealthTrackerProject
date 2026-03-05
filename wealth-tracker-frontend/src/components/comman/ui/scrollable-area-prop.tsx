type ScrollableAreaProps = {
  children: React.ReactNode
  className?: string
}

export default function ScrollableArea({ children, className = "" }: ScrollableAreaProps) {
  return (
    <section
      className={`auto-hide-scrollbar overflow-y-scroll h-full ${className}`}
    >
      {children}
    </section>
  )
}