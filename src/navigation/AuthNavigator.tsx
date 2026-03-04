import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '~/screens/login/LoginScreen';
import HomeScreen from '~/screens/home/HomeScreen';
import SignUpScreen from '~/screens/login/SignUpScreen';
import SplashScreen from '~/components/splash-screen/SplashScreen';

export type AuthParamList = {
    // Login: { redirect: string } | undefined;
    Login: undefined;
    SignUp: undefined;
    Splash: undefined;
    Home: undefined;
};
const Stack = createNativeStackNavigator<AuthParamList>();

export default function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    );
}
