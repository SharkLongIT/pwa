//#region 
// import React, { useState } from 'react';
// import {
//     View,
//     TouchableOpacity,
//     StyleSheet,
//     ActivityIndicator,
//     KeyboardAvoidingView,
//     Platform,
//     ImageBackground,
//     TouchableWithoutFeedback,
//     Keyboard,
//     Image,
// } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { loginThunk } from '~/thunk/authThunk';
// import { AppDispatch, RootState } from '~/redux/store';
// import BaseScreen from '~/components/base-screen/BaseScreen';
// import { normalize } from '~/helper/responsive';
// import { useTranslation } from 'react-i18next';
// import { Divider, Text, TextInput } from 'react-native-paper';
// import Feather from 'react-native-vector-icons/Feather';

// export default function LoginScreen() {
//     const dispatch = useDispatch<AppDispatch>();
//     const { t } = useTranslation();
//     const { loading } = useSelector((state: RootState) => state.auth);

//     const [userNameOrEmailAddress, setEmail] = useState('admin');
//     const [password, setPassword] = useState('123qwe');
//     const [secure, setSecure] = useState(true);

//     const onLogin = () => {
//         if (!userNameOrEmailAddress || !password) return;

//         dispatch(
//             loginThunk({
//                 userNameOrEmailAddress,
//                 password,
//                 rememberClient: true
//             })
//         );
//     };

//     return (

//         //#region 
//         // <BaseScreen
//         //     containerStyle={styles.container}
//         //     imageBackground={require('~/assets/images/background/Login_2.png')}
//         //     top={true}>
//         //     <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
//         //         <View style={styles.logoContainer}>
//         //             <Image
//         //                 source={require('~/assets/images/logo/AppLogo.png')}
//         //                 style={{ width: normalize(350, 'width'), height: normalize(168) }}
//         //                 resizeMode='contain'
//         //             />
//         //             <Text style={styles.subtitle}>Điền thông tin tài khoản và mật khẩu để đăng nhập</Text>
//         //             <View style={styles.infoRow}>
//         //                 <TextInput
//         //                     style={styles.input}
//         //                     value={userNameOrEmailAddress}
//         //                     onChangeText={setEmail}
//         //                     placeholder="Tên tài khoản"
//         //                     placeholderTextColor="#999"
//         //                 />
//         //             </View>
//         //             <View style={styles.infoRow}>
//         //                 <TextInput
//         //                     style={styles.input}
//         //                     value={password}
//         //                     onChangeText={setPassword}
//         //                     placeholder="Mật khẩu "
//         //                     secureTextEntry={secure}
//         //                     placeholderTextColor="#999"
//         //                 />
//         //                 <TouchableOpacity onPress={() => setSecure(!secure)}>
//         //                     <Feather
//         //                         name={secure ? 'eye-off' : 'eye'}
//         //                         size={22}
//         //                         color="#999"
//         //                     />
//         //                 </TouchableOpacity>
//         //             </View>
//         //             <View style={{ flexDirection: 'row', margin: 10 }}>
//         //                 <TouchableOpacity style={styles.button}
//         //                     onPress={onLogin}
//         //                 >
//         //                     <Text style={styles.buttonText}>Đăng nhập</Text>
//         //                 </TouchableOpacity>
//         //             </View>
//         //         </View>

//         //     </TouchableWithoutFeedback>
//         // </BaseScreen>
//         //#endregion

//     );
// }

// const styles = StyleSheet.create({
//     // container: {
//     //     flex: 1,
//     //     justifyContent: 'center',
//     // },
//     logoContainer: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         gap: 16,
//         marginBottom: 24,
//         marginTop: 14,
//     },
//     safe: {
//         flex: 1,
//     },
//     container: {
//         flex: 1,
//         padding: 20,
//     },

//     logoWrap: {
//         alignItems: 'center',
//         marginVertical: 20,
//     },
//     logo: {
//         fontSize: 18,
//         fontWeight: '700',
//     },

//     card: {
//         backgroundColor: '#fff',
//         borderRadius: 20,
//         padding: 20,
//         shadowColor: '#000',
//         shadowOpacity: 0.08,
//         shadowRadius: 10,
//         elevation: 5,
//     },

//     title: {
//         fontSize: 22,
//         fontWeight: '700',
//         color: '#7C3AED',
//         marginBottom: 6,
//         textAlign: 'center',
//     },
//     subTitle: {
//         fontSize: 13,
//         color: '#6B7280',
//         textAlign: 'center',
//         marginBottom: 16,
//     },

//     socialBtn: {
//         borderWidth: 1,
//         borderColor: '#E5E7EB',
//         paddingVertical: 12,
//         borderRadius: 10,
//         alignItems: 'center',
//         marginBottom: 10,
//     },
//     socialText: {
//         fontSize: 14,
//         fontWeight: '500',
//     },

