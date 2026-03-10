import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { getGreetingByTime } from "~/helper/time.helper";
import { useWeather } from "~/hooks/useWeather";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { DrawerParamList } from "~/navigation/MainNavigator";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { DrawIcon } from "~/assets/icons";
import { useTheme } from "~/context/ThemeContext";
const TYPING_SPEED = 45;
const HOLD_DURATION = 1800;

export default function WeatherHeader() {

    const { weather } = useWeather("Hanoi");
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const greeting = getGreetingByTime();

    const messages = [
        greeting,
        weather && `${weather.city} • ${weather.temp}°C • ${weather.text}`,
    ].filter(Boolean) as string[];

    const [msgIndex, setMsgIndex] = useState(0);
    const [typedText, setTypedText] = useState("");
    const [charIndex, setCharIndex] = useState(0);

    type DrawerNav = DrawerNavigationProp<DrawerParamList, "Tabs">;
    const navigationDraw = useNavigation<DrawerNav>();

    /* ===== Typing Effect ===== */
    useEffect(() => {
        if (!messages.length) return;

        if (charIndex < messages[msgIndex].length) {
            const timeout = setTimeout(() => {
                setTypedText((prev) => prev + messages[msgIndex][charIndex]);
                setCharIndex((prev) => prev + 1);
            }, TYPING_SPEED);

            return () => clearTimeout(timeout);
        } else {
            const hold = setTimeout(() => {
                setTypedText("");
                setCharIndex(0);
                setMsgIndex((prev) => (prev + 1) % messages.length);
            }, HOLD_DURATION);

            return () => clearTimeout(hold);
        }
    }, [charIndex, msgIndex, messages]);

    return (
        <View style={styles.wrapper}>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.subTextRow}>
                    {weather && (
                        <Image
                            source={{ uri: `https:${weather.icon}` }}
                            style={styles.weatherIcon}
                        />
                    )}
                    <Text style={styles.subText}>{typedText}</Text>
                </View>
                {/* <DrawIcon onPress={() => navigationDraw.openDrawer()} width={28} height={28} /> */}
                <Ionicons
                    name="menu"
                    size={28}
                    color={isDark ? "#fff" : "#111"}
                    onPress={() => navigationDraw.openDrawer()}
                />
            </View>

            <View style={styles.divider}></View>
        </View>
    );
}
const styles = StyleSheet.create({
    wrapper: {
    },

    /* SUB TEXT */
    subTextRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        paddingHorizontal: 4,
        minHeight: 22,
        flex: 1
    },
    divider: {
        height: 0.5,
        backgroundColor: "#E2E8F0",
        marginVertical: 0,
        marginHorizontal: -20
    },

    subText: {
        fontSize: 13,
        color: "#475569",
        letterSpacing: 0.3,
    },

    weatherIcon: {
        width: 18,
        height: 18,
        marginRight: 6,
    },


});
