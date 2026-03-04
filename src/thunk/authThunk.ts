import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "~/api/apiClient";
import authApi from "~/api/auth.api";
import { CurrentLoginInfo, ILoginPayload, IResponseLogin } from "~/interface/auth";
import { LOGIN } from "~/utils/constants/actionType";
import { StorageEnum } from "~/utils/enum";
import { setData } from "~/utils/helper/storage";
import * as Keychain from 'react-native-keychain';

export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async () => {
        const token = await AsyncStorage.getItem(StorageEnum.ACCESS_TOKEN);
        if (!token) return null;

        apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;

        const res = await apiClient.get(
            '/api/services/app/Session/GetCurrentLoginInformations'
        );
        return res.data.result.user;
    }
);


export const loginThunk = createAsyncThunk<
    IResponseLogin,
    ILoginPayload
>(LOGIN, async (data, { dispatch, rejectWithValue }) => {
    try {
        const res = await authApi.login(data);
        console.log(res)
        const token = res.data.result.accessToken;

        // if (data.rememberClient) {
        //     await AsyncStorage.setItem(StorageEnum.ACCESS_TOKEN, res.data.result.accessToken);
        // }
        await setData(StorageEnum.ACCESS_TOKEN, token);
        // await Keychain.setGenericPassword(
        //     'refreshToken',
        //     res.data.result.refreshToken
        // );

        // apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;

        await dispatch(handleGetUser()).unwrap();

        return res.data.result;
    } catch (error) {
        return rejectWithValue(error);
    }
});


export const handleGetUser = createAsyncThunk<CurrentLoginInfo>(
    'auth/getUser',
    async (_, { rejectWithValue }) => {
        try {
            const res = await apiClient.get(
                '/api/services/app/Session/GetCurrentLoginInformations'
            );
            return res.data.result;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const handleLogout = createAsyncThunk(
    'auth/logout',
    async () => {
        await AsyncStorage.removeItem('user_data');
        await AsyncStorage.removeItem('access_token');
    }
);