import EarningsComponent from "@/components/earnings/earnings-main";
import { EarningFilterProvider } from "@/context/earnings-filter-context";

export default function Expenses() {
    return (
        <EarningFilterProvider>
            <main className="w-full h-full">
                <EarningsComponent />
            </main>
        </EarningFilterProvider>
    )
}