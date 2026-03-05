import { Earnings } from "@/type/earnings";
import SectionCard from "../comman/ui/section-card";
import IncomeGrowthLineChart from "./charts/income-growth-line-chart";

type Props={
    earnings:Earnings[]
}
export default function IncomeGrowthSection(    ){
    return(
        <SectionCard className="w-full h-full">
           <IncomeGrowthLineChart />
        </SectionCard>
    )
}