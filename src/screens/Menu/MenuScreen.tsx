// import React from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     Image,
//     TouchableOpacity,
// } from 'react-native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { useNavigation } from '@react-navigation/native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// import { useAppDispatch } from '~/redux/hooks';
// import { handleLogout } from '~/thunk/authThunk';
// import HeaderMain from '~/components/layout/base-header/header-main';
// import { appColors } from '~/utils/constants/appColors';
// import { useSelector } from 'react-redux';
// import { RootState } from '~/redux/store';
// import { BottomTabParamList } from '~/navigation/BottomTabNavigator';
// import { MainParamList } from '~/navigation/MainNavigator';
// import { useTranslation } from 'react-i18next';

// const MenuScreen = () => {
//     const navigation =
//         useNavigation<NativeStackNavigationProp<BottomTabParamList>>();
//     const navigationMain =
//         useNavigation<NativeStackNavigationProp<MainParamList>>();
//     const dispatch = useAppDispatch();
//     const auth = useSelector((state: RootState) => state.auth.user);
//     const onLogout = () => {
//         dispatch(handleLogout());
//     };

//     const { t } = useTranslation();

//     return (
//         <SafeAreaView style={styles.safe}>
//             <HeaderMain title={t('tab.menu')} />
//             <View style={styles.container}>
//                 {/* USER CARD */}
//                 <View style={styles.userCard}>
//                     <Image
//                         source={{ uri: 'https://i.pravatar.cc/150' }}
//                         style={styles.avatar}
//                     />
//                     <View>
//                         <Text style={styles.name}>{auth?.name}</Text>
//                         <Text style={styles.email}>{auth?.emailAddress}</Text>
//                     </View>
//                 </View>

//                 {/* MENU LIST */}
//                 <View style={styles.section}>
//                     <MenuItem title={t('tab.profile')} onPress={() => navigation.navigate('Profile')} />
//                     <MenuItem title={t('tab.notification')} onPress={() => navigation.navigate('Notifications')} />
//                     <MenuItem title={t('tab.settings')} onPress={() => navigationMain.navigate('Settings')} />
//                     <MenuItem title={t('tab.help')} onPress={() => navigationMain.navigate('HelpSupport')} />
//                 </View>

//                 {/* LOGOUT */}
//                 <TouchableOpacity style={styles.logout} onPress={onLogout}>
//                     <Text style={styles.logoutText}>{t('common.logout')}</Text>
//                 </TouchableOpacity>
//             </View>
//         </SafeAreaView>
//     );
// };

// export default MenuScreen;

// /* -------------------- ITEM -------------------- */
// const MenuItem = ({ title, onPress }: any) => {
//     return (
//         <TouchableOpacity style={styles.item} onPress={onPress}>
//             <Text style={styles.itemText}>{title}</Text>
//             <Text style={styles.chevron}>›</Text>
//         </TouchableOpacity>
//     );
// };

// /* -------------------- STYLES -------------------- */
// const styles = StyleSheet.create({
//     safe: {
//         flex: 1,
//         backgroundColor: '#F5F7FA',
//     },

//     container: {
//         flex: 1,
//         padding: 16,
//     },

//     /* USER */
//     userCard: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: '#fff',
//         borderRadius: 16,
//         padding: 16,
//         marginBottom: 24,
//         elevation: 4,
//         shadowColor: '#000',
//         shadowOpacity: 0.06,
//         shadowRadius: 8,
//     },

//     avatar: {
//         width: 56,
//         height: 56,
//         borderRadius: 28,
//         marginRight: 14,
//     },

//     name: {
//         fontSize: 16,
//         fontWeight: '700',
//     },

//     email: {
//         fontSize: 13,
//         color: '#777',
//         marginTop: 2,
//     },

//     /* MENU */
//     section: {
//         backgroundColor: '#fff',
//         borderRadius: 16,
//         paddingVertical: 4,
//         marginBottom: 24,
//         elevation: 3,
//         shadowColor: '#000',
//         shadowOpacity: 0.05,
//         shadowRadius: 6,
//     },

//     item: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingVertical: 16,
//         paddingHorizontal: 18,
//         borderBottomWidth: 0.5,
//         borderBottomColor: '#eee',
//     },

//     itemText: {
//         fontSize: 15,
//         color: '#222',
//     },

//     chevron: {
//         fontSize: 22,
//         color: '#ccc',
//     },

//     /* LOGOUT */
//     logout: {
//         backgroundColor: '#fff',
//         borderRadius: 16,
//         paddingVertical: 16,
//         alignItems: 'center',
//         elevation: 3,
//         shadowColor: '#000',
//         shadowOpacity: 0.05,
//         shadowRadius: 6,
//     },

//     logoutText: {
//         color: appColors.error || '#E53935',
//         fontSize: 15,
//         fontWeight: '600',
//     },
// });
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import HeaderMain from '~/components/layout/base-header/header-main';
import { useAppDispatch } from '~/redux/hooks';
import { handleLogout } from '~/thunk/authThunk';
import { RootState } from '~/redux/store';
import { BottomTabParamList } from '~/navigation/BottomTabNavigator';
import { MainParamList } from '~/navigation/MainNavigator';
import { appColors } from '~/utils/constants/appColors';
import { useAppColors } from '~/hooks/useAppColors';
import { DeleteAccountModal } from './modal/DeleteAccount';

