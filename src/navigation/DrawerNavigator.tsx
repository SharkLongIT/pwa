// import React from "react";
// import {
//     View,
//     Text,
//     TouchableOpacity,
//     StyleSheet,
//     Image,
// } from "react-native";
// import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
// import { useSelector, useDispatch } from "react-redux";
// import BottomTabNavigator from "./BottomTabNavigator";
// import { RootState } from "~/redux/store";
// import { useTheme } from "~/context/ThemeContext";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { handleLogout } from '~/thunk/authThunk';
// import { useAppDispatch } from "~/redux/hooks";
// import { useTranslation } from "react-i18next";

// const Drawer = createDrawerNavigator();

// function CustomDrawer(props: any) {
//     const { user } = useSelector((state: RootState) => state.auth);
//     const dispatch = useAppDispatch();
//     const { theme } = useTheme();
//     const { t } = useTranslation();

//     const isDark = theme === "dark";

//     const navigateStack = (screen: string) => {
//         props.navigation.closeDrawer();
//         props.navigation.getParent()?.navigate(screen);
//     };

//     const activeRoute = props.state.routeNames[props.state.index];

//     const onLogout = () => {
//         dispatch(handleLogout());
//     };

//     return (
//         <DrawerContentScrollView
//             {...props}
//             contentContainerStyle={[
//                 styles.container,
//                 { backgroundColor: isDark ? "#111827" : "#fff" },
//             ]}
//         >
//             {/* HEADER */}
//             <View style={styles.header}>
//                 <Image
//                     source={require("~/assets/images/default-avatar.png")}
//                     style={styles.avatar}
//                 />

//                 <View style={styles.boxInfo}>
//                     <Text style={[styles.name, { color: isDark ? "#fff" : "#111" }]}>
//                         {user?.name || "Người dùng"}
//                     </Text>

//                     <Text
//                         style={[
//                             styles.emailAddress,
//                             { color: isDark ? "#9CA3AF" : "#6B7280" },
//                         ]}
//                     >
//                         {user?.emailAddress}
//                     </Text>
//                 </View>
//             </View>

//             {/* MAIN MENU */}
//             <View style={styles.menu}>
//                 <DrawerItem
//                     label={t("tab.home")}
//                     icon="home-outline"
//                     active={activeRoute === "Tabs"}
//                     onPress={() => props.navigation.navigate("Tabs")}
//                     isDark={isDark}
//                 />

//                 <DrawerItem
//                     label={t("tab.search")}
//                     icon="search-outline"
//                     onPress={() => {
//                         props.navigation.closeDrawer();
//                         props.navigation.navigate("Tabs", {
//                             screen: "Filter",
//                         });
//                     }}
//                     isDark={isDark}
//                 />

//                 <DrawerItem
//                     label={t("tab.profile")}
//                     icon="person-outline"
//                     onPress={() => navigateStack("Profile")}
//                     isDark={isDark}
//                 />
//             </View>

//             {/* BOTTOM MENU */}
//             <View style={styles.bottomMenu}>
//                 <DrawerItem
//                     label={t("tab.settings")}
//                     icon="settings-outline"
//                     onPress={() => navigateStack("Security")}
//                     isDark={isDark}
//                 />

//                 <DrawerItem
//                     label={t("common.logout")}
//                     icon="log-out-outline"
//                     danger
//                     onPress={onLogout}
//                     isDark={isDark}
//                 />
//             </View>
//         </DrawerContentScrollView>
//     );
// }

// function DrawerItem({
//     label,
//     icon,
//     onPress,
//     active,
//     danger,
//     isDark,
// }: any) {
//     return (
//         <TouchableOpacity
//             onPress={onPress}
//             style={[
//                 styles.item,
//                 active && { backgroundColor: isDark ? "#1F2937" : "#E5E7EB" },
//             ]}
//         >
//             <Ionicons
//                 name={icon}
//                 size={20}
//                 color={
//                     danger
//                         ? "#EF4444"
//                         : isDark
//                             ? "#fff"
//                             : "#111"
//                 }
//                 style={{ marginRight: 12 }}
//             />
//             <Text
//                 style={{
//                     color: danger
//                         ? "#EF4444"
//                         : isDark
//                             ? "#fff"
//                             : "#111",
//                     fontSize: 15,
//                 }}
//             >
//                 {label}
//             </Text>
//         </TouchableOpacity>
//     );
// }

// export default function DrawerNavigator() {
//     return (
//         <Drawer.Navigator
//             screenOptions={{
//                 headerShown: false,
//                 drawerType: "slide",
//                 // overlayColor: "rgba(0,0,0,0.4)", // nền mờ khi mở
//                 // drawerStyle: {
//                 //     width: 320, // chỉnh độ rộng
//                 // },
//                 // swipeEdgeWidth: 100, // vùng vuốt mở drawer
//                 // drawerType: "slide" | "front" | "back" | "permanent" // dạng mở
//                 // drawerPosition: 'right' // hướng mở 
//             }}
//             drawerContent={(props) => <CustomDrawer {...props} />}
//         >
//             <Drawer.Screen
//                 name="Tabs"
//                 component={BottomTabNavigator}
//             />
//         </Drawer.Navigator>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },

