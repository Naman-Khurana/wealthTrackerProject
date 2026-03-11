"use client"

import { useState,createContext, useContext,ReactNode} from "react"
import { EarningsFilterEnum } from "@/type/enums"


type EarningFilterContext={
    activeTab: EarningsFilterEnum
    setActiveTab: (tab : EarningsFilterEnum) => void 

}

const EarningsFilterContext= createContext<EarningFilterContext | null>(null)

export function EarningFilterProvider({children} : {children: ReactNode}){
    const [activeTab,setActiveTab]=useState(EarningsFilterEnum.ONE_MONTH)

    return(
        <EarningsFilterContext.Provider value={{activeTab,setActiveTab}}>
            {children}
        </EarningsFilterContext.Provider>
    )
}

export function useEarningsFilter(){
    const context =useContext(EarningsFilterContext)
    
    if(!context){
        throw new Error("useEarningsFilter must be used inside EarningsFilterProvider")
    }

    return context
}