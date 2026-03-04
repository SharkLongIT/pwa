import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Linking, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import Feather from 'react-native-vector-icons/Feather';
import { useAppColors } from '~/hooks/useAppColors';
import { BaseContent } from '~/components/base-screen/BaseContent';
import { openComposer } from "react-native-email-link";

const FAQS = [
    { key: 'reset_password', icon: 'lock', link: 'https://example.com/reset-password' },
    { key: 'change_language', icon: 'globe', link: 'https://example.com/language' },
    { key: 'contact_support', icon: 'mail', link: 'mailto:support@example.com' },
];

export default function HelpSupportScreen() {
    const { t } = useTranslation();
    const [open, setOpen] = useState<string | null>(null);
    const colors = useAppColors();
    const toggle = (key: string) => setOpen(open === key ? null : key);

    const openMail = async () => {
        const email = "support@example.com";
        const subject = "I have a question";
        const body = "Hi, can you help me with...";

        const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert("Không tìm thấy ứng dụng email");
        }
    };
    return (
        <BaseContent>
            <ScrollView contentContainerStyle={styles.container}>
                {/* <Text style={styles.title}>{t('help.title')}</Text> */}
                <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{t('help.subtitle')}</Text>

                {/* FAQ */}
                <View style={[styles.card, { backgroundColor: colors.card }]}>
                    <Text style={[styles.section, { color: colors.textPrimary }]}>{t('help.faq')}</Text>
                    {FAQS.map((item) => (
                        <View key={item.key}>
                            <TouchableOpacity style={styles.row} onPress={() => toggle(item.key)}>
                                <View style={styles.rowLeft}>
                                    <Feather name={item.icon as any} size={18} color={colors.primary} />
                                    <Text style={[styles.rowText, { color: colors.textPrimary }]}>{t(`help.${item.key}.q`)}</Text>
                                </View>
                                <Feather name={open === item.key ? 'chevron-up' : 'chevron-down'} size={18} color={colors.textSecondary} />
                            </TouchableOpacity>
                            {open === item.key && (
                                <View style={styles.answerWrap}>
                                    <Text style={[styles.answer, { color: colors.textSecondary }]}>{t(`help.${item.key}.a`)}</Text>
                                    {!!item.link && (
                                        <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
                                            <Text style={[styles.link, { color: colors.primary }]}>{t('help.learn_more')}</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            )}
                        </View>
                    ))}
                </View>

                {/* Contact */}
                <View style={[styles.card, { backgroundColor: colors.card }]}>
                    <Text style={[styles.section, { color: colors.textPrimary }]}>{t('help.contact')}</Text>
                    <TouchableOpacity style={styles.contactBtn}
                        // onPress={() => Linking.openURL('mailto:tlong.nguyen.dev@gmail.com')}
                        onPress={() => {
                            // openComposer({
                            //     to: "support@example.com",
                            //     subject: "I have a question",
                            //     body: "Hi, can you help me with...",
                            // });
                            openMail()
                        }}
                    >
                        <Feather name="mail" size={18} color="#fff" />
                        <Text style={styles.contactText}>{t('help.email_us')}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </BaseContent>

    );
}

const styles = StyleSheet.create({
    container: { padding: 16 },
    title: { fontSize: 22, fontWeight: '700', marginBottom: 4 },
    subtitle: { fontSize: 13, color: '#6B7280', marginBottom: 16 },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
    },
    section: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
    },
    rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    rowText: { fontSize: 14, fontWeight: '500' },
    answerWrap: { paddingBottom: 12, paddingLeft: 26 },
    answer: { fontSize: 13, color: '#4B5563', marginBottom: 6 },
    link: { color: '#2563EB', fontWeight: '600', fontSize: 13 },
    contactBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: '#2563EB',
        paddingVertical: 12,
        borderRadius: 12,
    },
    contactText: { color: '#fff', fontWeight: '600' },
});
