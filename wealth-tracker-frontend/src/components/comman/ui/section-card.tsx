type SectionCardProps = {
    className?: string;
    children?: React.ReactNode;
};

export default function SectionCard({
    className = "",
    children,
}: SectionCardProps) {
    return (
        <div
            className={`
        bg-black/25
        rounded-2xl
        border
        border-gray-600
        shadow-2xl
        ${className}
      `}
        >
            <div className="px-[1rem] py-[1rem]">
                {children}
            </div>

        </div>
    );
}