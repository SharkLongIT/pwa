import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { use, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    Pressable,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch } from 'react-redux';
import { ArrowLeftIcon, FacebookIcon, GoogleIcon } from '~/assets/icons';
import BaseScreen from '~/components/base-screen/BaseScreen';
import GradientText from '~/components/gardient-text/GradientText';
import { normalize } from '~/helper/responsive';
import { AuthParamList } from '~/navigation/AuthNavigator';
import { AppDispatch } from '~/redux/store';
import { loginThunk } from '~/thunk/authThunk';
import PhoneInput from 'react-native-phone-number-input';
import DatePickerField from '~/components/date-picker/DatePickerField';
import { useTranslation } from 'react-i18next';
import LanguageDropdown from '~/components/language-base/LanguageDropdown';

const SignUpScreen = () => {
    const [userNameOrEmailAddress, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [secure, setSecure] = useState(true);
    const navigation = useNavigation<NativeStackNavigationProp<AuthParamList>>();
    const [openDate, setOpenDate] = useState(false);
    const [birthDate, setBirthDate] = useState<Date | null>(null);

    const phoneInput = useRef<PhoneInput>(null);
    const [phone, setPhone] = useState('');
    const { t } = useTranslation();

    const dispatch = useDispatch<AppDispatch>();
    const [date, setDate] = useState(new Date())
    const onLogin = () => {
        if (!userNameOrEmailAddress || !password) return;

        dispatch(
            loginThunk({
                userNameOrEmailAddress,
                password,
                rememberClient: true
            })
        );
    };

    return (
        <BaseScreen containerStyle={styles.container}
            imageBackground={require('~/assets/images/background/Login_2.png')}
            top={true}>
            <View style={styles.flags}>
                <LanguageDropdown />
            </View>
            {/* LOGO */}
            <View style={styles.logoWrap}>
                {/* <Text style={styles.logo}></Text> */}
                <Image
                    source={require('~/assets/images/logo/rnCore-Logo.png')}
                    style={{ width: normalize(200, 'width'), height: normalize(100) }}
                    resizeMode='contain'
                />
            </View>

            {/* CARD */}
            <View style={styles.card}>
                <Pressable onPress={() => navigation.goBack()}>
                    <ArrowLeftIcon />
                </Pressable>


                <GradientText
                    text={t("signup.createAccount")}
                    style={styles.title}
                />

                <View style={styles.signup}>
                    <Text style={styles.signupText}>
                        {t("signup.alreadyHaveAccount")}{' '}
                    </Text>
                    <Pressable onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.signupLink}>
                            {t("signup.login")}
                        </Text>
                    </Pressable>
                </View>


                <View style={{ flexDirection: 'row', gap: 5 }}>
                    <View style={{ width: '49%' }}>
                        <Text style={styles.label}>{t("signup.firstName")}</Text>
                        <TextInput
                            value={userNameOrEmailAddress}
                            onChangeText={setEmail}
                            style={styles.input}
                            placeholder={t("signup.firstNamePlaceholder")}
                            placeholderTextColor="#9CA3AF"
                        />

                    </View>
                    <View style={{ width: '50%' }}>
                        <Text style={styles.label}>{t("signup.lastName")}</Text>
                        <TextInput
                            value={userNameOrEmailAddress}
                            onChangeText={setEmail}
                            style={styles.input}
                            placeholder={t("signup.lastNamePlaceholder")}
                            placeholderTextColor="#9CA3AF"
                        />
                    </View>
                </View>


                {/* EMAIL */}
                <Text style={styles.label}>{t("signup.email")}</Text>
                <TextInput
                    value={userNameOrEmailAddress}
                    onChangeText={setEmail}
                    style={styles.input}
                    placeholder={t("signup.emailPlaceholder")}
                    placeholderTextColor="#9CA3AF"
                />

                {/* EMAIL */}
                <Text style={styles.label}>{t("signup.birthDate")}</Text>
                <DatePickerField
                    label={t("signup.choseBirthDate")}
                    value={birthDate}
                    onChange={setBirthDate}
                />
                <Text style={[styles.label, { marginTop: 10 }]}>{t("signup.phoneNumber")}</Text>

                <View style={styles.phoneWrap}>
                    <PhoneInput
                        ref={phoneInput}
                        defaultValue={phone}
                        defaultCode="VN"
                        layout="first"
                        onChangeFormattedText={(text) => {
                            setPhone(text);
                        }}
                        containerStyle={styles.phoneContainer}
                        textContainerStyle={styles.phoneTextContainer}
                        textInputStyle={styles.phoneInput}
                        codeTextStyle={{ fontSize: 14 }}
                        placeholder={t("signup.enterphoneNumber")}
                        // countryPickerProps={{ renderFlagButton: false }}
                        countryPickerProps={{ renderFlagButton: undefined }}
                    />

                </View>


                {/* PASSWORD */}
                <Text style={styles.label}>{t("signup.password")}</Text>
                <View style={styles.passwordWrap}>
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        style={styles.inputPassword}
                        secureTextEntry={secure}
                        placeholder={t("signup.passwordPlaceholder")}
                        placeholderTextColor="#9CA3AF"
                    />
                    <TouchableOpacity onPress={() => setSecure(!secure)}>
                        <Feather
                            name={secure ? 'eye-off' : 'eye'}
                            size={22}
                            color="#999"
                        />
                    </TouchableOpacity>
                </View>

                {/* Register */}
                <TouchableOpacity style={styles.loginBtn} onPress={onLogin}>
                    <Text style={styles.loginText}>{t("signup.register")}</Text>
                </TouchableOpacity>

            </View>
        </BaseScreen>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    safe: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    flags: {
        // position: 'absolute',
        // top: 16,        
        // right: 16,
        zIndex: 20,
        alignItems: 'flex-end',
    },
    logoWrap: {
        alignItems: 'center',
    },
    logo: {
        fontSize: 18,
        fontWeight: '700',
    },

    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 5,
    },

    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#7C3AED',
        marginBottom: 6,
        textAlign: 'center',
    },
    subTitle: {
        fontSize: 13,
        color: '#6B7280',
        textAlign: 'center',
        marginBottom: 16,
    },

    socialBtn: {
        borderWidth: 1,
        borderColor: '#E5E7EB',
        paddingVertical: 12,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'center'
    },
    socialText: {
        fontSize: 14,
        fontWeight: '500',
    },

    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#E5E7EB',
    },
    or: {
        marginHorizontal: 10,
        color: '#9CA3AF',
        fontSize: 12,
    },

    label: {
        fontSize: 12,
        color: '#6B7280',
        marginBottom: 4,
    },

    input: {
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
        marginBottom: 12,
        fontSize: 14,
    },

    passwordWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 10,
        paddingHorizontal: 14,
        marginBottom: 12,
    },
    inputPassword: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 14,
    },
    eye: {
        fontSize: 16,
        color: '#9CA3AF',
    },

    optionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },

    rememberRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 14,
        height: 14,
        borderWidth: 1,
        borderColor: '#9CA3AF',
        borderRadius: 4,
        marginRight: 6,
    },
    remember: {
        fontSize: 12,
        color: '#6B7280',
    },

    forgot: {
        fontSize: 12,
        color: '#2563EB',
        fontWeight: '500',
    },

    loginBtn: {
        backgroundColor: '#2563EB',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 16,
        marginTop: 10
    },
    loginText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
    },
    signup: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
        gap: 4
    },
    signupText: {
        fontSize: 12,
        textAlign: 'center',
        color: '#6B7280',
    },
    signupLink: {
        color: '#2563EB',
        fontWeight: '600',
        fontSize: 12
    },
    phoneWrap: {
        marginBottom: 14,
    },

    phoneContainer: {
        width: '100%',
        height: 52,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },

    phoneTextContainer: {
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
        backgroundColor: '#fff',
        paddingVertical: 0,
    },

    phoneInput: {
        height: 52,
        fontSize: 14,
    },
});

