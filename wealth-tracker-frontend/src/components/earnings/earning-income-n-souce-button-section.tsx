"use client"

import { TEXT_COLOR_EMRALD_GREEN } from "@/constants/ui.constants";
import ActionButton from "../comman/ui/action-button";
import Card from "../comman/ui/card";
import MoneyStatCard from "../comman/ui/money_stat_card";

export default function EarningIncomeNSourceAddButtonSection() {
    return (
        <Card className="h-full w-full flex flex-row gap-1">
            <div className="w-[90%]  flex  flex-col flex-1 text-center justify-center items-center  ">
                <div className="text-white/70 text-[0.8rem] font-semibold  ">Highest Income</div>
                <div className="text-[0.9rem]">Freelancing</div>
                <div className={`text-[1.1rem] flex flex-row gap-1 ${TEXT_COLOR_EMRALD_GREEN}`}  >
                    <div className={` `}>₹</div>
                    <div >{100}</div>

                </div>
               
            </div>

            <div className=" flex flex-col flex-1 gap-1 justify-center flex-1  ">
                <ActionButton onClick={() => { }} className="h-[40%] w-full text-[0.8rem]  relative  ">
                    + Add Income
                </ActionButton>
                <ActionButton onClick={() => { }} className="h-[40%] w-full text-[0.8rem] relative">
                    + Add Income Source
                </ActionButton>
            </div>


        </Card>
    )
}