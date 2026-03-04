import React, { useState } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ViLangIcon, EnLangIcon } from '../../assets/icons';
import i18n from '~/i18n/i18n';
import { Text } from 'react-native-paper';
const LanguageDropdown = () => {
    const [open, setOpen] = useState(false);
    const current = i18n.language; // 'vi' | 'en'

    const changeLang = async (lang: 'vi' | 'en') => {
        if (lang === current) return;
        await i18n.changeLanguage(lang);
        await AsyncStorage.setItem('LANG', lang);
        setOpen(false);
    };

    return (
        <View style={styles.wrap}>
            {/* Active flag */}
            <TouchableOpacity onPress={() => setOpen(!open)}>
                {current === 'vi' ? <ViLangIcon width={24} height={24} /> : <EnLangIcon width={24} height={24} />}
            </TouchableOpacity>

            {/* Dropdown */}
            {open && (
                <>
                    {/* overlay để bấm ra ngoài */}
                    <Pressable
                        style={StyleSheet.absoluteFill}
                        onPress={() => setOpen(false)}
                    />

                    <View style={styles.dropdown}>
                        <TouchableOpacity
                            style={styles.item}
                            onPress={() => changeLang('vi')}
                        >
                            <ViLangIcon width={24} height={24} />
                            <Text>Tiếng Việt</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.item}
                            onPress={() => changeLang('en')}
                        >
                            <EnLangIcon width={24} height={24} />
                            <Text>English</Text>

                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );
};

export default LanguageDropdown;
const styles = StyleSheet.create({
    wrap: {
        position: 'relative',
    },
    dropdown: {
        position: 'absolute',
        top: 25,
        right: 0,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 6,
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 6,
        gap: 6,
    },
    item: {
        padding: 6,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
});
