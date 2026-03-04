import React, { useEffect, useState, useCallback, memo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Alert,
    ListRenderItem,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DeviceInfo from 'react-native-device-info';
import { useTranslation } from 'react-i18next';
import { BaseContent } from '~/components/base-screen/BaseContent';
import { useTheme } from '~/context/ThemeContext';
import { useAppColors } from '~/hooks/useAppColors';
import GetLocation from 'react-native-get-location';
import { requestLocationPermission } from '~/utils/permission/location';

interface Session {
    id: string;
    device: string;
    location: string;
    lastActive: string;
    current?: boolean;
}

/* ================== Session Item ================== */

interface SessionItemProps {
    item: Session;
    onLogout: (id: string) => void;
    colors: any;
    theme: string;
}

const SessionItem = memo(
    ({ item, onLogout, colors, theme }: SessionItemProps) => {
        const isPhone = item.device.toLowerCase().includes('iphone');
        const { t } = useTranslation();
        return (
            <View style={[styles.card, { backgroundColor: colors.card }]}>
                <View style={styles.row}>
                    <Ionicons
                        name={
                            isPhone
                                ? 'phone-portrait-outline'
                                : 'laptop-outline'
                        }
                        size={24}
                        color={colors.primary}
                    />

                    <View style={{ flex: 1, marginLeft: 12 }}>
                        <Text
                            style={[
                                styles.device,
                                { color: colors.textPrimary },
                            ]}
                        >
                            {item.device}
                        </Text>
                        <Text
                            style={[
                                styles.location,
                                { color: colors.textSecondary },
                            ]}
                        >
                            {item.location}
                        </Text>
                        <Text
                            style={[
                                styles.status,
                                {
                                    color: item.current
                                        ? colors.success
                                        : colors.textSecondary,
                                },
                            ]}
                        >
                            {item.lastActive}
                        </Text>
                    </View>

                    {!item.current && (
                        <TouchableOpacity
                            onPress={() => onLogout(item.id)}
                        >
                            <Ionicons
                                name="log-out-outline"
                                size={20}
                                color={colors.error}
                            />
                        </TouchableOpacity>
                    )}
                </View>

                {item.current && (
                    <View
                        style={[
                            styles.currentBadge,
                            {
                                backgroundColor:
                                    theme === 'dark'
                                        ? '#064E3B'
                                        : '#ECFDF5',
                            },
                        ]}
                    >
                        <Text
                            style={{
                                fontSize: 12,
                                fontWeight: '600',
                                color: colors.success,
                            }}
                        >
                            {t("security.currentDevice")}
                        </Text>
                    </View>
                )}
            </View>
        );
    }
);

/* ================== Screen ================== */

const ActiveSessionsScreen = () => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const colors = useAppColors();

    const [sessions, setSessions] = useState<Session[]>([]);
    const [device, setDevice] = useState<any>(null);

    /* ---------- Load Device Info ---------- */

    useEffect(() => {
        const loadDeviceInfo = async () => {
            try {
                const name = await DeviceInfo.getDeviceName();
                const model = DeviceInfo.getModel();

                const hasPermission = await requestLocationPermission();

                let locationText = 'Không xác định';

                if (hasPermission) {
                    const location = await GetLocation.getCurrentPosition({
                        enableHighAccuracy: true,
                        timeout: 15000,
                    });
                    try {
                        const res = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.latitude}&lon=${location.longitude}`
                        );
                        const data = await res.json();
                        // locationText = `Lat: ${location.latitude}, Lng: ${location.longitude}`;
                        locationText = data.display_name || locationText;
                    } catch (error) {
                        console.error("Error fetching location data:", error);

                    }
                }


                setDevice({ name, model });

                setSessions([
                    {
                        id: 'current',
                        device: model,
                        // location: 'Hà Nội, Việt Nam',
                        location: locationText,
                        lastActive: t('security.justNow'),
                        current: true,
                    },
                    {
                        id: '2',
                        device: 'MacBook Pro',
                        location: 'Hà Nội, Việt Nam',
                        lastActive: '5 phút trước',
                    },
                ]);
            } catch (error) {
                console.log(error);
            }
        };

        loadDeviceInfo();
    }, []);

    /* ---------- Handlers ---------- */

    const confirmLogout = useCallback((id: string) => {
        Alert.alert(
            t("common.confirm"),
            t("security.logoutConfirm"),
            [
                { text: t("common.cancel"), style: 'cancel' },
                {
                    text: t("common.logout"),
                    style: 'destructive',
                    onPress: () => {
                        setSessions(prev =>
                            prev.filter(s => s.id !== id),
                        );
                    },
                },
            ],
        );
    }, []);

    const confirmLogoutAll = useCallback(() => {
        Alert.alert(
            t("common.confirm"),
            t("security.logoutAllConfirm"),
            [
                { text: t("common.cancel"), style: 'cancel' },
                {
                    text: t("common.logout"),
                    style: 'destructive',
                    onPress: () => {
                        setSessions(prev =>
                            prev.filter(s => s.current),
                        );
                    },
                },
            ],
        );
    }, []);

    /* ---------- Render Item ---------- */

    const renderItem: ListRenderItem<Session> = useCallback(
        ({ item }) => (
            <SessionItem
                item={item}
                onLogout={confirmLogout}
                colors={colors}
                theme={theme}
            />
        ),
        [confirmLogout, colors, theme]
    );

    /* ---------- UI ---------- */

    return (
        <BaseContent>
            <View style={styles.container}>
                <FlatList
                    data={sessions}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    removeClippedSubviews
                    initialNumToRender={5}
                    maxToRenderPerBatch={5}
                    windowSize={5}
                />

                {sessions.some(s => !s.current) && (
                    <TouchableOpacity
                        style={[
                            styles.logoutAllBtn,
                            { backgroundColor: colors.error },
                        ]}
                        onPress={confirmLogoutAll}
                    >
                        <Text style={styles.logoutAllText}>
                            {t("security.logoutAll")}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </BaseContent>
    );
};

export default ActiveSessionsScreen;

/* ================== Styles ================== */

const styles = StyleSheet.create({
    container: { padding: 16 },

    card: {
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    device: {
        fontSize: 15,
        fontWeight: '600',
    },

    location: {
        fontSize: 13,
        marginTop: 2,
    },

    status: {
        fontSize: 12,
        marginTop: 4,
        fontWeight: '500',
    },

    currentBadge: {
        marginTop: 12,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 20,
        alignSelf: 'flex-start',
    },

    logoutAllBtn: {
        marginTop: 10,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
    },

    logoutAllText: {
        color: '#FFF',
        fontWeight: '600',
    },
});