import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Alert
} from 'react-native';

import { formatCurrency, formatDate, formatMoney } from '~/utils/format/formatCurrency';
import { useAppColors } from '~/hooks/useAppColors';
import projectFe from '~/api/projectType.api';
import { useProject } from '../ProjectContext';
import { useTranslation } from 'react-i18next';
import { BaseContent } from '~/components/base-screen/BaseContent';
import { showToast } from '~/utils/toast';

const PaymentTab = () => {

    const colors = useAppColors();
    // const project = useProject();
    const { t } = useTranslation();
    const { project, reloadProject } = useProject();
    console.log(project)
    const handlePaid = async (scheduleId: number) => {
        // console.log(scheduleId)
        Alert.alert(
            t("payment.confirm"),
            t("payment.confirmPaid"),
            [
                { text: t("common.cancel"), style: "cancel" },
                {
                    text: t("payment.paid"),
                    onPress: async () => {

                        await projectFe.updateStatusSchedule({
                            Id: scheduleId,
                            status: 1
                        });
                        showToast("success", t("common.updateSuccess"), '')
                        await reloadProject();
                    }
                }
            ]
        );

    };

    return (

        <BaseContent>

            <FlatList
                contentContainerStyle={{ padding: 16 }}
                data={project?.paymentSchedules || []}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => {

                    const isPaid = item.status === 1;

                    return (

                        <View style={styles.row}>

                            {/* Timeline */}

                            <View style={styles.timeline}>

                                <View
                                    style={[
                                        styles.dot,
                                        {
                                            backgroundColor: isPaid
                                                ? '#22c55e'
                                                : '#f59e0b'
                                        }
                                    ]}
                                />

                                {index !== project?.paymentSchedules.length - 1 && (
                                    <View style={styles.line} />
                                )}

                            </View>

                            {/* Card */}

                            <View
                                style={[
                                    styles.card,
                                    { backgroundColor: colors.card }
                                ]}
                            >

                                {/* Header */}

                                <View style={styles.header}>

                                    <Text
                                        style={[
                                            styles.code,
                                            { color: colors.textPrimary }
                                        ]}
                                    >
                                        {item.projectCode}
                                    </Text>

                                    <View
                                        style={[
                                            styles.badge,
                                            {
                                                backgroundColor: isPaid
                                                    ? '#22c55e20'
                                                    : '#f59e0b20'
                                            }
                                        ]}
                                    >

                                        <Text
                                            style={{
                                                color: isPaid
                                                    ? '#22c55e'
                                                    : '#f59e0b',
                                                fontWeight: '600'
                                            }}
                                        >
                                            {isPaid
                                                ? t('payment.paid')
                                                : t('payment.unpaid')}
                                        </Text>

                                    </View>

                                </View>

                                {/* Info */}

                                <View style={styles.infoRow}>
                                    <Text style={styles.label}>
                                        {t('payment.paymentDate')}
                                    </Text>

                                    <Text
                                        style={[
                                            styles.value,
                                            { color: colors.textSecondary }
                                        ]}
                                    >
                                        {formatDate(item.paymentDate)}
                                    </Text>
                                </View>

                                <View style={styles.infoRow}>
                                    <Text style={styles.label}>
                                        {t('payment.amount')}
                                    </Text>

                                    <Text style={styles.amount}>
                                        {/* {formatCurrency(item.amount)} */}
                                        {formatMoney(item.amount)}
                                    </Text>
                                </View>

                                {item.note && (

                                    <Text style={styles.note}>
                                        {t('payment.note')}: {item.note}
                                    </Text>

                                )}

                                {/* ACTION */}

                                {!isPaid && (

                                    <TouchableOpacity
                                        style={styles.payButton}
                                        onPress={() => handlePaid(item.id)}
                                    >

                                        <Text style={styles.payText}>
                                            {t("payment.markPaid")}
                                        </Text>

                                    </TouchableOpacity>

                                )}

                            </View>

                        </View>

                    );

                }}
            />

        </BaseContent>

    );

};

export default PaymentTab;

const styles = StyleSheet.create({

    row: {
        flexDirection: 'row',
        marginBottom: 20
    },

    timeline: {
        width: 30,
        alignItems: 'center'
    },

    dot: {
        width: 12,
        height: 12,
        borderRadius: 6
    },

    line: {
        width: 2,
        flex: 1,
        backgroundColor: '#e5e7eb',
        marginTop: 4
    },

    card: {
        flex: 1,
        padding: 16,
        borderRadius: 16,
        elevation: 2
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12
    },

    code: {
        fontSize: 16,
        fontWeight: '700'
    },

    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20
    },

    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8
    },

    label: {
        color: '#6b7280'
    },

    value: {
        fontWeight: '600'
    },

    amount: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2563eb'
    },

    note: {
        marginTop: 8,
        fontStyle: 'italic',
        color: '#6b7280'
    },

    payButton: {
        marginTop: 14,
        backgroundColor: '#22c55e',
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center'
    },

    payText: {
        color: '#fff',
        fontWeight: '600'
    }

});