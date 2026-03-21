"use client"

import { API_BASE_URL } from "@/constants/api.constants"
import { Earnings,EarningsIncomeTypeWise } from "@/type/earnings"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { AddIncomePayload } from "@/type/earnings"
import { useEarningsFilter } from "@/context/earnings-filter-context"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"

const fetchEarningsWithDetails=async(startDate?: string,
  endDate?: string)=>{
    const details=await axios.get( `${API_BASE_URL}/earnings/transactions`, 
    {
        params: {
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
      },

        withCredentials: true,    
    });
    return details.data;
}

const fetchEarningsIncomeTypeWise=async()=>{
    const details=await axios.get( `${API_BASE_URL}/earnings/income-type-wise`, 
    {
        withCredentials: true,    
    });
    return details.data;
}

export function useEarningsIncomeTypeWise(){
    return useQuery<EarningsIncomeTypeWise>({
       queryKey: ["earningsIncomeTypeWise"],
       queryFn: ()=> fetchEarningsIncomeTypeWise(),
       staleTime :Infinity, 
    });

}




export function useEarningsWithDetails(){
    const { activeTab}=useEarningsFilter()

    const { startDate,endDate}=getDateRange(activeTab)

    return useQuery<Earnings[]>({
       queryKey: ["earningsWithDetails",startDate,endDate],
       queryFn: ()=> fetchEarningsWithDetails(startDate,endDate),
       staleTime :Infinity, 
    });

}



export function useAddIncome(){
    const queryClient=useQueryClient();

    return useMutation({
        mutationFn:async(newIncome : AddIncomePayload)=>{
            return axios.post(`${API_BASE_URL}/earnings/`,newIncome,
                {withCredentials:true}
            );
        },
        onSuccess:() => {
            queryClient.invalidateQueries({
                queryKey: ["earningsWithDetails"],

            });
        }
    });
}

export function useLogout(){
    const queryClient=useQueryClient();
    const router=useRouter();
    const {logout} =useAuth();
    return useMutation({
        mutationFn:async() => {
            return axios.post(
                `${API_BASE_URL}/auth/logout`,
                {},
                {withCredentials: true}
            );
        },

        onSuccess:()=>{
            logout();
            queryClient.clear();
            router.push("/login");
        }

    });
}


function getDateRange(tab: string) {
  const endDate = new Date()
  const startDate = new Date()

  if (tab === "Three Months") {
    startDate.setMonth(startDate.getMonth() - 3)
  } else {
    startDate.setMonth(startDate.getMonth() - 1)
  }

  return {
    startDate: startDate.toISOString().split("T")[0],
    endDate: endDate.toISOString().split("T")[0]
  }
}