//     header: {
//         paddingHorizontal: 20,
//         paddingBottom: 25,
//         flexDirection: "row",
//         alignItems: "center",
//         gap: 12,
//         borderBottomWidth: 1,
//         borderBottomColor: "#E5E7EB",
//     },

//     menu: {
//         flex: 1,
//         marginTop: 10,
//     },

//     bottomMenu: {
//         borderTopWidth: 1,
//         borderTopColor: "#E5E7EB",
//         paddingTop: 10,
//         marginBottom: 20,
//     },

//     avatar: {
//         width: 56,
//         height: 56,
//         borderRadius: 28,
//     },

//     boxInfo: {
//         flex: 1,
//     },

//     name: {
//         fontSize: 16,
//         fontWeight: "600",
//     },

//     emailAddress: {
//         fontSize: 13,
//         marginTop: 2,
//     },

//     item: {
//         flexDirection: "row",
//         alignItems: "center",
//         paddingVertical: 12,
//         paddingHorizontal: 20,
//         borderRadius: 8,
//         marginHorizontal: 10,
//         marginBottom: 6,
//     },
//     divider: {
//         height: 1,
//         backgroundColor: "#E5E7EB",
//         marginVertical: 20,
//         marginHorizontal: 20,
//     },
// });
import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Switch,
} from "react-native";
import {
    createDrawerNavigator,
    DrawerContentScrollView,
} from "@react-navigation/drawer";

import Ionicons from "react-native-vector-icons/Ionicons";

import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import { useAppDispatch } from "~/redux/hooks";
import { handleLogout } from "~/thunk/authThunk";

import BottomTabNavigator from "./BottomTabNavigator";
import { useTheme } from "~/context/ThemeContext";
import { useTranslation } from "react-i18next";

const Drawer = createDrawerNavigator();

function CustomDrawer(props: any) {
    const { user } = useSelector((state: RootState) => state.auth);

    const dispatch = useAppDispatch();

    const { theme, toggleTheme } = useTheme();
    const { t } = useTranslation();

    const isDark = theme === "dark";

    const activeRoute = props.state.routeNames[props.state.index];

    const navigateStack = (screen: string) => {
        props.navigation.closeDrawer();
        props.navigation.getParent()?.navigate(screen);
    };

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
            {/* USER HEADER */}
            <View style={styles.header}>
                <Image
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
                            styles.email,
                            { color: isDark ? "#9CA3AF" : "#6B7280" },
                        ]}
                    >
                        {user?.emailAddress}
                    </Text>
                </View>
            </View>

            {/* MAIN MENU */}
            <View style={styles.section}>
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
                    onPress={() =>
                        props.navigation.navigate("Tabs", {
                            screen: "Filter",
                        })
                    }
                    isDark={isDark}
                />

                <DrawerItem
                    label={t("project.type")}
                    icon="layers-outline"
                    onPress={() => navigateStack("ProjectType")}
                    isDark={isDark}
                />

                <DrawerItem
                    label={t("tab.profile")}
                    icon="person-outline"
                    onPress={() => navigateStack("Profile")}
                    isDark={isDark}
                />
            </View>

            {/* PREFERENCES */}
            <View style={styles.section}>
                <DrawerToggleItem
                    label="Dark Mode"
                    icon="moon-outline"
                    value={isDark}
                    onToggle={toggleTheme}
                    isDark={isDark}
                />
            </View>

            {/* SYSTEM */}
            <View style={styles.section}>
                <DrawerItem
                    label={t("tab.settings")}
                    icon="settings-outline"
                    onPress={() => navigateStack("Security")}
                    isDark={isDark}
                />

                <DrawerItem
                    label={t("common.logout")}
                    icon="log-out-outline"
                    danger
                    onPress={onLogout}
                    isDark={isDark}
                />
            </View>
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
                active && {
                    backgroundColor: isDark ? "#1F2937" : "#E5E7EB",
                },
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
                style={styles.icon}
            />

            <Text
                style={[
                    styles.label,
                    {
                        color: danger
                            ? "#EF4444"
                            : isDark
                                ? "#fff"
                                : "#111",
                    },
                ]}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
}

function DrawerToggleItem({
    label,
    icon,
    value,
    onToggle,
    isDark,
}: any) {
    return (
        <View style={styles.itemBetween}>
            <View style={styles.row}>
                <Ionicons
                    name={icon}
                    size={20}
                    color={isDark ? "#fff" : "#111"}
                    style={styles.icon}
                />

                <Text
                    style={[
                        styles.label,
                        { color: isDark ? "#fff" : "#111" },
                    ]}
                >
                    {label}
                </Text>
            </View>

            <Switch value={value} onValueChange={onToggle} />
        </View>
    );
}

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerType: "slide",
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
        paddingTop: 50,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
    },

    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        marginRight: 12,
    },

    boxInfo: {
        flex: 1,
    },

    name: {
        fontSize: 16,
        fontWeight: "600",
    },

    email: {
        fontSize: 13,
        marginTop: 2,
    },

    section: {
        marginTop: 16,
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

    itemBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginHorizontal: 10,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
    },

    icon: {
        marginRight: 12,
    },

    label: {
        fontSize: 15,
    },
});