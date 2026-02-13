"use client"
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
            <main className="w-[97.5%] h-[100%]   bg-black/50 backdrop-blur-xl rounded-4xl   flex 
            p-5 border border-[1px] border-gray-600 shadow-2xl flex-col gap-3">
            <div className="h-[6%]">RECENT TRANSACTIONS</div>
            
            <section className="auto-hide-scrollbar overflow-y-scroll h-[94%] flex justify-center items-center" >
                 Loading...
            </section>
        </main>
        )
    }

    return(
        <main className="w-[97.5%] h-[100%]   bg-black/50 backdrop-blur-xl rounded-4xl   flex 
            p-5 border border-[1px] border-gray-600 shadow-2xl flex-col gap-3">
            <div className="h-[6%]">RECENT TRANSACTIONS</div>
            
            <section className="auto-hide-scrollbar overflow-y-scroll h-[94%]" >
                {expense}     
            </section>
        </main>
    )
}