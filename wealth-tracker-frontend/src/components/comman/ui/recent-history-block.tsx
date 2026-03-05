import RecentTransactionRowTemplate from "@/components/expenses/recent-transaction-row-template";
import SectionCard from "./section-card";
import ScrollableArea from "./scrollable-area-prop";

type rowTemplateContent = {
    category: string;
    amount: number;
    date: string;
}

type props = {
    title: string;
    transactionData: rowTemplateContent[]

}

export default function RecentTransactionBlock({ title, transactionData }: props) {

    const listOfTransaction = transactionData.map((transaction) => {
        return (
            <RecentTransactionRowTemplate category={transaction.category} amount={transaction.amount} date={transaction.date} />
        );
    })
    console.log(transactionData)
    return (
        <SectionCard className="w-full h-full">

            <div className="h-[6%]">{title}</div>

            <ScrollableArea>
                {listOfTransaction}
            </ScrollableArea>

        </SectionCard>
    )
}