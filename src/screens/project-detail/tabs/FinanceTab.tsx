import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import projectFe from '~/api/projectType.api';
import { formatCurrency } from '~/utils/format/formatCurrency';
import { useAppColors } from '~/hooks/useAppColors';
import AnimatedProgressBar from '~/components/animated-process/AnimatedProgressBar';
import { useProject } from '../ProjectContext';

const FinanceTab = () => {
    const colors = useAppColors();
    const project = useProject();

    const costProgress = useMemo(() => {
        if (!project?.costPlan || !project?.cost) return 0;
        return Math.min((project.cost / project.costPlan) * 100, 100);
    }, [project]);

    if (!project) return null;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={[styles.card, { backgroundColor: colors.card }]}>
                <Text style={styles.label}>Cost</Text>
                <Text style={styles.value}>{formatCurrency(project.cost)}</Text>

                <Text style={styles.label}>Cost Plan</Text>
                <Text style={styles.value}>{formatCurrency(project.costPlan)}</Text>

                <Text style={styles.label}>Profit Plan</Text>
                <Text style={styles.value}>{formatCurrency(project.profitPlan)}</Text>

                {/* <AnimatedProgressBar
                    percent={costProgress}
                    color={costProgress > 100 ? '#DC2626' : '#22C55E'}
                /> */}
            </View>
        </ScrollView>
    );
};

export default FinanceTab;

const styles = StyleSheet.create({
    container: { padding: 16 },
    card: {
        borderRadius: 12,
        padding: 16,
    },
    label: { color: '#64748B', marginTop: 8 },
    value: { fontWeight: 'bold', marginBottom: 6 },
});