import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { formatCurrency, formatDate } from '~/utils/format/formatCurrency';
import { getStatusText } from '~/utils/helper/status';
import { useAppColors } from '~/hooks/useAppColors';
import AnimatedProgressBar from '~/components/animated-process/AnimatedProgressBar';
import { useProject } from '../ProjectContext';
import { BaseContent } from '~/components/base-screen/BaseContent';

const OverviewTab = () => {
    const { t } = useTranslation();
    const colors = useAppColors();
    const project = useProject();

    const calculateTimeProgress = () => {
        if (!project?.startDate || !project?.endDate) return 0;

        const now = new Date().getTime();
        const start = new Date(project.startDate).getTime();
        const end = new Date(project.endDate).getTime();

        if (end <= start) return 0;

        const percent = ((now - start) / (end - start)) * 100;
        return Math.min(Math.max(percent, 0), 100);
    };
    const timeProgress = calculateTimeProgress();

    if (!project) return null;

    return (
        <BaseContent>
            <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
                <View style={[styles.heroCard, { backgroundColor: colors.primary }]}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.heroCode}>
                            {project?.projectCode}
                        </Text>

                        <Text style={styles.heroDate}>
                            {formatDate(project?.startDate)} - {formatDate(project?.endDate)}
                        </Text>
                        <Text style={styles.heroDate}>
                            {/* {project.cost} */}
                            {t("project.cost")}:{" "}
                            {formatCurrency(project.cost)}
                        </Text>
                    </View>

                    <View style={styles.heroStatus}>
                        <Text style={styles.heroStatusText}>
                            {getStatusText(project?.status, t)}
                        </Text>
                    </View>
                </View>
                <View style={styles.kpiRow}>
                    <View style={[styles.kpiCard, { backgroundColor: colors.card }]}>
                        <Text style={[styles.kpiLabel, { color: colors.textSecondary }]}>{t('project.costPlan')}</Text>
                        <Text style={[styles.kpiValue, { color: colors.textPrimary }]}>
                            {formatCurrency(project?.costPlan)}
                        </Text>
                    </View>

                    <View style={[styles.kpiCard, { backgroundColor: colors.card }]}>
                        <Text style={[styles.kpiLabel, { color: colors.textSecondary }]}>{t('project.profitPlan')}</Text>
                        <Text style={styles.kpiValueGreen}>
                            {formatCurrency(project?.profitPlan)}
                        </Text>
                    </View>
                </View>
                <View style={[styles.card, { backgroundColor: colors.card }]}>
                    <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                        {t('project.timeline')}
                    </Text>

                    <AnimatedProgressBar percent={timeProgress} color="#3B82F6" />

                    <View style={styles.timelineFooter}>
                        <Text style={styles.percent}>
                            {timeProgress.toFixed(1)}%
                        </Text>
                        <Text style={styles.slotText}>
                            {t('project.slotPayment')}: {project?.slotPayment}
                        </Text>
                    </View>
                </View>
                <View style={[styles.card, { backgroundColor: colors.card }]}>
                    <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                        {t('project.type')}
                    </Text>

                    <View style={styles.grid}>
                        <View style={styles.gridItem}>
                            <Text style={[styles.gridLabel, { color: colors.textSecondary }]}>{t('project.code')}</Text>
                            <Text style={[styles.gridValue, { color: colors.textPrimary }]}>
                                {project?.projectType?.code}
                            </Text>
                        </View>

                        <View style={styles.gridItem}>
                            <Text style={[styles.gridLabel, { color: colors.textSecondary }]}>{t('project.costRate')}</Text>
                            <Text style={[styles.gridValue, { color: colors.textPrimary }]}>
                                {project?.projectType?.costRate} %
                            </Text>
                        </View>

                        <View style={styles.gridItem}>
                            <Text style={[styles.gridLabel, { color: colors.textSecondary }]}>{t('project.profitRate')}</Text>
                            <Text style={[styles.gridValue, { color: colors.textPrimary }]}>
                                {project?.projectType?.profitRate} %
                            </Text>
                        </View>

                        <View style={styles.gridItem}>
                            <Text style={[styles.gridLabel, { color: colors.textSecondary }]}>{t('project.marginRate')}</Text>
                            <Text style={[styles.gridValue, { color: colors.textPrimary }]}>
                                {project?.projectType?.marginRate} %
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </BaseContent>

    );
};

export default OverviewTab;

const styles = StyleSheet.create({
    container: { padding: 16 },

    heroCard: {
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },

    heroCode: {
        fontSize: 22,
        fontWeight: '800',
        color: '#fff',
    },

    heroDate: {
        marginTop: 6,
        color: '#e5e7eb',
    },

    heroStatus: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },

    heroStatusText: {
        color: '#fff',
        fontWeight: '600',
    },

    kpiRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },

    kpiCard: {
        flex: 1,
        padding: 16,
        borderRadius: 16,
        marginHorizontal: 4,
    },

    kpiLabel: {
        color: '#6b7280',
        marginBottom: 8,
    },

    kpiValue: {
        fontSize: 18,
        fontWeight: '700',
    },

    kpiValueGreen: {
        fontSize: 18,
        fontWeight: '700',
        color: '#16a34a',
    },

    card: {
        padding: 18,
        borderRadius: 18,
        marginBottom: 20,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 14,
    },

    timelineFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },

    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },

    gridItem: {
        width: '48%',
        marginBottom: 16,
    },

    gridLabel: {
        color: '#6b7280',
        fontSize: 13,
    },

    gridValue: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 4,
    },
    percent: {
        fontSize: 14,
        fontWeight: '600',
        color: '#3B82F6',
    },

    slotText: {
        fontSize: 14,
        color: '#6b7280',
    }
});