const MenuScreen = () => {
    const navigation =
        useNavigation<NativeStackNavigationProp<BottomTabParamList>>();
    const navigationMain =
        useNavigation<NativeStackNavigationProp<MainParamList>>();

    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const auth = useSelector((state: RootState) => state.auth.user);
    const colors = useAppColors();
    const [modalDeleteVisible, setModalDeleteVisible] = useState<boolean>(false);

    const onLogout = () => {
        dispatch(handleLogout());
    };

    return (
        <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
            <HeaderMain title={t('tab.menu')} />
            <ScrollView contentContainerStyle={styles.container}>

                {/* USER INFO */}
                <View style={[styles.userCard, { backgroundColor: colors.card }]}>
                    <Image
                        // source={{ uri: 'https://i.pravatar.cc/150' }}
                        source={require('~/assets/images/default-avatar.png')}
                        style={styles.avatar}
                    />
                    <View>
                        <Text style={[styles.name, { color: colors.textPrimary }]}>{auth?.name}</Text>
                        <Text style={[styles.email, { color: colors.textSecondary }]}>{auth?.emailAddress}</Text>
                    </View>
                </View>

                {/* ACCOUNT */}
                <Section>
                    <MenuItem title={t('tab.profile')} onPress={() => navigation.navigate('Profile')} />
                    {/* <MenuItem title={t('tab.notification')} onPress={() => navigation.navigate('Notifications')} /> */}
                    <MenuItem title={t('tab.security')} onPress={() => navigationMain.navigate('Security')} />
                </Section>

                {/* SETTINGS */}
                <Section>
                    {/* <MenuItem title={t('tab.settings')} onPress={() => navigationMain.navigate('Settings')} /> */}
                    <MenuItem title={t('tab.language')} onPress={() => navigationMain.navigate('Language')} />
                    <MenuItem title={t('tab.theme')} onPress={() => navigationMain.navigate('Theme')} />
                </Section>

                {/* SUPPORT */}
                <Section>
                    <MenuItem title={t('tab.help')} onPress={() => navigationMain.navigate('HelpSupport')} />
                    {/* <MenuItem title={t('tab.feedback')} onPress={() => navigationMain.navigate('Feedback')} /> */}
                    <MenuItem title={t('tab.terms')} onPress={() => navigationMain.navigate('Terms')} />
                    <MenuItem title={t('tab.privacy')} onPress={() => navigationMain.navigate('PrivacyPolicy')} />
                    <MenuItem title={t('tab.about')} onPress={() => navigationMain.navigate('About')} />
                </Section>

                {/* DANGER */}
                <Section>
                    <MenuItem
                        title={t('tab.deleteAccount')}
                        onPress={() => setModalDeleteVisible(true)}
                        danger
                    />
                </Section>

                {/* LOGOUT */}
                <TouchableOpacity style={[styles.logout, { backgroundColor: colors.card }]} onPress={onLogout}>
                    <Text style={styles.logoutText}>{t('common.logout')}</Text>
                </TouchableOpacity>
                <DeleteAccountModal
                    visible={modalDeleteVisible}
                    onPress={() => setModalDeleteVisible(false)}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default MenuScreen;

/* -------------------- COMPONENTS -------------------- */

const Section = ({ children }: any) => {
    const colors = useAppColors();
    return (
        <View style={[styles.section, { backgroundColor: colors.card }]}>{children}</View>
    );
};

const MenuItem = ({ title, onPress, danger }: any) => {
    const colors = useAppColors();
    return (
        <TouchableOpacity style={styles.item} onPress={onPress}>
            <Text
                style={[
                    styles.itemText,
                    { color: colors.textPrimary },
                    danger && styles.dangerText,
                ]}
            >
                {title}
            </Text>
            <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>


    )
};


/* -------------------- STYLES -------------------- */

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },

    container: {
        padding: 16,
        paddingBottom: 100,
    },

    /* USER */
    userCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 8,
    },

    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        marginRight: 14,
    },

    name: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111',
    },

    email: {
        fontSize: 13,
        color: '#6B7280',
        marginTop: 2,
    },

    /* SECTION */
    section: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 20,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 6,
    },

    /* ITEM */
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 18,
        borderBottomWidth: 0.5,
        borderBottomColor: '#EEE',
    },

    itemText: {
        fontSize: 15,
        color: '#222',
    },

    dangerText: {
        color: appColors.error || '#E53935',
        fontWeight: '600',
    },

    chevron: {
        fontSize: 22,
        color: '#D1D5DB',
    },

    /* LOGOUT */
    logout: {
        backgroundColor: '#fff',
        borderRadius: 16,
        paddingVertical: 16,
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 6,
    },

    logoutText: {
        color: appColors.error || '#E53935',
        fontSize: 15,
        fontWeight: '600',
    },
});
