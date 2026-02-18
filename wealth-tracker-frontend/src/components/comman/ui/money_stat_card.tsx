import { BACKGROUND_COLOR_EMRALD_GREEN, TEXT_COLOR_EMRALD_GREEN } from "@/constants/ui.constants";
import { title } from "process";

type MoneyStatCardProp={
    title : string;
    amount: number
}

export default function MoneyStatCard({
    title ,
    amount
}: MoneyStatCardProp
){
    return(
            <div key={title} className="h-[90%] w-[50%] bg-gray-500/20 rounded-2xl   flex flex-col justify-center 
            pl-[5%]   shadow-lg shadow-black/40">
                <div className="text-white/70 text-[0.9rem] font-semibold  ">{title}</div>
                <div className="text-[1.7rem] flex flex-row gap-1 ">
                    <div className={` ${TEXT_COLOR_EMRALD_GREEN}`}>₹</div>
                    <div>{amount}</div>
                     
                </div>

            </div>
        )
}