import { title } from "process"
import MoneyStatCard from "../comman/ui/money_stat_card"
import CommanMoneyStatCardGroup from "../comman/ui/comman-money-stat-card-group"

export default function EaringsTotalNRecurringNOneTime(){
    const typesOfEarnings = [
        { title: "Total Income" ,amount : 0},
        { title: "Recurring Income" ,amount : 0 },
        { title: "One-Time Income" ,amount : 0}
    ]

    return(
        <main className="flex flex-row h-full w-full justify-center items-center gap">
            <CommanMoneyStatCardGroup items={typesOfEarnings} />
        </main>
    )
}