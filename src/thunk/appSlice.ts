import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkHasSeenWelcome = createAsyncThunk(
    'app/checkHasSeenWelcome',
    async () => {
        const value = await AsyncStorage.getItem('HAS_SEEN_WELCOME');
        return value === 'true';
    }
);

type AppState = {
    hasSeenWelcome: boolean | null;
    appReady: boolean;
};

const initialState: AppState = {
    hasSeenWelcome: null,
    appReady: false,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setHasSeenWelcome(state) {
            state.hasSeenWelcome = true;
            AsyncStorage.setItem('HAS_SEEN_WELCOME', 'true');
        },
    },
    extraReducers: builder => {
        builder.addCase(checkHasSeenWelcome.fulfilled, (state, action) => {
            state.hasSeenWelcome = action.payload;
        });
    },
});

export const { setHasSeenWelcome } = appSlice.actions;
export default appSlice.reducer;
