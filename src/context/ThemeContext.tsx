import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Theme = 'light' | 'dark';
export type ThemeMode = Theme | 'system';

type ThemeContextType = {
    theme: Theme;        // theme thực tế đang dùng
    mode: ThemeMode;    // user chọn: light | dark | system
    isDark: boolean;
    setMode: (mode: ThemeMode) => void;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>(
    {} as ThemeContextType
);

const THEME_KEY = 'APP_THEME';

/* -------------------- HELPERS -------------------- */
const resolveSystemTheme = (
    scheme?: ColorSchemeName | null
): Theme => {
    return scheme === 'dark' ? 'dark' : 'light';
};

const getSystemTheme = (): Theme => {
    return resolveSystemTheme(Appearance.getColorScheme());
};

/* -------------------- PROVIDER -------------------- */
export const ThemeProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [mode, setModeState] = useState<ThemeMode>('system');
    const [theme, setTheme] = useState<Theme>(getSystemTheme());

    const isDark = theme === 'dark';

    /* Load saved mode */
    useEffect(() => {
        const loadTheme = async () => {
            try {
                const saved = await AsyncStorage.getItem(THEME_KEY);
                if (saved === 'light' || saved === 'dark' || saved === 'system') {
                    setModeState(saved);
                }
            } catch (e) {
                console.warn('Load theme failed', e);
            }
        };

        loadTheme();
    }, []);

    /* Apply theme when mode changes */
    useEffect(() => {
        if (mode === 'system') {
            setTheme(getSystemTheme());
        } else {
            setTheme(mode);
        }
    }, [mode]);

    /* Listen system theme change */
    useEffect(() => {
        if (mode !== 'system') return;

        const sub = Appearance.addChangeListener(({ colorScheme }) => {
            setTheme(resolveSystemTheme(colorScheme));
        });

        return () => sub.remove();
    }, [mode]);

    /* Actions */
    const setMode = async (value: ThemeMode) => {
        setModeState(value);
        await AsyncStorage.setItem(THEME_KEY, value);
    };

    const toggleTheme = () => {
        setMode(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <ThemeContext.Provider
            value={{
                theme,
                mode,
                isDark,
                setMode,
                toggleTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

/* -------------------- HOOK -------------------- */
export const useTheme = () => {
    const ctx = useContext(ThemeContext);
    if (!ctx) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return ctx;
};
