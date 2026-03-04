import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Platform,
    Pressable,
    StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTranslation } from "react-i18next";

type PickerMode = "date" | "time";

const DatePickerField = ({
    label = "Chọn ngày",
    value,
    onChange,
    minDate,
    maxDate,
}: any) => {
    const [visible, setVisible] = useState(false);
    const [tempDate, setTempDate] = useState<Date>(value || new Date());
    const [mode, setMode] = useState<PickerMode>("date");
    const { t } = useTranslation();
    const onConfirm = () => {
        onChange(tempDate);
        setVisible(false);
    };

    const toggleMode = () => {
        setMode((prev) => (prev === "date" ? "time" : "date"));
    };

    return (
        <>
            {/* INPUT */}
            <TouchableOpacity
                onPress={() => setVisible(true)}
                style={styles.input}
            >
                <Text style={{ color: value ? "#000" : "#9CA3AF" }}>
                    {value
                        ? value.toLocaleDateString("vi-VN")
                        : label}
                </Text>
            </TouchableOpacity>

            {/* MODAL */}
            <Modal
                visible={visible}
                transparent
                animationType="slide"
                onRequestClose={() => setVisible(false)}
            >
                <Pressable
                    style={styles.overlay}
                    onPress={() => setVisible(false)}
                />

                <View style={styles.sheet}>
                    {/* HEADER */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => setVisible(false)}>
                            <Text style={styles.cancel}>{t("common.cancel")}</Text>
                        </TouchableOpacity>

                        {/* SELECT MODE */}
                        <TouchableOpacity
                            style={styles.modeBtn}
                            onPress={toggleMode}
                        >
                            <Text style={styles.modeText}>
                                {mode === "date" ? "Date" : "Time"} ▾
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={onConfirm}>
                            <Text style={styles.confirm}>{t("common.done")}</Text>
                        </TouchableOpacity>
                    </View>

                    {/* PICKER */}
                    <DateTimePicker
                        value={tempDate}
                        mode={mode}
                        display={
                            Platform.OS === "ios"
                                ? "spinner"
                                : "default"
                        }
                        minimumDate={minDate}
                        maximumDate={maxDate}
                        onChange={(_, d) => d && setTempDate(d)}
                        locale="vi-VN"
                        style={{ backgroundColor: "#fff" }}
                    />
                </View>
            </Modal>
        </>
    );
};

export default DatePickerField;
const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 12,
        backgroundColor: "#fff",
    },

    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
    },

    sheet: {
        backgroundColor: "#fff",
        paddingBottom: 20,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderColor: "#eee",
    },

    modeBtn: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: "#F1F5F9",
    },

    modeText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#334155",
    },

    cancel: {
        color: "#6B7280",
        fontSize: 16,
    },

    confirm: {
        color: "#2563EB",
        fontSize: 16,
        fontWeight: "600",
    },
});
