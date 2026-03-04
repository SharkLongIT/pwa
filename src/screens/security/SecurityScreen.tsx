import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Switch,
    Pressable,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { MainParamList } from '~/navigation/MainNavigator';
import { appColors } from '~/utils/constants/appColors';
import { BaseContent } from '~/components/base-screen/BaseContent';
import { useAppColors } from '~/hooks/useAppColors';
import ReactNativeBiometrics from 'react-native-biometrics';
import { useAppDispatch } from '~/redux/hooks';
import { handleLogout } from '~/thunk/authThunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SecurityScreen = () => {
    const navigation =
        useNavigation<NativeStackNavigationProp<MainParamList>>();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [twoFA, setTwoFA] = React.useState(false);
    const [biometric, setBiometric] = React.useState(false);
    const rnBiometrics = new ReactNativeBiometrics();
    const BIOMETRIC_KEY = 'SECURITY_BIOMETRIC';


    useEffect(() => {
        const loadBiometric = async () => {
            const value = await AsyncStorage.getItem(BIOMETRIC_KEY);
            setBiometric(value === 'true');
        };

        loadBiometric();
    }, []);

    const handleBiometricToggle = async (value: boolean) => {
        if (!value) {
            setBiometric(false);
            await AsyncStorage.setItem(BIOMETRIC_KEY, 'false');
            return;
        }

        try {
            const { available } = await rnBiometrics.isSensorAvailable();

            if (!available) {
                Alert.alert('Thiết bị không hỗ trợ');
                return;
            }

            const { success } = await rnBiometrics.simplePrompt({
                promptMessage: 'Xác thực để bật sinh trắc học',
            });

            if (success) {
                setBiometric(true);
                await AsyncStorage.setItem(BIOMETRIC_KEY, 'true');
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <BaseContent>
            {/* <HeaderMain title={t('security.title')} /> */}
            <View style={{ padding: 16 }}>
                {/* PASSWORD */}
                <Section title={t('security.password')}>
                    <MenuItem
                        title={t('security.changePassword')}
                        onPress={() => navigation.navigate('ChangePasswordScreen')}
                    />
                </Section>

                {/* AUTH */}
                <Section title={t('security.authentication')}>
                    <SwitchItem
                        title={t('security.twoFA')}
                        value={twoFA}
                        onValueChange={setTwoFA}
                    />
                    <SwitchItem
                        title={t('security.biometric')}
                        value={biometric}
                        onValueChange={handleBiometricToggle}
                    />
                </Section>

                {/* SESSION */}
                <Section title={t('security.sessions')}>
                    <MenuItem
                        title={t('security.activeSessions')}
                        onPress={() => navigation.navigate('ActiveSessions')}
                    />
                </Section>

                {/* DANGER */}
                <Section>
                    <MenuItem
                        title={t('security.logoutAll')}
                        danger
                        onPress={() => {
                            Alert.alert(
                                t('security.logoutAll'),
                                t('security.logoutAllConfirm'),
                                [
                                    {
                                        text: t('common.cancel'),
                                        style: 'cancel',
                                    },
                                    {
                                        text: t('common.logout'),
                                        style: 'destructive',
                                        onPress: () => {
                                            // await logoutAllSessions(); 
                                            dispatch(handleLogout());
                                        },
                                    },
                                ],
                            );
                        }
                        }
                    />
                </Section>

            </View>
        </BaseContent>
    );
};

export default SecurityScreen;

/* -------------------- COMPONENTS -------------------- */

const Section = ({ title, children }: any) => (
    <View style={styles.section}>
        {title && <Text style={styles.sectionTitle}>{title}</Text>}
        <View style={styles.card}>{children}</View>
    </View>
);

const MenuItem = ({ title, onPress, danger }: any) => {
    const colors = useAppColors();
    return (
        <Pressable
            onPress={onPress}
            android_ripple={{ color: colors.divider }}
            style={({ pressed }) => [
                styles.item,
                {
                    backgroundColor: pressed
                        ? colors.cardPressed ?? colors.divider
                        : colors.card,
                },
            ]}
        >
            <Text
                style={[
                    styles.itemText,
                    { color: colors.textPrimary },
                    danger && styles.dangerText,
                ]}
            >
                {title}
            </Text>

            <Text style={[styles.chevron, { color: colors.textSecondary }]}>›</Text>
        </Pressable>
    )
};


const SwitchItem = ({ title, value, onValueChange }: any) => {
    const colors = useAppColors();
    return (

        <View style={[styles.item, { backgroundColor: colors.card }]}>
            <Text style={[styles.itemText, { color: colors.textPrimary }]}>{title}</Text>
            <Switch
                value={value}
                onValueChange={onValueChange}
                trackColor={{ false: '#E5E7EB', true: appColors.primary }}
            />
        </View>
    )
}

/* -------------------- STYLES -------------------- */

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },



    section: {
        marginBottom: 24,
    },

    sectionTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: '#6B7280',
        marginBottom: 8,
        marginLeft: 4,
        textTransform: 'uppercase',
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 18,
        borderBottomWidth: 0.5,
        borderBottomColor: '#EEE',
    },

    itemText: {
        fontSize: 15,
        color: '#111',
    },

    dangerText: {
        color: appColors.error || '#E53935',
        fontWeight: '600',
    },

    chevron: {
        fontSize: 22,
        color: '#D1D5DB',
    },
});
