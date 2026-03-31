
import LineChartTemplate from "./charts/line-chart-template"
import BarChartTemplate from "./charts/bar-chart-template"
import TotalEarningNExpensesButtonTemplate from "./total-earning-expenses-button"
import DashBoardBudgetSection from "./dashboard-budget-section"
import Card from "../comman/ui/card"
export default function DashBoardComponent() {
    const upperSectionFields = [
        {
            title: "expenses",
            value: "totalExpense",
            image: "/expenses-icon-v2.png"
        },
        {
            title: "earnings",
            value: "totalEarnings",
            image: "/earnigns-v3.png"
        }
    ]


    const upperSection = upperSectionFields.map((block) => (

        <TotalEarningNExpensesButtonTemplate  key={block.title} title={block.title} value={block.value} image={block.image} />
    ))
    return (

        <section className="flex flex-col  justify-between items-center w-full h-[99%] gap-4 text-white ">
            <section className="h-[58%] w-full    shadow-2xl flex item-center justify-center rounded-2xl gap-2" >
                <div className="h-full w-2/6 flex flex-col gap-2">
                    {upperSection}
                </div>
                <div className="h-full w-4/6 flex ">

                    <BarChartTemplate />

                </div>
                {/* Section Upper */}
            </section>
            <section className="h-[42%] w-full bg-black/25 rounded-2xl border border-gray-600 text-center flex justify-between items-center gap-5  overflow-hidden px-[4%] py-[5%]">
               
                <div className="w-[25%] h-[30%]  flex items-center ">
                    {/* BUDGET SECTION  */}
                    <DashBoardBudgetSection />
                </div>
                <Card className="w-[40%]  px-[1%] py-[3%]">
                    <LineChartTemplate />
                </Card>
            </section>
        </section>

    )
}