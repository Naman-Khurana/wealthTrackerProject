
import SectionCard from "../comman/ui/section-card";
import IncomeGrowthLineChart from "./charts/income-growth-line-chart";


export default function IncomeGrowthSection(    ){
    return(
        <SectionCard className="w-full h-full">
           <IncomeGrowthLineChart />
        </SectionCard>
    )
}