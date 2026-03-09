import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Pressable,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
    HomeIcon,
    HomeIconActive,
    SearchIcon,
    SearchIconActive,
    NotiIcon,
    NotiIconActive,
    MenuIconActive,
    MenuIcon,
} from '~/assets/icons';

import FilterScreen from '~/screens/filter/FilterScreen';
import HomeScreen from '~/screens/home/HomeScreen';
import NotificationScreen from '~/screens/notification/NotificationScreen';
import MenuScreen from '~/screens/menu/MenuScreen';

import { useTranslation } from 'react-i18next';
import { useNotifications } from '~/hooks/useNotifications';
import CreateUpdateProjectModal from '~/screens/home/modal/CreateUpdateProjectModal';
import { appEvent } from '~/utils/appEvent';
import { EVENT } from '~/utils/enum';
import { showToast } from '~/utils/toast';
import { t } from 'i18next';
import { useAppColors } from '~/hooks/useAppColors';

/* -------------------- Types -------------------- */
export type BottomTabParamList = {
    Home: undefined;
    Filter: undefined;
    Center: undefined;
    Notifications: undefined;
    Menu: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

/* -------------------- Layout -------------------- */
const { width } = Dimensions.get('window');
const TAB_COUNT = 5;
const TAB_BAR_MARGIN = 24;
const TAB_BAR_WIDTH = width - TAB_BAR_MARGIN * 2;
const TAB_WIDTH = TAB_BAR_WIDTH / TAB_COUNT;

/* -------------------- Custom TabBar -------------------- */
const CustomTabBar = ({ state, descriptors, navigation }: any) => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const colors = useAppColors();

    return (
        <View style={[styles.wrapper, { backgroundColor: colors.background }]}>
            <CreateUpdateProjectModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={() => {
                    setModalVisible(false);
                    appEvent.emit(EVENT.PROJECT_CREATED);
                    showToast?.('success', t('project.createSuccess'), '', 'top');
                }}
            />
            <View style={[styles.tabBar, { backgroundColor: colors.background }]}>
                {state.routes.map((route: any, index: number) => {
                    const { options } = descriptors[route.key];
                    const focused = state.index === index;

                    if (route.name === 'Center') {
                        return (
                            <TouchableOpacity
                                key={route.key}
                                activeOpacity={0.9}
                                style={styles.centerWrapper}
                                onPress={() => setModalVisible(true)}

                            >
                                <View style={[styles.centerOuter, { backgroundColor: colors.background, borderColor: colors.background, shadowColor: colors.background }]}>
                                    <View style={styles.centerInner}>
                                        {options.tabBarIcon({ focused: true })}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    }

                    return (
                        <TouchableOpacity
                            key={route.key}
                            style={styles.tabItem}
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate(route.name)}
                        >
                            {options.tabBarIcon({ focused })}
                            <Text style={[styles.label, focused && styles.labelActive]}>
                                {options.tabBarLabel}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

/* -------------------- Navigator -------------------- */
export default function BottomTabNavigator() {
    const { t } = useTranslation();
    const { items } = useNotifications();
    const colors = useAppColors();
    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: colors.background } }}
        >
            {/* HOME */}
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: t('tab.home'),
                    tabBarIcon: ({ focused }) =>
                        focused ? <HomeIconActive /> : <HomeIcon />,
                }}
            />

            {/* FILTER */}
            <Tab.Screen
                name="Filter"
                component={FilterScreen}
                options={{
                    tabBarLabel: t('tab.search'),
                    tabBarIcon: ({ focused }) =>
                        focused ? <SearchIconActive /> : <SearchIcon />,
                }}
            />

            {/* CENTER */}
            <Tab.Screen
                name="Center"
                component={View} // Placeholder component since this tab opens a modal
                // listeners={{
                //     tabPress: (e) => {
                //         e.preventDefault();
                //         setModalVisible(true);
                //     },
                // }}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: () => (
                        <Text style={styles.centerButtonText}>+</Text>
                    ),
                }}
            />

            {/* NOTIFICATIONS */}
            <Tab.Screen
                name="Notifications"
                component={NotificationScreen}
                options={{
                    tabBarLabel: t('tab.notification'),
                    tabBarIcon: ({ focused }) => (
                        <View style={{ width: 28, height: 28 }}>
                            {focused ? (
                                <NotiIconActive />
                            ) : (
                                <NotiIcon style={{ width: 28, height: 28, marginLeft: 4 }} />
                            )}

                            {items.length > 0 && (
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>
                                        {items.length > 99 ? '99+' : items.length}
                                    </Text>
                                </View>
                            )}
                        </View>
                    ),
                }}
            />

            {/* MENU */}
            <Tab.Screen
                name="Menu"
                component={MenuScreen}
                options={{
                    tabBarLabel: t('tab.menu'),
                    tabBarIcon: ({ focused }) =>
                        focused ? <MenuIconActive /> : <MenuIcon />,
                }}
            />
        </Tab.Navigator>
    );
}

/* -------------------- Styles -------------------- */
const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        alignItems: 'center',
        backgroundColor: 'transparent',
    },

    tabBar: {
        height: 72,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 40,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,

        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 12,
        elevation: 8,
    },

    tabItem: {
        width: TAB_WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
    },

    label: {
        fontSize: 11,
        color: '#9CA3AF',
        marginTop: 4,
    },

    labelActive: {
        color: '#4F46E5',
        fontWeight: '600',
    },

    // CENTER BUTTON
    centerWrapper: {
        width: TAB_WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
    },

    centerOuter: {
        position: 'absolute',
        top: -55,
        width: 76,
        height: 76,
        borderRadius: 38,
        backgroundColor: '#E0E7FF',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#fff',
        borderWidth: 4,

        shadowColor: '#E0E7FF',
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 16,
        elevation: 10,
    },

    centerInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#4F46E5',
        alignItems: 'center',
        justifyContent: 'center',

        shadowColor: '#4F46E5',
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 16,
        elevation: 10,
    },
    centerButtonText: {
        color: '#fff',
        fontSize: 28,
        fontWeight: '500',
        textAlign: 'center',
        lineHeight: 28,
    },

    badge: {
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: '#EF4444',
        minWidth: 18,
        height: 18,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
    },

    badgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '600',
    },
});