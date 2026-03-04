import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Dimensions,
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
import { appColors } from '~/utils/constants/appColors';
import FilterScreen from '~/screens/filter/FilterScreen';
import { useTranslation } from 'react-i18next';
import { useAppColors } from '~/hooks/useAppColors';
import HomeScreen from '~/screens/home/HomeScreen';
import NotificationScreen from '~/screens/notification/NotificationScreen';
import MenuScreen from '~/screens/menu/MenuScreen';
import { useNotifications } from '~/hooks/useNotifications';

/* -------------------- Types -------------------- */
export type BottomTabParamList = {
    Home: undefined;
    Notifications: undefined;
    Menu: undefined;
    Profile: undefined;
    Filter: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

/* -------------------- Layout const -------------------- */
const { width } = Dimensions.get('window');
const TAB_COUNT = 4;
const TAB_BAR_MARGIN = 24;
const TAB_BAR_WIDTH = width - TAB_BAR_MARGIN * 2;
const TAB_WIDTH = TAB_BAR_WIDTH / TAB_COUNT;

/* -------------------- Tab Item -------------------- */
const TabItem = ({ focused, icon, label }: any) => {
    const scale = useRef(new Animated.Value(1)).current;

    // useEffect(() => {
    //     Animated.spring(scale, {
    //         toValue: focused ? 1.1 : 1,
    //         useNativeDriver: true,
    //     }).start();
    // }, [focused]);

    return (
        <Animated.View
            style={{
                alignItems: 'center',
                transform: [{ scale }],
            }}
        >
            {icon}
            <Text style={[styles.label, focused && styles.labelActive]}>
                {label}
            </Text>
        </Animated.View>
    );
};

/* -------------------- Custom TabBar -------------------- */
const CustomTabBar = ({ state, descriptors, navigation }: any) => {
    const translateX = useRef(new Animated.Value(0)).current;
    const colors = useAppColors();
    useEffect(() => {
        Animated.spring(translateX, {
            toValue: state.index * TAB_WIDTH,
            useNativeDriver: true,
        }).start();
    }, [state.index]);

    return (
        <View style={styles.wrapper}>
            <View style={[styles.tabBar, { backgroundColor: colors.card }]}>
                {/* Indicator */}
                <Animated.View
                    style={[
                        styles.indicator,
                        { transform: [{ translateX }] },
                    ]}
                />

                {state.routes.map((route: any, index: number) => {
                    const { options } = descriptors[route.key];
                    const focused = state.index === index;

                    return (
                        <TouchableOpacity
                            key={route.key}
                            style={styles.tabItem}
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate(route.name)}
                        >
                            <TabItem
                                focused={focused}
                                icon={options.tabBarIcon({ focused })}
                                label={options.tabBarLabel}
                            />
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
    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={{ headerShown: false }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    // tabBarLabel: TAB_LABEL.HOME,
                    tabBarLabel: t('tab.home'),
                    tabBarIcon: ({ focused }) =>
                        focused ? <HomeIconActive /> : <HomeIcon />,
                }}
            />

            <Tab.Screen
                name="Filter"
                component={FilterScreen}
                options={{
                    // tabBarLabel: TAB_LABEL.SEARCH,
                    tabBarLabel: t('tab.search'),
                    tabBarIcon: ({ focused }) =>
                        focused ? <SearchIconActive /> : <SearchIcon />,
                }}
            />

            {/* <Tab.Screen
                name="Notifications"
                component={NotificationScreen}
                options={{
                    // tabBarLabel: TAB_LABEL.NOTIFICATION,
                    tabBarLabel: t('tab.notification'),
                    tabBarIcon: ({ focused }) =>
                        focused ? <NotiIconActive /> : <NotiIcon />,
                }}
            /> */}
            <Tab.Screen
                name="Notifications"
                component={NotificationScreen}
                options={{
                    tabBarLabel: t('tab.notification'),
                    tabBarIcon: ({ focused }) => {

                        return (
                            <View style={{ width: 28, height: 28 }}>
                                {focused ? <NotiIconActive /> : <NotiIcon style={{ width: 28, height: 28, marginLeft: 4 }} />}

                                {items.length > 0 && (
                                    <View style={styles.badge}>
                                        <Text style={styles.badgeText}>
                                            {items.length > 99 ? '99+' : items.length}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        );
                    },
                }}
            />
            <Tab.Screen
                name="Menu"
                component={MenuScreen}
                options={{
                    // tabBarLabel: TAB_LABEL.MENU,
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
        left: 0,
        right: 0,
        bottom: 16,
        alignItems: 'center',
    },

    tabBar: {
        width: TAB_BAR_WIDTH,
        // height: 72,
        height: 64,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 36,
        elevation: 12,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 12,
        overflow: 'hidden',
    },

    tabItem: {
        width: TAB_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
    },

    label: {
        fontSize: 11,
        color: '#9CA3AF',
        marginTop: 4,
    },

    labelActive: {
        color: appColors.hight_light,
        fontWeight: '600',
    },

    indicator: {
        position: 'absolute',
        bottom: 0,
        width: TAB_WIDTH,
        height: 4,
        backgroundColor: appColors.hight_light,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
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
