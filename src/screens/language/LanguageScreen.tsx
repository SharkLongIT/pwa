import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

import HeaderMain from '~/components/layout/base-header/header-main';
import { appColors } from '~/utils/constants/appColors';
import { EnLangIcon, ViLangIcon } from '~/assets/icons';
import { BaseContent } from '~/components/base-screen/BaseContent';
import { useAppColors } from '~/hooks/useAppColors';


const LANG_KEY = 'LANG';

const LANGUAGES = [
    {
        code: 'vi',
        label: 'Tiếng Việt',
        Icon: ViLangIcon,
    },
    {
        code: 'en',
        label: 'English',
        Icon: EnLangIcon,
    },
];

const LanguageScreen = () => {
    const { i18n, t } = useTranslation();
    const [current, setCurrent] = useState(i18n.language);
    const colors = useAppColors();
    useEffect(() => {
        setCurrent(i18n.language);
    }, [i18n.language]);

    const onSelect = async (code: string) => {
        setCurrent(code);
        await AsyncStorage.setItem(LANG_KEY, code);
        i18n.changeLanguage(code);
    };

    return (
        <BaseContent>
            {/* <HeaderMain title={t('language.title')} /> */}

            <View style={styles.container}>
                <Text style={styles.desc}>{t('language.selectLanguage')}</Text>
                <View style={[styles.card, { backgroundColor: colors.card }]}>
                    {LANGUAGES.map((item) => {
                        const active = current.startsWith(item.code);
                        const Icon = item.Icon;

                        return (
                            <TouchableOpacity
                                key={item.code}
                                style={[
                                    styles.item,
                                    active && styles.itemActive,
                                ]}
                                onPress={() => onSelect(item.code)}
                            >
                                <View style={styles.left}>
                                    <Icon width={24} height={24} />
                                    <Text
                                        style={[
                                            styles.text,
                                            active && styles.textActive,
                                            { color: colors.textPrimary },
                                        ]}
                                    >
                                        {item.label}
                                    </Text>
                                </View>

                                {active && <View style={styles.dot} />}
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        </BaseContent>
    );
};

export default LanguageScreen;

/* -------------------- STYLES -------------------- */

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: appColors.background,
    },

    container: {
        padding: 16,
    },

    card: {
        backgroundColor: appColors.card,
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: appColors.shadow,
        shadowOpacity: 0.05,
        shadowRadius: 6,
    },

    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 18,
        borderBottomWidth: 0.5,
        borderBottomColor: appColors.divider || '#EEE',
    },

    itemActive: {
        backgroundColor: appColors.primary + '10',
    },

    left: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },

    text: {
        fontSize: 15,
        color: appColors.textPrimary,
    },

    textActive: {
        color: appColors.primary,
        fontWeight: '600',
    },

    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: appColors.primary,
    },
    desc: {
        fontSize: 13,
        color: '#6B7280',
        marginBottom: 12,
        paddingHorizontal: 4,
    },

});
