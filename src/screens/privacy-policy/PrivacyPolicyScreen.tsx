import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import HeaderMain from '~/components/layout/base-header/header-main';
import { appColors } from '~/utils/constants/appColors';
import { BaseContent } from '~/components/base-screen/BaseContent';
import { useAppColors } from '~/hooks/useAppColors';

const PrivacyPolicyScreen = () => {
    const { t } = useTranslation();
    const colors = useAppColors();
    return (
        <BaseContent>
            {/* <HeaderMain title={t('privacy.title')} /> */}

            <ScrollView contentContainerStyle={styles.container}>
                <View style={[styles.card, { backgroundColor: colors.card }]}>
                    <Text style={[styles.text, { color: colors.textPrimary }]}>
                        {t('privacy.content')}
                    </Text>
                </View>
            </ScrollView>
        </BaseContent>
    );
};

export default PrivacyPolicyScreen;

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: appColors.background,
    },
    container: {
        padding: 16,
    },
    card: {
        backgroundColor: appColors.card,
        borderRadius: 16,
        padding: 16,
        shadowColor: appColors.shadow,
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 3,
    },
    text: {
        fontSize: 14,
        lineHeight: 22,
        color: appColors.textPrimary,
    },
});
