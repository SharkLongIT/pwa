import React, { useEffect, useState } from "react";
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from "react-native";
import { useTranslation } from "react-i18next";
import AppInput from "~/components/input-base/AppInput";
import { ProjectType } from "~/interface/project";

interface Props {
    visible: boolean;
    onClose: () => void;
    onSubmit: (data: ProjectType) => void;
    projectType?: ProjectType;
}

const CreateOrUpdateProjectTypeModal = ({
    visible,
    onClose,
    onSubmit,
    projectType,
}: Props) => {

    const { t } = useTranslation();
    const isEdit = !!projectType;

    const [code, setCode] = useState("");
    const [costRate, setCostRate] = useState("");
    const [profitRate, setProfitRate] = useState("");
    const [marginRate, setMarginRate] = useState("");
    const [feedbackRate, setFeedbackRate] = useState("");

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (projectType) {
            setCode(projectType.code ?? "");
            setCostRate(projectType.costRate?.toString() ?? "");
            setProfitRate(projectType.profitRate?.toString() ?? "");
            setMarginRate(projectType.marginRate?.toString() ?? "");
            setFeedbackRate(projectType.feedbackRate?.toString() ?? "");
        } else {
            resetForm();
        }
    }, [projectType]);

    const resetForm = () => {
        setCode("");
        setCostRate("");
        setProfitRate("");
        setMarginRate("");
        setFeedbackRate("");
        setErrors({});
    };

    const validateRate = (value: string) => {
        const num = Number(value);
        return !isNaN(num) && num >= 0 && num <= 100;
    };

    const validateField = (field: string, value: string) => {
        let message = "";

        switch (field) {
            case "code":
                if (!value.trim()) {
                    message = t("projectType.codeRequired");
                }
                break;

            case "costRate":
                if (!value) message = t("projectType.costRateRequired");
                else if (!validateRate(value))
                    message = t("projectType.rateInvalid");
                break;

            case "profitRate":
                if (!value) message = t("projectType.profitRateRequired");
                else if (!validateRate(value))
                    message = t("projectType.rateInvalid");
                break;

            case "marginRate":
                if (!value) message = t("projectType.marginRateRequired");
                else if (!validateRate(value))
                    message = t("projectType.rateInvalid");
                break;

            case "feedbackRate":
                if (!value) message = t("projectType.feedbackRateRequired");
                else if (!validateRate(value))
                    message = t("projectType.rateInvalid");
                break;
        }

        setErrors(prev => ({
            ...prev,
            [field]: message,
        }));

        return message === "";
    };

    const validateAll = () => {
        const v1 = validateField("code", code);
        const v2 = validateField("costRate", costRate);
        const v3 = validateField("profitRate", profitRate);
        const v4 = validateField("marginRate", marginRate);
        const v5 = validateField("feedbackRate", feedbackRate);

        return v1 && v2 && v3 && v4 && v5;
    };

    const handleSubmit = () => {
        if (!validateAll()) return;

        const data: ProjectType = {
            id: projectType?.id || 0,
            code,
            costRate,
            profitRate,
            marginRate,
            feedbackRate,
        };

        onSubmit(data);
        resetForm();
    };

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>
                        {isEdit
                            ? t("projectType.editTitle")
                            : t("projectType.createTitle")}
                    </Text>

                    <ScrollView showsVerticalScrollIndicator={false}>

                        <AppInput
                            label={t("projectType.code")}
                            placeholder={t("projectType.code")}
                            value={code}
                            onChangeText={(v) => {
                                setCode(v);
                                validateField("code", v);
                            }}
                            error={errors.code}
                            required={true}
                        />

                        <AppInput
                            label={t("projectType.costRate")}
                            placeholder="0 - 100"
                            keyboardType="numeric"
                            value={costRate}
                            onChangeText={(v) => {
                                setCostRate(v);
                                validateField("costRate", v);
                            }}
                            error={errors.costRate}
                            required={true}
                        />

                        <AppInput
                            label={t("projectType.profitRate")}
                            placeholder="0 - 100"
                            keyboardType="numeric"
                            value={profitRate}
                            onChangeText={(v) => {
                                setProfitRate(v);
                                validateField("profitRate", v);
                            }}
                            error={errors.profitRate}
                            required={true}
                        />

                        <AppInput
                            label={t("projectType.marginRate")}
                            placeholder="0 - 100"
                            keyboardType="numeric"
                            value={marginRate}
                            onChangeText={(v) => {
                                setMarginRate(v);
                                validateField("marginRate", v);
                            }}
                            error={errors.marginRate}
                            required={true}
                        />

                        <AppInput
                            label={t("projectType.feedbackRate")}
                            placeholder="0 - 100"
                            keyboardType="numeric"
                            value={feedbackRate}
                            onChangeText={(v) => {
                                setFeedbackRate(v);
                                validateField("feedbackRate", v);
                            }}
                            error={errors.feedbackRate}
                            required={true}
                        />

                        <View style={styles.actions}>
                            <TouchableOpacity
                                style={[styles.button, styles.cancel]}
                                onPress={() => {
                                    resetForm();
                                    onClose();
                                }}
                            >
                                <Text style={styles.text}>
                                    {t("common.cancel")}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.button, styles.save]}
                                onPress={handleSubmit}
                            >
                                <Text style={styles.text}>
                                    {t("common.save")}
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

export default CreateOrUpdateProjectTypeModal;

const styles = StyleSheet.create({

    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    container: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
        maxHeight: "80%",
    },

    title: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 16,
    },

    actions: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 20,
        gap: 10,
    },

    button: {
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 8,
    },

    cancel: {
        backgroundColor: "#9CA3AF",
    },

    save: {
        backgroundColor: "#2563EB",
    },

    text: {
        color: "#fff",
        fontWeight: "500",
    },

});