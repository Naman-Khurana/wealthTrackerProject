"use client"


import { Earnings, EarningsIncomeTypeWise } from "@/type/earnings"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { AddIncomePayload } from "@/type/earnings"
import { useEarningsFilter } from "@/context/earnings-filter-context"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import axiosInstance from "@/lib/axios_instance"


const fetchEarningsWithDetails = async (startDate?: string,
    endDate?: string) => {
    const details = await axiosInstance.get(`/earnings/transactions`,
        {
            params: {
                ...(startDate && { startDate }),
                ...(endDate && { endDate }),
            },

        });
    return details.data;
}

const fetchEarningsIncomeTypeWise = async () => {
    const details = await axiosInstance.get(`/earnings/income-type-wise`,
    );
    return details.data;
}

export function useEarningsIncomeTypeWise() {
    return useQuery<EarningsIncomeTypeWise>({
        queryKey: ["earningsIncomeTypeWise"],
        queryFn: () => fetchEarningsIncomeTypeWise(),
        staleTime: Infinity,
    });

}




export function useEarningsWithDetails() {
    const { activeTab } = useEarningsFilter()

    const { startDate, endDate } = getDateRange(activeTab)

    return useQuery<Earnings[]>({
        queryKey: ["earningsWithDetails", startDate, endDate],
        queryFn: () => fetchEarningsWithDetails(startDate, endDate),
        staleTime: Infinity,
    });

}



export function useAddIncome() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newIncome: AddIncomePayload) => {
            return axiosInstance.post(`/earnings/`, newIncome);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["earningsWithDetails"],

            });
        }
    });
}

export function useLogout() {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { logout } = useAuth();
    return useMutation({
        mutationFn: async () => {
            return axiosInstance.post(
                `/auth/logout`,
            );
        },

        onSuccess: () => {
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