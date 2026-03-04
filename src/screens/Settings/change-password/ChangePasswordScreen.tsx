import React, { useEffect, useState } from 'react';
// import styles from './styles';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BaseContent } from '~/components/base-screen/BaseContent';
import { appColors } from '~/utils/constants/appColors';
import Feather from 'react-native-vector-icons/Feather';
// import { changePassword } from '~/services/authService';
import Toast from 'react-native-toast-message';
import HeaderMain from '~/components/layout/base-header/header-main';
import { t } from 'i18next';
import { useAppColors } from '~/hooks/useAppColors';
import { showToast } from '~/utils/toast';

const ChangePasswordScreen = () => {
    const colors = useAppColors();
    const [secure, setSecure] = useState(true);
    const [secureNew, setSecureNew] = useState(true);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const hasMinimumLength = newPassword.length >= 6;
    const hasNumber = /\d/.test(newPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
    const hasLetter = /[a-zA-Z]/.test(newPassword);

    const renderRequirement = (text: string, condition: boolean) => (
        <View style={localStyles.requirementRow}>
            <Feather
                name={condition ? 'check-circle' : 'x-circle'}
                size={18}
                color={condition ? 'green' : '#ccc'}
                style={{ marginRight: 6 }}
            />
            <Text style={[styles.requirements, { color: condition ? 'green' : colors.textSecondary }]}>
                {text}
            </Text>
        </View>
    );

    const allValid = hasMinimumLength && hasNumber && hasSpecialChar && hasLetter;

    const handleContinue = async () => {
        if (allValid) {
            try {
                const data = {
                    currentPassword: password,
                    newPassword: newPassword,
                };
                // await changePassword(data);
                showToast('success', t('password.success'), t('password.pleaseLogin'), 'top')
                // navigation.goBack();
                await AsyncStorage.removeItem('access_token');
                //await logout();
            } catch (err: any) {
                if (err.response?.data?.error) {
                    //   Toast.show({
                    //     type: 'error',
                    //     text1: err.response.data.error.message,
                    //   });
                    showToast('error', err.response.data.error.message, '', 'top')
                } else {
                    //   Toast.show({
                    //     type: 'error',
                    //     text1: 'Lỗi đổi mật khẩu, Vui lòng thử lại',
                    //   });
                    showToast('error', t('password.error'), '', 'top')

                }
            }
        };
    }

    return (
        <BaseContent>
            {/* Header */}
            {/* <HeaderMain title={t('settings.changePassword')} /> */}
            <View style={{ padding: 16 }}>
                <Text style={[localStyles.label, { color: colors.textPrimary }]}>{t('settings.currentPassword')}</Text>
                <View style={[styles.infoRow, { backgroundColor: colors.inputBackground }]}>
                    <Feather name="lock" size={22} color="#999" style={styles.icon} />
                    <TextInput
                        style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.textPrimary }]}
                        value={password}
                        onChangeText={setPassword}
                        placeholder={t('settings.currentPasswordPlaceholder')}
                        secureTextEntry={secure}
                        placeholderTextColor="#999"
                    />
                    <TouchableOpacity onPress={() => setSecure(!secure)}>
                        <Feather
                            name={secure ? 'eye-off' : 'eye'}
                            size={22}
                            color="#999"
                        />
                    </TouchableOpacity>
                </View>
                <Text style={[localStyles.label, { color: colors.textPrimary }]}>{t('settings.newPassword')}</Text>
                <View style={[styles.infoRow, { backgroundColor: colors.inputBackground }]}>
                    <Feather name="lock" size={22} color="#999" style={styles.icon} />
                    <TextInput
                        style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.textPrimary }]}
                        value={newPassword}
                        onChangeText={setNewPassword}
                        placeholder={t('settings.newPasswordPlaceholder')}
                        secureTextEntry={secureNew}
                        placeholderTextColor="#999"
                    />
                    <TouchableOpacity onPress={() => setSecureNew(!secureNew)}>
                        <Feather
                            name={secureNew ? 'eye-off' : 'eye'}
                            size={22}
                            color="#999"
                        />
                    </TouchableOpacity>
                </View>

                <Text style={[styles.requirements, { color: colors.textSecondary }]}>{t('settings.passwordRequirements')}</Text>
                {renderRequirement(t('settings.minimumLength'), hasMinimumLength)}
                {renderRequirement(t('settings.hasNumber'), hasNumber)}
                {renderRequirement(t('settings.hasSpecialChar'), hasSpecialChar)}
                {renderRequirement(t('settings.hasLetter'), hasLetter)}
                {/* <Text style={styles.value}>Quên mật khẩu?</Text> */}

            </View>
            <View style={styles.fixedButtonContainer}>
                <TouchableOpacity
                    style={[
                        styles.saveButton,
                        !allValid && { backgroundColor: appColors.bg_disabled }
                    ]}
                    disabled={!allValid}
                    onPress={handleContinue}
                >
                    <Text style={styles.saveButtonText}>{t('common.save')}</Text>
                </TouchableOpacity>
            </View>
        </BaseContent >
    );
};

const localStyles = StyleSheet.create({
    requirementRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 12,
        alignItems: 'center'
    },
    modalText: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20,
        color: '#58595b'
    },
    modalTextSuccess: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 5,
        color: '#3cac41',
        fontWeight: 'bold'
    },
    modalButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#FF3C5F',
        borderRadius: 6
    },
    modalButtonText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
});
const styles = StyleSheet.create({

    header: {
        height: 60,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    headerTitle: { fontSize: 18, fontWeight: "bold", color: "#000" },
    content: {
        //padding: 20,
        // backgroundColor: '#f8f8f8'
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 20
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#ccc',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: 'black',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        borderRadius: 8,
        marginVertical: 10,
        backgroundColor: '#f8f8f8',
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,

    },
    label: {
        color: '#87898c',
        fontWeight: '500',
    },
    value: {
        color: '#58595b',
        fontWeight: '500',
        marginTop: 15,
        marginLeft: 10,
        textAlign: 'center'
    },
    valueEmail: {
        color: '#87898c',
        fontWeight: '500',
        fontSize: 16,
        marginBottom: 10,
    },
    divider: {
        height: 1,
        backgroundColor: '#f3f3f3',
        width: '100%',
        marginVertical: 10,
    },
    saveButton: {
        backgroundColor: appColors.bg_hightlight,
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },

    saveButtonText: {
        color: '#fff',
        fontWeight: '500',
        fontSize: 16,
    },
    fixedButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        borderColor: '#eee',
    },
    requirements: {
        fontSize: 14,
        color: '#58595b',
    }
});
export default ChangePasswordScreen;
