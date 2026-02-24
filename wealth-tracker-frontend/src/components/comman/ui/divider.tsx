type DividerProps = {
  className?: string
}

export default function Divider({ className = "" }: DividerProps) {
  return (
    <div
      className={`border-t border-white/10 my-3 ${className}`}
    />
  )
}