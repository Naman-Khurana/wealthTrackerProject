"use client"

import { API_BASE_URL } from "@/constants/api.constants"
import { Earnings,EarningsIncomeTypeWise } from "@/type/earnings"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { AddIncomePayload } from "@/type/earnings"

const fetchEarningsWithDetails=async()=>{
    const details=await axios.get( `${API_BASE_URL}/earnings/transactions`, 
    {
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
    return useQuery<Earnings[]>({
       queryKey: ["earningsWithDetails"],
       queryFn: ()=> fetchEarningsWithDetails(),
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