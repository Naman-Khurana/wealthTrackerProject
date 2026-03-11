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
        <SectionCard className="w-full h-full flex flex-col ">
            {/* top section */}
            <section className="w-full h-[40%]"> Income Distribution</section>
            <Divider className="w-full " />
            <ScrollableArea>
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
        </SectionCard>
    )
}