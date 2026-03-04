import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import Feather from "react-native-vector-icons/Feather";
export const toastConfig = {
    success: (props: any) => (
        <BaseToast {...props} type="success" />
    ),
    info: (props: any) => (
        <BaseToast {...props} type="info" />
    ),
    error: (props: any) => (
        <BaseToast {...props} type="error" />
    ),
};

const BaseToast = ({
    text1,
    text2,
    type,
}: any) => {
    const iconMap: any = {
        success: {
            name: "check-circle",
            color: "#22C55E",
            bg: "#ECFDF5",
            border: "#10B981",
            iconColor: "#10B981",
            titleColor: "#065F46",
            subColor: "#047857",
        },
        info: {
            name: "alert-circle",
            color: "#FACC15",
            bg: "#FEF3C7",
            border: "#F59E0B",
            iconColor: "#F59E0B",
            titleColor: "#92400E",
            subColor: "#78350F"
        },
        error: {
            name: "x-circle",
            color: "#EF4444",
            bg: "#FEE2E2",
            border: "#EF4444",
            iconColor: "#EF4444",
            titleColor: "#7F1D1D",
            subColor: "#B91C1C"
        },
    };

    return (
        <View style={styles.wrapper}>
            <View style={[styles.toast, { backgroundColor: iconMap[type].bg, borderColor: iconMap[type].border }]}>
                {/* ICON */}
                <Feather
                    name={iconMap[type].name}
                    size={22}
                    color={iconMap[type].color}
                    style={{ marginRight: 12 }}
                />

                {/* CONTENT */}
                <View style={{ marginRight: 20 }}>
                    <Text style={[styles.title, { color: iconMap[type].titleColor }]}>{text1}</Text>
                    {text2 && <Text style={[styles.sub, { color: iconMap[type].subColor }]}>{text2}</Text>}
                </View>

                {/* CLOSE */}
                <TouchableOpacity onPress={() => Toast.hide()} style={{ marginTop: 2 }}>
                    <Feather name="x" size={18} color={iconMap[type].iconColor} />
                </TouchableOpacity>

            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 16,
        marginTop: 8,
    },

    toast: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1F2F55", // navy
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 18,

        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
        elevation: 8,
    },

    title: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "600",
    },

    sub: {
        color: "#CBD5E1",
        fontSize: 12,
        marginTop: 4,
    },
});
