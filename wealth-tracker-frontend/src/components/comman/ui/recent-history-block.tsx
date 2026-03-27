import RecentTransactionRowTemplate from "@/components/expenses/recent-transaction-row-template";
import SectionCard from "./section-card";
import ScrollableArea from "./scrollable-area-prop";
import Divider from "./divider";

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
        <SectionCard className="w-full h-full flex flex-col overflow-hidden">

            <div>
                <p
                    className="text-xs font-semibold tracking-[0.18em] uppercase"
                    style={{ color: "rgba(160,160,165,0.7)", fontFamily: "'DM Mono', monospace" }}
                >
                    Transactions
                </p>
                <h2
                    className="text-base font-bold mt-0.5"
                    style={{ color: "rgba(255,255,255,0.9)", fontFamily: "'Sora', sans-serif", letterSpacing: "-0.01em" }}
                >
                    Recent Expenses
                </h2>
            </div>

            <Divider className="w-full " />
            <div
                className="flex items-center px-3 pb-2 text-xs"
                style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'DM Mono', monospace" }}
            >
                <span className="w-[38%]">Category</span>
                <span className="w-[28%]">Date</span>
                <span className="w-[22%]">Amount</span>
                <span className="w-[8%]" />
            </div>

            <ScrollableArea className="flex-1">
                {listOfTransaction}
            </ScrollableArea>

        </SectionCard>
    )
}