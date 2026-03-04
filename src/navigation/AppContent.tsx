import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from '~/thunk/authThunk';
import AuthStack, { AuthParamList } from './AuthNavigator';
import MainStack, { MainParamList } from './MainNavigator';
import { AppDispatch, RootState } from '~/redux/store';
import { NavigatorScreenParams } from '@react-navigation/native';
import SplashScreen from '~/components/splash-screen/SplashScreen';
import { checkHasSeenWelcome } from '~/thunk/appSlice';
import OnBoardingScreen from '~/components/onboarding/OnBoardingScreen';

export type RootParamList = {
    Splash: undefined;
    main: NavigatorScreenParams<MainParamList>;
    auth: NavigatorScreenParams<AuthParamList>;
};

export default function AppContent() {
    const dispatch = useDispatch<AppDispatch>();
    const { user, isReady: authReady } = useSelector((state: RootState) => state.auth);
    const { hasSeenWelcome } = useSelector((state: RootState) => state.app);

    useEffect(() => {
        dispatch(checkAuth());
        dispatch(checkHasSeenWelcome());
    }, [dispatch]);

    const appReady =
        authReady &&
        hasSeenWelcome !== null;
    if (!appReady) {
        return <SplashScreen />;
    }

    if (!hasSeenWelcome) return <OnBoardingScreen />;

    if (!user) {
        return <AuthStack />;
    }

    return <MainStack />;
}
