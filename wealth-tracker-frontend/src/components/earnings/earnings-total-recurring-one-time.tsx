import { title } from "process"
import MoneyStatCard from "../comman/ui/money_stat_card"
import CommanMoneyStatCardGroup from "../comman/ui/comman-money-stat-card-group"
import Card from "../comman/ui/card"
import EarningIncomeNSourceAddButtonSection from "./earning-income-n-souce-button-section"
import { EarningsIncomeTypeWise } from "@/type/earnings"

type Props = {
  data: EarningsIncomeTypeWise
}

export default function EaringsTotalNRecurringNOneTime({data} :Props) {
    const typesOfEarnings = [
        { title: "Total Income", amount : data.totalEarnings },
        { title: "Recurring Income", amount: data.recurringEarnings },
        { title: "One-Time Income", amount: data.oneTimeEarnings }
    ]

    return (
        <main className="flex flex-row h-full w-full justify-center items-center gap-2">
            <section className="w-[67%] h-full">
                <CommanMoneyStatCardGroup items={typesOfEarnings} />
            </section>

            <div className="w-[33%] h-[90%] ">
                <EarningIncomeNSourceAddButtonSection />
            </div>
        </main>
    )
}