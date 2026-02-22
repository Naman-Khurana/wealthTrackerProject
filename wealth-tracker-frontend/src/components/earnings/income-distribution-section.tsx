import { BACKGROUND_COLOR_EMRALD_GREEN, TEXT_COLOR_EMRALD_GREEN } from "@/constants/ui.constants";
import SectionCard from "../comman/ui/section-card";
import StatRowWithProgressBar from "../comman/ui/stat-row-with-progress-bar";

export default function IncomeDistributionSection() {
    return (
        <SectionCard className="w-full h-full">
            {/* top section */}
            <section> Income Distribution</section>
            <StatRowWithProgressBar label="Test" value="100" percentage="100" progress={20}/>
            {/* <section className="flex flex-row items-center gap-2 ">
                <div className="flex justify-between text-white text-sm mb-1 flex-2 ">
                    test
                </div>
                <div className={`flex-8 h-3  w-[30%] bg-gray-300 rounded-xs overflow-hidden ${BACKGROUND_COLOR_EMRALD_GREEN}`}>
                    <div
                        className={`h-full w-[40%] ${BACKGROUND_COLOR_EMRALD_GREEN} `}
                        style={{ width: `${100}%` }}
                    />
                </div>
                <section className="flex flex-row flex-2 text-[0.8rem]">
                    <div className={`${TEXT_COLOR_EMRALD_GREEN}`}>$</div>
                    <div>2000</div>
                </section>
                <div className={`flex-1 ${TEXT_COLOR_EMRALD_GREEN} `  }>35%</div>
            </section> */}
        </SectionCard>
    )
}