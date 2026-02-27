"use client"

import { API_BASE_URL } from "@/constants/api.constants"
import { Earnings } from "@/type/earnings"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchEarningsWithDetails=async()=>{
    const details=await axios.get( `${API_BASE_URL}/earnings/transactions`, 
    {
        withCredentials: true,    
    });
    return details.data;
}

export function useEarningsWithDetails(){
    return useQuery<Earnings[]>({
       queryKey: ["earningsWithDetails"],
       queryFn: ()=> fetchEarningsWithDetails(),
       staleTime :Infinity, 
    });

}