import { API_BASE_URL } from "@/constants/api.constants";
import axios, { type AxiosResponse } from "axios";
import { AUTH_STORAGE_KEY } from "@/constants/app.constants";

type StoredAuth = {
    jwt?: string;
    refreshToken?: string;
};

const getStoredAuth = (): StoredAuth | null => {
    if (typeof window === "undefined") return null;

    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;

    try {
        return JSON.parse(raw) as StoredAuth;
    } catch {
        return null;
    }
};

const persistTokens = (tokens: StoredAuth) => {
    if (typeof window === "undefined") return;

    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return;

    try {
        const parsed = JSON.parse(raw) as StoredAuth;
        parsed.jwt = tokens.jwt;
        parsed.refreshToken = tokens.refreshToken;
        window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(parsed));
    } catch {
        // Ignore malformed localStorage payload and let normal auth flow recover.
    }
};

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

let refreshPromise: Promise<AxiosResponse<unknown>> | null = null;

axiosInstance.interceptors.request.use((config) => {
    const auth = getStoredAuth();
    if (auth?.jwt) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${auth.jwt}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes("/auth/refresh-token")) {
            originalRequest._retry = true;

            try {
                // If a refresh is already in progress, wait for it instead of making another call
                if (!refreshPromise) {
                    const auth = getStoredAuth();
                    refreshPromise = axios.post(
                        `${API_BASE_URL}/auth/refresh-token`,
                        {},
                        {
                            withCredentials: true,
                            headers: auth?.refreshToken ? { Authorization: `Bearer ${auth.refreshToken}` } : undefined,
                        }
                    ).finally(() => {
                        refreshPromise = null;
                    });
                }

                const refreshed = await refreshPromise;
                const tokenPayload = refreshed.data as StoredAuth;
                if (tokenPayload?.jwt && tokenPayload?.refreshToken) {
                    persistTokens(tokenPayload);
                }
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
