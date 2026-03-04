import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '~/screens/home/HomeScreen';
import { NavigatorScreenParams } from '@react-navigation/native';
import BottomTabNavigator, { BottomTabParamList } from './BottomTabNavigator';
import ProfileScreen from '~/screens/profile/ProfileScreen';
import NotificationScreen from '~/screens/notification/NotificationScreen';
import SettingsScreen from '~/screens/settings/SettingsScreen';
import { useTranslation } from 'react-i18next';
import SecurityScreen from '~/screens/security/SecurityScreen';
import ThemeScreen from '~/screens/theme/ThemeScreen';
import AboutScreen from '~/screens/about-us/AboutScreen';
import PrivacyPolicyScreen from '~/screens/privacy-policy/PrivacyPolicyScreen';
import TermsScreen from '~/screens/term-conditions/TermsScreen';
import LanguageScreen from '~/screens/language/LanguageScreen';
import ChangePasswordScreen from '~/screens/settings/change-password/ChangePasswordScreen';
import HelpSupportScreen from '~/screens/help-support/HelpSupportScreen';
import { useAppColors } from '~/hooks/useAppColors';
import DrawerNavigator from './DrawerNavigator';
import ActiveSessionsScreen from '~/screens/security/ActiveSessionsScreen';

export type MainParamList = {
    // MainTab: NavigatorScreenParams<BottomTabParamList>;
    MainDrawer: NavigatorScreenParams<DrawerParamList>;
    Profile: undefined;
    Settings: undefined;
    ChangePasswordScreen: undefined;
    HelpSupport: undefined;
    Security: undefined;
    Theme: undefined;
    Terms: undefined;
    PrivacyPolicy: undefined;
    About: undefined;
    Language: undefined;
    ActiveSessions: undefined;


};
export type DrawerParamList = {
    Tabs: NavigatorScreenParams<BottomTabParamList>;
};
const Stack = createNativeStackNavigator<MainParamList>();
// options={{ headerShown: false }}
export default function MainStack() {
    const { t } = useTranslation();
    const colors = useAppColors();
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.card,
                },
                headerTitleStyle: {
                    color: colors.textPrimary,
                },
                headerTintColor: colors.primary,
                headerBackTitle: t('common.back'),
            }}
        >
            {/* <Stack.Screen
                name="MainTab"
                component={BottomTabNavigator}
                options={{ headerShown: false }}

            /> */}
            <Stack.Screen
                name="MainDrawer"
                component={DrawerNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="Profile" options={{ title: t('tab.profile') }} component={ProfileScreen} />
            <Stack.Screen name="Settings" options={{ title: t('tab.settings') }} component={SettingsScreen} />
            <Stack.Screen name="ChangePasswordScreen" options={{ title: t('settings.changePassword') }} component={ChangePasswordScreen} />
            <Stack.Screen name="HelpSupport" options={{ title: t('tab.help') }} component={HelpSupportScreen} />
            <Stack.Screen name="Security" options={{ title: t('tab.security') }} component={SecurityScreen} />
            <Stack.Screen name="Theme" options={{ title: t('tab.theme') }} component={ThemeScreen} />
            <Stack.Screen name="Terms" options={{ title: t('tab.terms') }} component={TermsScreen} />
            <Stack.Screen name="PrivacyPolicy" options={{ title: t('tab.privacyPolicy') }} component={PrivacyPolicyScreen} />
            <Stack.Screen name="About" options={{ title: t('tab.about') }} component={AboutScreen} />
            <Stack.Screen name="Language" options={{ title: t('tab.language') }} component={LanguageScreen} />
            <Stack.Screen name="ActiveSessions" options={{ title: t('security.activeSessions') }} component={ActiveSessionsScreen} />
        </Stack.Navigator>
    );
}