import React from "react";
import { useTranslation } from "react-i18next";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAppColors } from "~/hooks/useAppColors";

export const DeleteAccountModal = ({ visible, onPress }: any) => {
    const colors = useAppColors();
    const { t } = useTranslation();
    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={() => onPress(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
                    <Text style={[styles.modalTitle, { color: colors.textPrimary }]}> {t("modal.deleteAccountTitle")}</Text>
                    <Text style={[styles.modalMessage, { color: colors.textSecondary }]}>
                        {t("modal.deleteAccountMessage")}
                    </Text>

                    <View style={styles.modalActions}>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => onPress(false)}
                        >
                            <Text style={[styles.cancelText, { color: colors.textSecondary }]}>{t("modal.cancel")}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={async () => {
                                try {
                                    // await profileService.deleteAccount(); // gọi API xóa
                                    // await logout(); // clear token
                                    // navigation.replace("Login"); // về màn Login
                                    // Toast.show({
                                    //     type: 'success',
                                    //     text1: 'Demo',
                                    //     text2: 'Đã xóa tài khoản thành công',
                                    //     // text2Style: {
                                    //     //   fontSize: 13,
                                    //     //   color: '#333',
                                    //     //   fontStyle: 'italic',
                                    //     //   textAlign: 'left',
                                    //     // }
                                    //     // position: 'bottom',
                                    //     // bottomOffset: 40

                                    // });
                                    onPress(false)
                                } catch (err) {
                                    // Toast.show({
                                    //     type: 'error',
                                    //     text1: 'Lỗi xóa tài khoản',
                                    // });
                                }
                            }}
                        >
                            <Text style={[styles.deleteText]}>{t("modal.delete")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: "80%",
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
        color: "#222",
    },
    modalMessage: {
        fontSize: 14,
        textAlign: "center",
        color: "#555",
        marginBottom: 20,
        lineHeight: 20,
    },
    modalActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    cancelButton: {
        flex: 1,
        paddingVertical: 12,
        marginRight: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        alignItems: "center",
        justifyContent: "center",
    },
    cancelText: {
        fontSize: 14,
        color: "#333",
        fontWeight: "500",
    },
    deleteButton: {
        flex: 1,
        paddingVertical: 12,
        marginLeft: 8,
        borderRadius: 8,
        backgroundColor: "#FF3C5F",
        alignItems: "center",
        justifyContent: "center",
    },
    deleteText: {
        fontSize: 14,
        color: "#fff",
        fontWeight: "600",
    },
});