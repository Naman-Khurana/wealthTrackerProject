import axiosInstance from "@/lib/axios_instance";
import { ChangePasswordPayload, LoginResponse } from "@/type/commman";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/auth-context";
import { useLogout } from "../earnings/earnings-api-fetcher";


export function useUpdateProfile() {
    const { setAuthData } = useAuth();


    return useMutation({
        mutationFn: async (updatedUserProfile: LoginResponse) => {
            const response = await axiosInstance.put(
                `/user/edit-profile`,
                updatedUserProfile
            );
            return response.data;
        },
        onSuccess: (data: LoginResponse) => {
            setAuthData(data);
        }
    });
}


export function useChangePassword() {
    const logoutMutation = useLogout();

    return useMutation({
        mutationFn: async (passwordDetails: ChangePasswordPayload) => {
            const response = await axiosInstance.post(
                `/auth/change-password`,
                passwordDetails
            );
            return response.data;
        },
        onSuccess: () => {
            logoutMutation.mutate();
        }
    });
}

