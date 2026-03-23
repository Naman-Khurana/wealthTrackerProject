import { API_BASE_URL } from "@/constants/api.constants";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

let refreshPromise: Promise<any> | null = null;

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes("/auth/refresh-token")) {
            originalRequest._retry = true;

            try {
                // If a refresh is already in progress, wait for it instead of making another call
                if (!refreshPromise) {
                    refreshPromise = axios.post(
                        `${API_BASE_URL}/auth/refresh-token`,
                        {},
                        { withCredentials: true }
                    ).finally(() => {
                        refreshPromise = null;
                    });
                }

                await refreshPromise;
                return axiosInstance(originalRequest);
            }
            catch (err) {
                refreshPromise = null;
                window.location.href = "/login";
                return Promise.reject(err);
            }
        }
        return Promise.reject(error)
    }
);

export default axiosInstance;
