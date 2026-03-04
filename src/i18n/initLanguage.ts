import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from './i18n';

export const initLanguage = async () => {
    try {
        const savedLang = await AsyncStorage.getItem('LANG');

        if (savedLang) {
            await i18n.changeLanguage(savedLang);
        } else {
            await i18n.changeLanguage('vi');
        }
    } catch (error) {
        console.log('Init language error:', error);
    }
};
