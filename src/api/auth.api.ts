import { ILoginPayload, IResponseLogin, IUser } from "~/interface/auth";
import apiClient from "./apiClient";
import { IAbpResponse, IApiBaseResponse } from "~/interface/common";

const authApi = {
    login(data: ILoginPayload) {
        // return apiClient.post('/api/TokenAuth/AuthenticateFromMobile', data);
        return apiClient.post('/api/TokenAuth/Authenticate', data);
    },
    // login(data: ILoginPayload): Promise<IAbpResponse<IResponseLogin>> {
    //     return apiClient
    //         .post<IAbpResponse<IResponseLogin>>(
    //             '/api/TokenAuth/AuthenticateFromMobile',
    //             data
    //         )
    //         .then(res => res.data);
    // },

    //   sendOtp(data: ISignUpPayload) {
    //     return axiosClient.post('/v1/auth/send-otp', data);
    //   },
    //   resendOtp(data: { email: string }) {
    //     return axiosClient.post('/v1/auth/resend-otp', data);
    //   },
    //   register(data: { email: string; otp: string }) {
    //     return axiosClient.post('/v1/auth/register', data);
    //   },
    getUser() {
        return apiClient.get<IApiBaseResponse<IUser>>('/api/services/app/Session/GetCurrentLoginInformations');
    },
};
export default authApi;
