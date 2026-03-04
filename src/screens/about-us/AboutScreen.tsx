import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import HeaderMain from '~/components/layout/base-header/header-main';
import { appColors } from '~/utils/constants/appColors';
import { BaseContent } from '~/components/base-screen/BaseContent';
import { useAppColors } from '~/hooks/useAppColors';

const AboutScreen = () => {
    const { t } = useTranslation();
    const colors = useAppColors();
    return (
        <BaseContent >
            {/* <HeaderMain title={t('about.title')} /> */}

            <View style={styles.container}>
                <Image
                    source={require('~/assets/images/logo/AppLogo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <Text style={[styles.appName, { color: colors.textPrimary }]}>
                    {t('about.appName')}
                </Text>

                <Text style={styles.version}>
                    v1.0.0
                </Text>

                <View style={[styles.card, { backgroundColor: colors.card }]}>
                    <Text style={[styles.text, { color: colors.textPrimary }]}>
                        {t('about.description')}
                    </Text>
                </View>
            </View>
        </BaseContent >
    );
};

export default AboutScreen;

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: appColors.background,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
    },
    logo: {
        width: 350,
        height: 120,
        marginBottom: 12,
    },
    appName: {
        fontSize: 18,
        fontWeight: '700',
        color: appColors.textPrimary,
    },
    version: {
        fontSize: 13,
        color: appColors.textSecondary,
        marginBottom: 20,
    },
    card: {
        backgroundColor: appColors.card,
        borderRadius: 16,
        padding: 16,
        width: '100%',
        shadowColor: appColors.shadow,
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 3,
    },
    text: {
        fontSize: 14,
        lineHeight: 22,
        color: appColors.textPrimary,
        textAlign: 'center',
    },
});
