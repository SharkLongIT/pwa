import Toast from 'react-native-toast-message';

export const showToast = (
    type: 'success' | 'error' | 'info',
    text1: string,
    text2: string,
    position: 'top' | 'bottom' = 'top',
) => {
    Toast.show({
        type,
        text1: text1,
        text2: text2,
        position: position,
        visibilityTime: 1000,
        autoHide: true,
        topOffset: 60,
    });
};
