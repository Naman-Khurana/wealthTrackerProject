"use client"

import { useState } from "react"
import { Home, PhoneCall, Settings, User } from "lucide-react"
import { AnimatedBackground } from "../../../components/motion-primitives/animated-background"
import Card from "../comman/ui/card"
import ActionButton from "../comman/ui/action-button"
import { useModal } from "@/context/model-context"
import { useEarningsWithDetails } from "./earnings-api-fetcher"
import { Tab } from "@headlessui/react"
import { useEarningsFilter } from "@/context/earnings-filter-context"
import { EarningsFilterEnum } from "@/type/enums"
export default function EarningIncomeNSourceAddButtonSection() {
  const {activeTab,setActiveTab}=useEarningsFilter()

  const { openModal } = useModal()
  

  const TABS = [
    { label: EarningsFilterEnum.ONE_MONTH, icon: <Home className="h-5 w-5" /> },
    { label: EarningsFilterEnum.THREE_MONTH, icon: <User className="h-5 w-5" /> },
    
  ]

  // const [activeTab, setActiveTab] = useState(TABS[0].label)

  
  const {
  data: dataWithDetails,
  isLoading: isLoadingWithDetail,
  isError: isErrorWithDetail,
  error: errorWithDetail
} = useEarningsWithDetails()

  return (
    <Card className="h-full w-full flex flex-row gap-1 pr-2">

      <div className="flex flex-1 items-center justify-center items-center w-full">

        <div className="flex flex-col  rounded-xl border border-zinc-950/10 bg-black/20 w-[80%] p-2 justify-center">

          <AnimatedBackground
        
            defaultValue={TABS[0].label}
            onValueChange={(value) => setActiveTab(value as EarningsFilterEnum)}
            className="rounded-lg bg-zinc-100"
            transition={{
              type: "spring",
              bounce: 0.2,
              duration: 0.3,
            }}
          >

            {TABS.map((tab) => (
              <button
                key={tab.label}
                data-id={tab.label}
                type="button"
    
                className="inline-flex h-9 w-full items-center justify-center text-zinc-500 transition-colors duration-100 data-[checked=true]:text-zinc-950"
              >
                {tab.label}
              </button>
            ))}

          </AnimatedBackground>

        </div>
      </div>

      <div className="flex flex-col flex-1 gap-1 justify-center">

        <ActionButton
          onClick={() => openModal("addIncome")}
          className="h-[40%] w-full text-[0.8rem]"
        >
          + Add Income
        </ActionButton>

      </div>

    </Card>
  )
}

