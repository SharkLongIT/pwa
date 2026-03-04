import { useTheme } from '~/context/ThemeContext';
import { darkColors, lightColors } from '~/utils/constants/appColors';

export const useAppColors = () => {
    const { theme } = useTheme();
    return theme === 'dark' ? darkColors : lightColors;
};
