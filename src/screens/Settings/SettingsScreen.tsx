import React, { use, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '~/redux/hooks';
import { handleLogout } from '~/thunk/authThunk';
import { MainParamList } from '~/navigation/MainNavigator';
import { BaseContent } from '~/components/base-screen/BaseContent';
import LanguagePickerModal from './modal/LanguagePickerModal';
import i18n from '~/i18n';
import { useTranslation } from 'react-i18next';

const SettingsScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<MainParamList>>();
    const dispatch = useAppDispatch();
    const [openLang, setOpenLang] = useState(false);
    const onLogout = () => {
        dispatch(handleLogout());
    };
    const { t } = useTranslation();

    return (
        <BaseContent>
            <View style={{ padding: 16 }}>
                <Text style={{ fontSize: 24, fontWeight: '600', color: '#111827', marginBottom: 24 }}>
                    {t('tab.settings')}
                </Text>
                {/* ACCOUNT */}
                <Text style={styles.sectionTitle}>{t('settings.account')}</Text>

                <SettingItem
                    title={t('settings.changePassword')}
                    onPress={() => navigation.navigate('ChangePasswordScreen')}
                />


            </View>

        </BaseContent>
    );
};

export default SettingsScreen;

/* -------------------- Item -------------------- */
const SettingItem = ({
    title,
    onPress,
    rightText,
}: {
    title: string;
    onPress: () => void;
    rightText?: string;
}) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
        <Text style={styles.itemText}>{title}</Text>
        {rightText && <Text style={styles.rightText}>{rightText}</Text>}
        <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
);

/* -------------------- Styles -------------------- */
const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 13,
        color: '#6B7280',
        marginBottom: 8,
        fontWeight: '600',
    },

    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginBottom: 12,
    },

    itemText: {
        fontSize: 15,
        color: '#111827',
        fontWeight: '500',
    },

    arrow: {
        fontSize: 22,
        color: '#9CA3AF',
    },

    logoutBtn: {
        marginTop: 'auto',
        backgroundColor: '#EF4444',
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center',
    },

    logoutText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
    },
    rightText: {
        fontSize: 15,
        color: '#6B7280',
        marginRight: 8,
    },
});
