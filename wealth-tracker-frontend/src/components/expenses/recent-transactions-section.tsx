"use client"
import Divider from "../comman/ui/divider";
import SectionCard from "../comman/ui/section-card";
import { useNExpenses } from "./expenses-api-fetcher"
import RecentTransactionRowTemplate from "./recent-transaction-row-template"

type NExpensesDataType={
    category : string;
    amount : number;
    date : string;
}



export default function RecentExpensesSection(){

    const{
            data:nExpensesData,
            isLoading:loadingNExpenses,
            isError:errortotalExpensesNExpenses,
            error: nExpensesError,
        }=useNExpenses(10)

        // console.log(nExpensesData);

    const expense= nExpensesData?.map((expense) =>{
        return(
            <RecentTransactionRowTemplate category={expense.category} amount={expense.amount} date={expense.date} />
        );
    })

    //loading structure

    if(loadingNExpenses){
        return(
           
          <SectionCard className="w-full h-full">
        
            <div className="h-[6%]">RECENT TRANSACTIONS</div>
        
           

        </SectionCard>
        )
    }

    return(
        <SectionCard className="w-full h-full">
        
            <div className="h-[6%]">RECENT TRANSACTIONS</div>
            {loadingNExpenses &&  <section className="auto-hide-scrollbar overflow-y-scroll h-[94%]" >
                Loading...    
            </section>}
            {!loadingNExpenses && <section className="auto-hide-scrollbar overflow-y-scroll h-[94%]" >
               {expense}
            </section>}
           

        </SectionCard>
    )
}