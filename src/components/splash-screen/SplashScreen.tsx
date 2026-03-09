import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppColors } from '~/hooks/useAppColors';

const SplashScreen = () => {
    const colors = useAppColors();

    return (
        <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
            <View style={styles.container}>
                {/* LOGO */}
                <View style={styles.center}>
                    <Image
                        source={require('~/assets/images/logo/rnCore-Logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />

                    <Text style={[styles.appName, { color: colors.textPrimary }]}>
                        PWA Kit
                    </Text>

                    <Text style={[styles.tagline, { color: colors.textSecondary }]}>
                        Build fast. Build clean.
                    </Text>
                </View>

                {/* LOADING */}
                <View style={styles.loading}>
                    <ActivityIndicator size="small" color={colors.primary} />
                </View>

                {/* FOOTER */}
                <Text style={[styles.footer, { color: colors.textSecondary }]}>
                    © 2026 BBK
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default SplashScreen;
const styles = StyleSheet.create({
    safe: {
        flex: 1,
    },

    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    logo: {
        width: 96,
        height: 96,
        marginBottom: 16,
    },

    appName: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 6,
    },

    tagline: {
        fontSize: 14,
        opacity: 0.8,
    },

    loading: {
        marginBottom: 24,
    },

    footer: {
        fontSize: 12,
        opacity: 0.6,
    },
});
