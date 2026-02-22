import MoneyStatCard from "./money_stat_card";

type MoneyStatItem = {
    title: string;
    amount: number;
}

type MoneyStatGroupProps = {
    items: MoneyStatItem[];
}
export default function CommanMoneyStatCardGroup({items ,}: MoneyStatGroupProps) {
    return (
        <main className="h-full w-full flex justify-center items-center gap-2">
            {items.map((item) => (
                <MoneyStatCard
                    key={item.title}
                    title={item.title}
                    amount={item.amount}
                    classname="px-6 py-5"
                />
            ))}
        </main>
    )

}