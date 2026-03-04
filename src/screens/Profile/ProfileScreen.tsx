import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { use, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    Pressable,
} from 'react-native';
import { useSelector } from 'react-redux';
import { BaseContent } from '~/components/base-screen/BaseContent';
import { useAppColors } from '~/hooks/useAppColors';
import { MainParamList } from '~/navigation/MainNavigator';
import { RootState } from '~/redux/store';
import { appColors } from '~/utils/constants/appColors';
import { showToast } from '~/utils/toast';

const ProfileScreen = () => {
    const auth = useSelector((state: RootState) => state.auth.user);
    const navigation = useNavigation<NativeStackNavigationProp<MainParamList>>();
    const [name, setName] = useState(auth?.name || '');
    const [email, setEmail] = useState(auth?.emailAddress || '');
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const colors = useAppColors();
    const nameInputRef = useRef<TextInput>(null);


    const onToggleEdit = () => {
        if (!editing) {
            setEditing(true);

            setTimeout(() => {
                nameInputRef.current?.focus();
            }, 100);
        } else {
            setEditing(false);
            showToast('success', t('profile.updateProfileSuccess'), '');
        }
    };


    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                <Pressable disabled={loading} onPress={onToggleEdit}>
                    <Text
                        style={[
                            styles.textTitle,
                            loading && { opacity: 0.5 },

                        ]}
                    >
                        {editing ? t('common.save') : t('common.edit')}
                    </Text>
                </Pressable>
        });
    }, [navigation, editing]);

    return (
        <BaseContent >
            <View style={styles.container}>
                <View style={styles.avatarWrap}>
                    <Image
                        source={require('~/assets/images/default-avatar.png')}
                        style={styles.avatar}
                    />
                    {/* <TouchableOpacity style={styles.changeAvatar}>
                        <Text style={styles.changeAvatarText}>Đổi ảnh</Text>
                    </TouchableOpacity> */}
                </View>

                {/* INFO */}
                <View style={[styles.card, { backgroundColor: colors.card }]}>
                    <Text style={[styles.label, { color: colors.textPrimary }]}>{t('profile.name')}</Text>
                    <TextInput
                        ref={nameInputRef}
                        value={name}
                        editable={editing}
                        onChangeText={setName}
                        selectTextOnFocus
                        style={[
                            styles.input,
                            !editing && styles.inputDisabled,
                            { backgroundColor: colors.inputBackground, color: colors.textPrimary },
                        ]}
                    />


                    <Text style={[styles.label, { color: colors.textPrimary }]}>{t('profile.email')}</Text>
                    <TextInput
                        value={email}
                        editable={false}
                        style={[styles.input, styles.inputDisabled, { backgroundColor: colors.inputBackground, color: colors.textPrimary }]}
                    />
                </View>
            </View>
        </BaseContent>
    );
};

export default ProfileScreen;

/* -------------------- Styles -------------------- */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },

    avatarWrap: {
        alignItems: 'center',
        marginBottom: 24,
    },

    avatar: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: '#E5E7EB',
    },

    changeAvatar: {
        marginTop: 8,
    },

    changeAvatarText: {
        fontSize: 13,
        color: appColors.primary,
        fontWeight: '600',
    },

    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
    },

    label: {
        fontSize: 12,
        color: '#6B7280',
        marginBottom: 6,
        fontWeight: '600',
    },

    input: {
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 14,
        color: '#111827',
        marginBottom: 16,
        backgroundColor: '#fff',
    },

    inputDisabled: {
        backgroundColor: '#F3F4F6',
        color: '#9CA3AF',
    },

    editBtn: {
        backgroundColor: appColors.primary,
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center',
    },

    editText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
    },

    saveBtn: {
        backgroundColor: appColors.success,
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center',
    },

    saveText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
    },
    textTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#007AFF',
    }

});
