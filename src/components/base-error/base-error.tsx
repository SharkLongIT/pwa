// base-error.tsx
import { Alert } from 'react-native';
import { showToast } from '~/utils/toast';

interface HandleErrorOptions {
    showAlert?: boolean;      // Có hiện alert không, mặc định true
    defaultMessage?: string;  // Thông báo mặc định nếu server không trả message
}

/**
 * Xử lý lỗi server hoặc lỗi JS
 * @param err lỗi nhận được
 * @param options cấu hình: showAlert, defaultMessage
 * @returns message lỗi để dùng cho Toast hoặc console
 */
export const handleError = (
    err: any,
    options: HandleErrorOptions = {}
): string => {
    const { showAlert = true, defaultMessage = 'Đã xảy ra lỗi. Vui lòng thử lại!' } = options;
    const message =
        err?.error?.message ||
        err?.response?.data?.error?.message ||
        err?.response?.data?.message ||
        err?.message ||
        defaultMessage;
    console.log("Error handled:", message);
    if (message === 'Network Error') {
        if (showAlert) {
            Alert.alert(
                'Mất kết nối',
                'Không thể kết nối đến Internet.\nVui lòng kiểm tra Wi-Fi hoặc dữ liệu di động và thử lại.',
                [
                    {
                        text: 'Đã hiểu',
                        style: 'default',
                    },
                ],
                { cancelable: false }
            );
        }
        return message;
    }
    if (showAlert) {
        Alert.alert('Lỗi', message);
    } else {
        showToast("error", message, '');
    }
    return message;
};
