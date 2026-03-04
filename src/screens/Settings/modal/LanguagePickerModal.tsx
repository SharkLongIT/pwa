import React from "react";
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    Pressable,
    StyleSheet,
} from "react-native";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import Feather from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
const LANGUAGES = [
    { code: "vi", label: "Tiếng Việt" },
    { code: "en", label: "English" },
];

const LanguagePickerModal = ({ visible, onClose }: any) => {
    const { t } = useTranslation();
    const current = i18n.language;

    const onSelect = async (code: string) => {
        await AsyncStorage.setItem("LANG", code);
        i18n.changeLanguage(code);
        onClose();
    };

    return (
        <Modal visible={visible} transparent animationType="slide">
            {/* overlay */}
            <Pressable style={styles.overlay} onPress={onClose} />

            {/* sheet */}
            <View style={styles.sheet}>
                <Text style={styles.title}>
                    {t("settings.language")}
                </Text>

                {LANGUAGES.map((item) => {
                    const active = item.code === current;
                    return (
                        <TouchableOpacity
                            key={item.code}
                            style={styles.row}
                            onPress={() => onSelect(item.code)}
                        >
                            <Text style={styles.label}>{item.label}</Text>

                            {active && (
                                <Feather
                                    name="check"
                                    size={20}
                                    color="#2563EB"
                                />
                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </Modal>
    );
};

export default LanguagePickerModal;
const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
    },

    sheet: {
        backgroundColor: "#fff",
        padding: 16,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },

    title: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 12,
        textAlign: "center",
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderColor: "#F1F5F9",
    },

    label: {
        fontSize: 15,
        color: "#111827",
    },
});
