
import LineChartTemplate from "./charts/line-chart-template"
import BarChartTemplate from "./charts/bar-chart-template"
import CustomDoughnutChart from "./charts/customized-doughnut-chart"

import TotalEarningNExpensesButtonTemplate from "./total-earning-expenses-button"
import DashBoardFetch from "./dashboard-fetch-details"
import DashBoardBudgetSection from "./dashboard-budget-section"
export default function DashBoardComponent(){
    const upperSectionFields=[
        {
            title:"expenses",
            value : "totalExpense",
        },
        {
            title:"earnings",
            value : "totalEarnings"
        }
    ]
    
    
    const upperSection=upperSectionFields.map((block) => (
        
        <TotalEarningNExpensesButtonTemplate title={block.title} value={block.value} />
    ))
    return(

            <section className="flex flex-col  justify-between items-center w-full h-[99%] gap-4 text-white ">
                <section className="h-[65%] w-full bg-gray-800 flex items-center justify-center rounded-4xl" >
                    <div className="p-2 h-full w-1/4 flex flex-col gap-2">
                        {upperSection}
                    </div>
                    <div className="h-full w-3/4 flex ">
                        
                        <BarChartTemplate/>
                    </div>                   
                    {/* Section Upper */}
                </section>
                <section className="h-[35%] w-full bg-gray-800 rounded-4xl text-center flex justify-between items-center gap-5 pl-3 pt-1 overflow-hidden">
                    {/* Section Lower */}
                        <button  className="w-[25%] h-[90%] bg-red-400 rounded-4xl text-[50px]">
                            +
                            <DashBoardFetch />
                            {/* idea : add a visa card template
                                feature coming soon (redirect) */}
                        </button>
                        <div className="w-[15%]  flex items-center ">
                            {/* BUDGET SECTION  */}
                            <DashBoardBudgetSection/>
                        </div>
                        <div className="w-[35%]">
                            <LineChartTemplate/>
                        </div>
                </section>
            </section>

    )
}