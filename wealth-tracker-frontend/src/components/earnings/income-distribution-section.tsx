import { BACKGROUND_COLOR_EMRALD_GREEN, TEXT_COLOR_EMRALD_GREEN } from "@/constants/ui.constants";
import SectionCard from "../comman/ui/section-card";
import StatRowWithProgressBar from "../comman/ui/stat-row-with-progress-bar";
import Divider from "../comman/ui/divider";
import ScrollableArea from "../comman/ui/scrollable-area-prop";
import { Earnings } from "@/type/earnings";
type IncomeDistribution = {
    category: string
    amount: number
    percentage: number
}

type Props = {
    earnings: Earnings[]
}
export default function IncomeDistributionSection({ earnings }: Props) {


    const categoryTotals: Record<string, number> = {};

    earnings.forEach((e) => {
        categoryTotals[e.category] =
            (categoryTotals[e.category] || 0) + e.amount;
    });

    const total = earnings.reduce((sum, e) => sum + e.amount, 0);

    const data: IncomeDistribution[] = Object.entries(categoryTotals).map(
        ([category, amount]) => ({
            category,
            amount,
            percentage: total === 0 ? 0 : (amount / total) * 100
        })
    );


    return (

        <SectionCard className="w-full h-full flex flex-col">
            <div className="h-[30%] ">
                {/* Top section */}
                <section className="w-full flex items-center jusitfy-center py-2">
                    <h3 className="text-lg font-semibold text-white">Income Distribution</h3>
                </section>
                <Divider className="w-full " />
            </div>
            <div className="h-[70%] w-full">
                <ScrollableArea className="flex flex-col gap-3 h-full overflow:hidden">
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
                </ScrollableArea>
            </div>
        </SectionCard>

    )
}