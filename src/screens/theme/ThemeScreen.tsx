import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { appColors } from '~/utils/constants/appColors';
import { BaseContent } from '~/components/base-screen/BaseContent';
import { useTheme } from '~/context/ThemeContext';
import { useAppColors } from '~/hooks/useAppColors';

const ThemeScreen = () => {
    const { t } = useTranslation();
    const { mode, setMode } = useTheme();
    const colors = useAppColors();
    return (
        <BaseContent>

            <View style={{ padding: 16 }}>
                <Text style={styles.desc}>
                    {t('theme.description')}
                </Text>

                <View style={[styles.card, { backgroundColor: colors.card }]}>
                    <ThemeItem
                        label={t('theme.system')}
                        value="system"
                        active={mode === 'system'}
                        onPress={setMode}
                    />

                    <ThemeItem
                        label={t('theme.light')}
                        value="light"
                        active={mode === 'light'}
                        onPress={setMode}
                    />

                    <ThemeItem
                        label={t('theme.dark')}
                        value="dark"
                        active={mode === 'dark'}
                        onPress={setMode}
                    />
                </View>
            </View>
        </BaseContent>
    );
};

export default ThemeScreen;

/* -------------------- ITEM -------------------- */

const ThemeItem = ({ label, value, active, onPress }: any) => {
    const colors = useAppColors();
    return (
        <TouchableOpacity
            style={[
                styles.item,
                active && styles.itemActive,
            ]}
            onPress={() => onPress(value)}
        >
            <Text
                style={[
                    styles.itemText,
                    active && styles.itemTextActive,
                    { color: colors.textPrimary },
                ]}
            >
                {label}
            </Text>

            {active && <View style={styles.dot} />}
        </TouchableOpacity>
    );
};

/* -------------------- STYLES -------------------- */

const styles = StyleSheet.create({

    desc: {
        fontSize: 13,
        color: '#6B7280',
        marginBottom: 12,
        paddingHorizontal: 4,
    },

    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 6,
    },

    item: {
        paddingVertical: 18,
        paddingHorizontal: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: '#EEE',
    },

    itemActive: {
        backgroundColor: appColors.primary + '10',
    },

    itemText: {
        fontSize: 15,
        color: '#111',
    },

    itemTextActive: {
        color: appColors.primary,
        fontWeight: '600',
    },

    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: appColors.primary,
    },
});
