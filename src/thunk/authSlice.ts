import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { checkAuth, handleGetUser, loginThunk, handleLogout } from './authThunk';
import { CurrentLoginInfo, IResponseLogin, TenantInfo, UserInfo } from '~/interface/auth';


type AuthState = {
    user: UserInfo | null;
    loading: boolean;
    isReady: boolean;
    tenant: TenantInfo | null;
    token: string | null;
    rememberMe: boolean;
};


const initialState: AuthState = {
    user: null,
    loading: false,
    isReady: false,
    tenant: null,
    token: null,
    rememberMe: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setRememberMe: (state, action: PayloadAction<boolean>) => {
            state.rememberMe = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            // ===== CHECK AUTH (APP START) =====
            .addCase(checkAuth.pending, state => {
                state.loading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isReady = true;
                state.loading = false;
            })
            .addCase(checkAuth.rejected, state => {
                state.isReady = true;
                state.loading = false;
            })

            // ===== LOGIN =====
            .addCase(loginThunk.pending, state => {
                state.loading = true;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                // state.user = action.payload;
                state.loading = false;
                console.log('loginThunk.fulfilled', action.payload);
                state.token = action.payload.accessToken;
            })
            .addCase(handleGetUser.fulfilled, (state, action: PayloadAction<CurrentLoginInfo>) => {
                state.user = action.payload.user;
                state.tenant = action.payload.tenant
            })
            .addCase(loginThunk.rejected, state => {
                state.loading = false;
            })

            // ===== LOGOUT =====
            .addCase(handleLogout.fulfilled, state => {
                state.user = null;
                //  state.isReady = true;
            });
    },

});

export default authSlice.reducer;
export const { setRememberMe } = authSlice.actions;
