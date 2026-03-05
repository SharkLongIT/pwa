import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig
} from 'axios';
import { TIME_OUT } from '~/utils/common';
import { StorageEnum } from '~/utils/enum';
import { clearData, getData } from '~/utils/helper/storage';

// =======================
// CONFIG
// =======================
const BASE_URL = 'http://192.168.0.30:55080';

// =======================
// TOKEN HELPERS (mock)
// =======================
// AsyncStorage / SecureStore
const getAccessToken = async (): Promise<string | null> => {
    const resToken = await getData(StorageEnum.ACCESS_TOKEN);
    return resToken;
};

const refreshAccessToken = async (): Promise<string | null> => {
    // call refresh token API
    return null;
};

const logout = async () => {
    // clear storage + navigate login
    // await clearData()
};

// =======================
// AXIOS INSTANCE
// =======================
const apiClient: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

// =======================
// REQUEST INTERCEPTOR
// =======================
apiClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const token = await getAccessToken();

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        if (__DEV__) {
            console.log(
                `[API REQUEST] ${config.method?.toUpperCase()} ${config.url}`,
                config.data ?? ''
            );
        }

        return config;
    },
    error => Promise.reject(error)
);

// =======================
// RESPONSE INTERCEPTOR
// =======================
apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    async (error: AxiosError<any>) => {
        const originalRequest: any = error.config;

        if (__DEV__) {
            console.log('[API ERROR]', error.response?.status, error.message);
        }

        // ❌ Không có response => network error
        if (!error.response) {
            return Promise.reject({
                message: 'Network error',
            });
        }

        // 🔐 TOKEN EXPIRED
        if (
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                const newToken = await refreshAccessToken();

                if (newToken) {
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return apiClient(originalRequest);
                } else {
                    logout();
                }
            } catch (e) {
                logout();
            }
        }

        return Promise.reject(error.response.data);
    }
);

export default apiClient;