//     divider: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginVertical: 16,
//     },
//     line: {
//         flex: 1,
//         height: 1,
//         backgroundColor: '#E5E7EB',
//     },
//     or: {
//         marginHorizontal: 10,
//         color: '#9CA3AF',
//         fontSize: 12,
//     },

//     label: {
//         fontSize: 12,
//         color: '#6B7280',
//         marginBottom: 4,
//     },

//     input: {
//         borderWidth: 1,
//         borderColor: '#E5E7EB',
//         borderRadius: 10,
//         paddingHorizontal: 14,
//         paddingVertical: 12,
//         marginBottom: 12,
//         fontSize: 14,
//     },

//     passwordWrap: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         borderWidth: 1,
//         borderColor: '#E5E7EB',
//         borderRadius: 10,
//         paddingHorizontal: 14,
//         marginBottom: 12,
//     },
//     inputPassword: {
//         flex: 1,
//         paddingVertical: 12,
//         fontSize: 14,
//     },
//     eye: {
//         fontSize: 16,
//         color: '#9CA3AF',
//     },

//     optionRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: 16,
//     },

//     rememberRow: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     checkbox: {
//         width: 14,
//         height: 14,
//         borderWidth: 1,
//         borderColor: '#9CA3AF',
//         borderRadius: 4,
//         marginRight: 6,
//     },
//     remember: {
//         fontSize: 12,
//         color: '#6B7280',
//     },

//     forgot: {
//         fontSize: 12,
//         color: '#2563EB',
//         fontWeight: '500',
//     },

//     loginBtn: {
//         backgroundColor: '#2563EB',
//         paddingVertical: 14,
//         borderRadius: 12,
//         alignItems: 'center',
//         marginBottom: 16,
//     },
//     loginText: {
//         color: '#fff',
//         fontSize: 15,
//         fontWeight: '600',
//     },

//     signup: {
//         fontSize: 12,
//         textAlign: 'center',
//         color: '#6B7280',
//     },
//     signupLink: {
//         color: '#2563EB',
//         fontWeight: '600',
//     },
//     // subtitle: {
//     //     fontSize: 14,
//     //     fontWeight: '400',
//     //     marginBottom: 10,
//     //     color: '#808285',
//     //     marginTop: 12
//     // },
//     // infoRow: {
//     //     flexDirection: 'row',
//     //     alignItems: 'center',
//     //     paddingHorizontal: 10,
//     //     borderRadius: 8,
//     //     marginVertical: 8,
//     //     backgroundColor: '#fff',
//     // },
//     // input: {
//     //     height: 50,
//     //     flex: 1,
//     //     backgroundColor: '#fff'
//     // },
//     // button: {
//     //     backgroundColor: '#FFAA34',
//     //     padding: 16,
//     //     borderRadius: 12,
//     //     alignItems: 'center',
//     //     marginTop: 24,
//     //     flex: 1,
//     // },
//     // buttonText: {
//     //     color: '#fff',
//     //     fontWeight: 'bold',
//     //     fontSize: 16
//     // },
//     // loginFaceId: {
//     //     backgroundColor: '#fff',
//     //     padding: 10,
//     //     borderRadius: 12,
//     //     alignItems: 'center',
//     //     justifyContent: 'center',
//     //     marginTop: 24,
//     //     borderWidth: 1,
//     //     borderColor: '#ddd',
//     // },
// });
//#endregion

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { use, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    Pressable,
    ActivityIndicator,
    Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch } from 'react-redux';
import { FacebookIcon, FaceIdIcon, GoogleIcon } from '~/assets/icons';
import BaseScreen from '~/components/base-screen/BaseScreen';
import GradientText from '~/components/gardient-text/GradientText';
import LanguageDropdown from '~/components/language-base/LanguageDropdown';
import { normalize } from '~/helper/responsive';
import i18n from '~/i18n/i18n';
import { AuthParamList } from '~/navigation/AuthNavigator';
import { AppDispatch } from '~/redux/store';
import { loginThunk } from '~/thunk/authThunk';
import RememberMe from './RememberMe';
import { showToast } from '~/utils/toast';
import { handleError } from '~/components/base-error/base-error';
import { FaceID } from 'react-native-biometrics';
import { handleLoginWithFaceId } from '~/hooks/useLogin';

const LoginScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<AuthParamList>>();

    const [userNameOrEmailAddress, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(true);
    const [secure, setSecure] = useState(true);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const { t } = useTranslation();

    // const onLogin = () => {
    //     setLoading(true);
    //     if (!userNameOrEmailAddress || !password) return;

    //     dispatch(
    //         loginThunk({
    //             userNameOrEmailAddress,
    //             password,
    //             rememberClient: true
    //         })
    //     );

    // };
    const onLogin = async () => {
        if (!userNameOrEmailAddress || !password) {
            // Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
            showToast("error", i18n.t("login.pleaseEnterAllInfo") || "Vui lòng nhập đầy đủ thông tin", '');
            return;
        }

        try {
            setLoading(true);

            await dispatch(
                loginThunk({
                    userNameOrEmailAddress,
                    password,
                    rememberClient: rememberMe,
                })
            ).unwrap();
            // if (rememberMe) {
            //     dispatch(setRememberMe(true));
            // }

        } catch (err: any) {
            console.log("Login error:", err);
            handleError(err, { showAlert: false });
        } finally {
            setLoading(false);
        }
    };
    // const handLoginWithFaceId = async () => {
    //     // try {
    //     //     const resultObject = await FaceID.isSensorAvailable();

    //     //     if (resultObject.available) {
    //     //         const result = await FaceID.simplePrompt({ promptMessage: 'Xác thực bằng Face ID' });

    //     //         if (result.success) {
    //     //             showToast("success", "Đăng nhập thành công bằng Face ID", '');
    //     //             // Thực hiện hành động sau khi xác thực thành công, ví dụ: điều hướng đến màn hình chính
    //     //         } else {
    //     //             showToast("error", "Xác thực thất bại hoặc bị hủy", '');
    //     //         }
    //     //     } else {
    //     //         showToast("error", "Thiết bị không hỗ trợ Face ID", '');
    //     //     }
    //     // } catch (error) {
    //     //     console.log("Face ID error:", error);
    //     //     showToast("error", "Đã xảy ra lỗi khi sử dụng Face ID", '');
    //     // }
    // };



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
                <GradientText
                    text={t("login.getStarted")}
                    style={styles.title}
                />

                <Text style={styles.subTitle}>
                    {t("login.createAccountOrLogin")}
                </Text>

                {/* SOCIAL */}
                <TouchableOpacity style={styles.socialBtn}>
                    <GoogleIcon />
                    <Text style={styles.socialText}>{t("login.signInWithGoogle")}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.socialBtn}>
                    <FacebookIcon />
                    <Text style={styles.socialText}>{t("login.signInWithFacebook")}</Text>
                </TouchableOpacity>

                <View style={styles.divider}>
                    <View style={styles.line} />
                    <Text style={styles.or}>{t("login.or")}</Text>
                    <View style={styles.line} />
                </View>

                {/* EMAIL */}
                <Text style={styles.label}>{t("login.email")}</Text>
                <TextInput
                    value={userNameOrEmailAddress}
                    onChangeText={setEmail}
                    style={styles.input}
                    placeholder={t("login.email")}
                    placeholderTextColor="#9CA3AF"
                />

                {/* PASSWORD */}
                <Text style={styles.label}>{t("login.password")}</Text>
                <View style={styles.passwordWrap}>
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        style={styles.inputPassword}
                        secureTextEntry={secure}
                        placeholder={t("login.password")}
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

                {/* OPTIONS */}
                <View style={styles.optionRow}>
                    {/* <View style={styles.rememberRow}>
                        <View style={styles.checkbox} />
                        <Text style={styles.remember}>{t("login.rememberMe")}</Text>
                    </View> */}
                    {/* <RememberMe
                        value={rememberMe}
                        onChange={setRememberMe}
                        label={t('login.rememberMe')}
                    /> */}

                    <Text style={styles.forgot}>{t("login.forgotPassword")}</Text>
                </View>

                <TouchableOpacity
                    style={[
                        styles.loginBtn,
                        loading && { opacity: 0.7 }
                    ]}
                    onPress={onLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.loginText}>{t("login.login")}</Text>
                    )}
                </TouchableOpacity>
                <View style={styles.signup}>
                    <Text style={styles.signupText}>
                        {t("login.dontHaveAccount")}{' '}
                    </Text>
                    <Pressable onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.signupLink}>
                            {t("login.signUp")}
                        </Text>
                    </Pressable>
                </View>
                <View style={styles.iconWrapper}>
                    <FaceIdIcon width={35} height={35} style={styles.faceIdIcon} onPress={handleLoginWithFaceId} />
                </View>
            </View>
        </BaseScreen>
    );
};

export default LoginScreen;

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
        // justifyContent: 'space-between',
        justifyContent: 'flex-end',
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
    },
    loginText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
    },
    signup: {
        flexDirection: 'row',
        justifyContent: 'center',
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
    iconWrapper: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#EEF2FF',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 10,

        // iOS shadow
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },

        // Android shadow
        elevation: 4,

    },
    faceIdIcon: {
        // width: 30,
        // height: 30,
        justifyContent: 'center',
        alignItems: 'center',

    },
});

