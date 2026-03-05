import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
} from "react-native";
import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
import { useSelector, useDispatch } from "react-redux";
import BottomTabNavigator from "./BottomTabNavigator";
import { RootState } from "~/redux/store";
import { useTheme } from "~/context/ThemeContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import { handleLogout } from '~/thunk/authThunk';
import { useAppDispatch } from "~/redux/hooks";
import { useTranslation } from "react-i18next";

const Drawer = createDrawerNavigator();

function CustomDrawer(props: any) {
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch();
    const { theme } = useTheme();
    const { t } = useTranslation();

    const isDark = theme === "dark";

    const navigateStack = (screen: string) => {
        props.navigation.closeDrawer();
        props.navigation.getParent()?.navigate(screen);
    };

    const activeRoute = props.state.routeNames[props.state.index];

    const onLogout = () => {
        dispatch(handleLogout());
    };

    return (
        <DrawerContentScrollView
            {...props}
            contentContainerStyle={[
                styles.container,
                { backgroundColor: isDark ? "#111827" : "#fff" },
            ]}

        >
            {/* HEADER */}
            <View style={styles.header}>
                <Image
                    // source={{
                    //     uri:
                    //         //   user?.avatar ||
                    //         "https://i.pravatar.cc/100",
                    // }}
                    source={require("~/assets/images/default-avatar.png")}
                    style={styles.avatar}
                />
                <View style={styles.boxInfo}>

                    <Text
                        style={[
                            styles.name,
                            { color: isDark ? "#fff" : "#111" },
                        ]}
                    >
                        {user?.name || "Người dùng"}
                    </Text>
                    <Text
                        style={[
                            styles.emailAddress,
                            { color: isDark ? "#fff" : "#5c5959" },
                        ]}
                    >
                        {user?.emailAddress}
                    </Text>
                </View>
            </View>

            {/* MENU ITEMS */}
            <DrawerItem
                label={t("tab.home")}
                icon="home-outline"
                active={activeRoute === "Tabs"}
                onPress={() => props.navigation.navigate("Tabs")}
                isDark={isDark}
            />

            <DrawerItem
                label={t("tab.search")}
                icon="search-outline"
                onPress={() => {
                    props.navigation.closeDrawer();
                    props.navigation.navigate("Tabs", {
                        screen: "Filter",
                    });
                }}
                isDark={isDark}
            />

            <DrawerItem
                label={t("tab.profile")}
                icon="person-outline"
                onPress={() => navigateStack("Profile")}
                isDark={isDark}
            />



            <DrawerItem
                label="Cài đặt"
                icon="settings-outline"
                onPress={() => navigateStack("Settings")}
                isDark={isDark}
            />

            <View style={styles.divider} />

            <DrawerItem
                label={t("common.logout")}
                icon="log-out-outline"
                danger
                onPress={() => onLogout()}
                isDark={isDark}
            />
        </DrawerContentScrollView>
    );
}

function DrawerItem({
    label,
    icon,
    onPress,
    active,
    danger,
    isDark,
}: any) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.item,
                active && { backgroundColor: isDark ? "#1F2937" : "#E5E7EB" },
            ]}
        >
            <Ionicons
                name={icon}
                size={20}
                color={
                    danger
                        ? "#EF4444"
                        : isDark
                            ? "#fff"
                            : "#111"
                }
                style={{ marginRight: 12 }}
            />
            <Text
                style={{
                    color: danger
                        ? "#EF4444"
                        : isDark
                            ? "#fff"
                            : "#111",
                    fontSize: 15,
                }}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
}

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerType: "slide",
                // overlayColor: "rgba(0,0,0,0.4)", // nền mờ khi mở
                // drawerStyle: {
                //     width: 320, // chỉnh độ rộng
                // },
                // swipeEdgeWidth: 100, // vùng vuốt mở drawer
                // drawerType: "slide" | "front" | "back" | "permanent" // dạng mở
                // drawerPosition: 'right' // hướng mở 
            }}
            drawerContent={(props) => <CustomDrawer {...props} />}
        >
            <Drawer.Screen
                name="Tabs"
                component={BottomTabNavigator}
            />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    header: {
        paddingHorizontal: 20,
        marginTop: 50,
        marginBottom: 20,
        flexDirection: 'row',
        gap: 10
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    boxInfo: {
        justifyContent: 'center',
        alignContent: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: "600",
    },
    emailAddress: {
        fontSize: 14,
        fontWeight: "400",
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginHorizontal: 10,
        marginBottom: 6,
    },
    divider: {
        height: 1,
        backgroundColor: "#E5E7EB",
        marginVertical: 20,
        marginHorizontal: 20,
    },
});