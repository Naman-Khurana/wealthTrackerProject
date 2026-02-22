import Card from "../comman/ui/card";
import AddExpensesNBudgetButton from "../expenses/add-expenses-budget-button";
import EarningIncomeNSourceAddButtonSection from "./earning-income-n-souce-button-section";
import EaringsTotalNRecurringNOneTime from "./earnings-total-recurring-one-time";
import IncomeDistributionSection from "./income-distribution-section";
import IncomeGrowthSection from "./income-growth-section";

export default function EarningsComponent() {
    return (
        <main className=" w-full h-[99%] rounded-4xl text-white flex flex-col">

            <section className="w-full h-[22%]  flex">

                <EaringsTotalNRecurringNOneTime />

            </section>

            <section className="flex flex-row justify-between items-center h-[30%] w-full gap-4 py-2">
                <div className="flex-4/7 w-full h-full"><IncomeDistributionSection/></div>
                <div className="flex-3/7 w-full h-full"><IncomeGrowthSection /></div>
            </section>



            <section className="w-full h-[30%] bg-purple-800">RECENT TRANSACTIONS</section>
            <section className="w-full h-[20%] flex">
                <div className="h-full w-full bg-green-800">INSIGHTS<br />

                </div>

            </section>




        </main>
    )
}