import RecentTransactionRowTemplate from "@/components/expenses/recent-transaction-row-template";
import SectionCard from "./section-card";

type rowTemplateContent={
    category : string;
    amount : number;
    date : string;
}

type props={
    title: string;
    transactionData: rowTemplateContent[]

}

export default function RecentTransactionBlock({title,transactionData}: props){

    const listOfTransaction= transactionData.map((transaction) =>{
        return(
            <RecentTransactionRowTemplate category={transaction.category} amount={transaction.amount} date={transaction.date} />
        );
    })
    return(
        <SectionCard className="w-full h-full">
                
            <div className="h-[6%]">{title}</div>
        
            <section className="auto-hide-scrollbar overflow-y-scroll h-[94%]" >
                    
            </section>
        
        </SectionCard>
    )
}