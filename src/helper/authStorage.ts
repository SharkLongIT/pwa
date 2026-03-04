import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'ACCESS_TOKEN';
const REMEMBER_KEY = 'REMEMBER_ME';

export const saveLogin = async (token: string, remember: boolean) => {
    await AsyncStorage.setItem(TOKEN_KEY, token);
    await AsyncStorage.setItem(REMEMBER_KEY, remember ? '1' : '0');
};

export const clearLogin = async () => {
    await AsyncStorage.multiRemove([TOKEN_KEY, REMEMBER_KEY]);
};

export const getSavedLogin = async () => {
    const [token, remember] = await AsyncStorage.multiGet([
        TOKEN_KEY,
        REMEMBER_KEY,
    ]);

    return {
        token: token[1],
        remember: remember[1] === '1',
    };
};
