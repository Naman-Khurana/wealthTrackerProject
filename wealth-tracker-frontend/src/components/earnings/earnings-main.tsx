"use client"
import RecentTransactionBlock from "../comman/ui/recent-history-block";
import EarningsInsightsSection from "./earnings-insights-section";
import EaringsTotalNRecurringNOneTime from "./earnings-total-recurring-one-time";
import IncomeDistributionSection from "./income-distribution-section";
import IncomeGrowthSection from "./income-growth-section";
import { useEarningsIncomeTypeWise, useEarningsWithDetails } from "./earnings-api-fetcher";
import { rowTemplateContent } from "@/type/commman";
import { useLastSixMonthlyEarnings } from "../dashboard/dashboard-api-fetcher";

export default function EarningsComponent() {
    const {
        data: dataWithDetails,
        isLoading: isLoadingWithDetail,
        isError: isErrorWithDetail,

    } = useEarningsWithDetails();
    const {
        data: dataTypeWise,
        isLoading: isLoadingTypeWise,
        isError: isErrorTypeWise,
    } = useEarningsIncomeTypeWise();

    const {
        data: lastSixMonthsEarningsData,
        isLoading: isLoadingLastSixMonthsEarnings,
        isError: isErrorLastSixMonthsEarnings,
        
    } = useLastSixMonthlyEarnings()
    

    // if (isLoadingWithDetail || isLoadingTypeWise) return <div>Loading...</div>;
    // if (isError) return <div>Something went wrong</div>;

    const formattedData: rowTemplateContent[] = dataWithDetails?.map((e) => ({
        category: e.category,
        amount: e.amount,
        date: e.date,
    })) ?? [];
    console.log(lastSixMonthsEarningsData)
    return (
        <main className=" w-full h-[99%] rounded-4xl text-white flex flex-col gap-3">

            <section className="w-full h-[22%]  flex">

                {isLoadingTypeWise && (<div>Loading...</div>)}
                {isErrorTypeWise && (<div>Error</div>)}

                {dataTypeWise && (<EaringsTotalNRecurringNOneTime data={dataTypeWise!} />)}

            </section>

            <section className="flex flex-row justify-between items-center h-[30%] w-full gap-4 ">
                <div className="flex-4/7 w-full h-full"> {isLoadingWithDetail && (<div>Loading...</div>)}
                    {isErrorWithDetail && (<div>Error</div>)}

                    {dataWithDetails && (<IncomeDistributionSection earnings={dataWithDetails} />)}



                </div>
                <div className="flex-3/7 w-full h-full">
                    {isErrorWithDetail && (<div>Error</div>)}

                    {dataWithDetails && (<IncomeGrowthSection />)}


                </div>
            </section>



            <section className="w-full h-[30%] ">
                {isLoadingWithDetail && (<div>Loading...</div>)}
                {isErrorWithDetail && (<div>Error</div>)}

                {dataWithDetails && (<RecentTransactionBlock title="Recent Earnings" transactionData={formattedData} />)}
            </section>
            <section className="w-full h-[20%] flex">
                 {(isLoadingWithDetail || isLoadingLastSixMonthsEarnings) && (<div>Loading...</div>)}
                {(isErrorWithDetail || isErrorLastSixMonthsEarnings) && (<div>Error</div>)}
              {(dataWithDetails && lastSixMonthsEarningsData) && (<EarningsInsightsSection dataWithDetails={dataWithDetails} lastSixMonthsEarningsData={lastSixMonthsEarningsData}/>)}

              
            </section>




        </main>
    )
}