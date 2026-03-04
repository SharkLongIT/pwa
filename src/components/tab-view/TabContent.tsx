import * as React from "react";
import {
    View,
    Text,
    StyleSheet,
    useWindowDimensions,
    Pressable,
    Animated,
} from "react-native";
import { TabView } from "react-native-tab-view";

const Tab1 = () => (
    <View style={styles.scene}>
        <Text style={{ color: "red" }}>Demo 1</Text>
    </View>
);

const Tab2 = () => (
    <View style={styles.scene}>
        <Text>Demo 2</Text>
    </View>
);

export default function TabContent() {
    const layout = useWindowDimensions();
    const tabWidth = layout.width / 2 - 20;
    const [index, setIndex] = React.useState(0);

    const translateX = React.useRef(new Animated.Value(0)).current;

    const routes = [
        { key: "tab1", title: "Tab 1" },
        { key: "tab2", title: "Tab 2" },
    ];

    const onChangeTab = (i: number) => {
        setIndex(i);
        Animated.spring(translateX, {
            toValue: i * tabWidth,
            useNativeDriver: true,
            damping: 15,
        }).start();
    };

    const renderScene = ({ route }: any) => {
        switch (route.key) {
            case "tab1":
                return <Tab1 />;
            case "tab2":
                return <Tab2 />;
            default:
                return null;
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
            {/* TAB BAR */}
            <View style={styles.tabBar}>
                {/* Animated background */}
                <Animated.View
                    style={[
                        styles.activeBg,
                        {
                            width: tabWidth,
                            transform: [{ translateX }],
                        },
                    ]}
                />

                {routes.map((route, i) => {
                    const isActive = index === i;

                    return (
                        <Pressable
                            key={route.key}
                            style={styles.tabItem}
                            onPress={() => onChangeTab(i)}
                        >
                            <Animated.Text
                                style={[
                                    styles.tabText,
                                    {
                                        transform: [{ scale: isActive ? 1.05 : 1 }],
                                        opacity: isActive ? 1 : 0.6,
                                        color: isActive ? "#fff" : "#374151",
                                    },
                                ]}
                            >
                                {route.title}
                            </Animated.Text>
                        </Pressable>
                    );
                })}
            </View>

            {/* CONTENT */}
            <TabView
                style={{ flex: 1 }}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={onChangeTab}
                initialLayout={{ width: layout.width }}
                renderTabBar={() => null}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F9FAFB",
    },

    tabBar: {
        margin: 16,
        flexDirection: "row",
        backgroundColor: "#E5E7EB",
        borderRadius: 14,
        padding: 4,
        position: "relative",
        overflow: "hidden",
    },

    activeBg: {
        position: "absolute",
        left: 4,
        top: 4,
        bottom: 4,
        backgroundColor: "#2563EB",
        borderRadius: 12,
    },

    tabItem: {
        flex: 1,
        paddingVertical: 10,
        alignItems: "center",
        zIndex: 1,
    },

    tabText: {
        fontSize: 14,
        fontWeight: "600",
    },
});
