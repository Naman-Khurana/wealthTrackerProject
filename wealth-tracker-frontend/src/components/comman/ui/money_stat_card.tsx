import { BACKGROUND_COLOR_EMRALD_GREEN, TEXT_COLOR_EMRALD_GREEN } from "@/constants/ui.constants";

import Card from "./card";

type MoneyStatCardProp = {
    title: string;
    amount: number
    classname?: string;
}

export default function MoneyStatCard({
    title,
    amount,
    classname
}: MoneyStatCardProp
) {
    return (
        <Card key={title} className={`h-[90%] w-[50%] flex flex-col justify-center  ${classname}` } >
            
            <div className="text-white/70 text-[0.9rem] font-semibold  ">{title}</div>
            <div className="text-[1.7rem] flex flex-row gap-1 ">
                <div className={` ${TEXT_COLOR_EMRALD_GREEN}`}>₹</div>
                <div>{amount}</div>

            </div>


        </Card>
    )
}