import { BACKGROUND_COLOR_EMRALD_GREEN, TEXT_COLOR_EMRALD_GREEN } from "@/constants/ui.constants";
import SectionCard from "../comman/ui/section-card";
import StatRowWithProgressBar from "../comman/ui/stat-row-with-progress-bar";
import Divider from "../comman/ui/divider";
type IncomeDistribution = {
    category: string
    amount: number
    percentage: number
}
export default function IncomeDistributionSection() {

    const data: IncomeDistribution[] = []

    return (
        <SectionCard className="w-full h-full flex flex-col ">
            {/* top section */}
            <section className="w-full h-[40%]"> Income Distribution</section>
            <Divider className="w-full "/>
            <div className="">
                {
                    data.map((row) => {
                        return (
                            <StatRowWithProgressBar 
                            key={row.category}
                            label={row.category} 
                            value={row.amount} 
                            percentage={row.percentage} 
                            progress={row.percentage} 
                            />
                        )
                    })
                }
            </div>


        </SectionCard>
    )
}