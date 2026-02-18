type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`
        bg-gray-500/20 rounded-2xl
        shadow-lg shadow-black/40
        px-6 py-5
        ${className}
      `}
    >
      {children}
    </div>
  );
}
