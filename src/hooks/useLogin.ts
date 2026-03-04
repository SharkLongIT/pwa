import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeBiometrics from 'react-native-biometrics';
import { showToast } from '~/utils/toast';
import * as Keychain from 'react-native-keychain';
import { useAppDispatch } from '~/redux/hooks';

const rnBiometrics = new ReactNativeBiometrics();

export const handleLoginWithFaceId = async () => {
    const dispatch = useAppDispatch();
    try {
        // Kiểm tra biometric đã bật chưa
        const biometricEnabled = await AsyncStorage.getItem('SECURITY_BIOMETRIC');

        if (biometricEnabled !== 'true') {
            showToast("error", "Bạn chưa bật Face ID", "");
            return;
        }

        // Xác thực sinh trắc học
        const { success } = await rnBiometrics.simplePrompt({
            promptMessage: "Xác thực để đăng nhập",
        });

        if (!success) {
            showToast("error", "Xác thực thất bại", "");
            return;
        }

        //  Lấy refreshToken từ secure storage
        const credentials = await Keychain.getGenericPassword();

        if (!credentials) {
            showToast("error", "Không tìm thấy thông tin đăng nhập", "");
            return;
        }

        const refreshToken = credentials.password;

        //  Gọi API refresh token
        // const response = await api.post("/auth/refresh-token", {
        //     refreshToken,
        // });

        // // Lưu accessToken mới
        // dispatch(loginSuccess(response.data.accessToken));

        showToast("success", "Đăng nhập thành công", "");

    } catch (error) {
        console.log(error);
        showToast("error", "Có lỗi xảy ra", "");
    }
};