import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    RefreshControl,
    Animated,
    ActivityIndicator,
    Pressable,
} from "react-native";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { FilterLinesIcon } from "~/assets/icons";
import HeaderMain from "~/components/layout/base-header/header-main";
import NotificationSkeleton from "~/components/skeleton-base/LoadingSkeletonNotification";
import { useAppColors } from "~/hooks/useAppColors";
import { useNotifications } from "~/hooks/useNotifications";
import { MainParamList } from "~/navigation/MainNavigator";
import getNotiColor from "~/utils/helper/color-noti";

const NotificationScreen = () => {
    const {
        items,
        loading,
        refreshing,
        opacity,
        onRefresh,
        loadMore,
        loadingMore,
        toggleFilter,
    } = useNotifications();
    const colors = useAppColors();
    const { t } = useTranslation();
    const renderLeftActions = () => (
        <View style={[styles.swipeAction, styles.readAction]}>
            <Text style={styles.swipeText}>{t("notification.read")}</Text>
        </View>
    );

    const renderRightActions = () => (
        <View style={[styles.swipeAction, styles.deleteAction]}>
            <Text style={styles.swipeText}>{t("notification.delete")}</Text>
        </View>
    );

    const renderItem = ({ item }: any) => {
        const notiColor = getNotiColor(item.title, colors);

        return (
            <GestureHandlerRootView>
                <Swipeable
                    renderLeftActions={renderLeftActions}
                    renderRightActions={renderRightActions}
                    overshootRight={false}
                    overshootLeft={false}
                    onSwipeableRightOpen={() => {
                        // TODO: handle delete
                        console.log("DELETE", item.id);
                    }}
                    onSwipeableLeftOpen={() => {
                        // TODO: handle mark as read
                        // console.log("READ", item.id);
                    }}
                >
                    <View
                        style={[styles.card, {
                            backgroundColor: colors.card,
                            borderLeftColor: notiColor.border,
                            borderLeftWidth: 4,
                        },
                        ]}
                    >
                        {/* DOT */}
                        <View style={[styles.dot, { backgroundColor: notiColor.dot }]} />
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.title, { color: colors.textPrimary }]}>
                                {item.title}
                            </Text>
                            <Text style={[styles.content, { color: colors.textSecondary },]}>
                                {item.content}
                            </Text>
                            <Text style={[styles.time, { color: colors.textSecondary },]} >
                                {item.time}
                            </Text>
                        </View>
                    </View>
                </Swipeable>
            </GestureHandlerRootView>
        );
    };


    return (
        <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
            <HeaderMain title={t("notification.title")} />

            {loading ? (
                <NotificationSkeleton />
            ) : (
                <Animated.View style={{ flex: 1, opacity }}>
                    <FlatList
                        data={items}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        contentContainerStyle={{ padding: 16 }}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        onEndReached={loadMore}
                        onEndReachedThreshold={0.3}
                        ListFooterComponent={
                            loadingMore ? (
                                <View style={{ paddingVertical: 16 }}>
                                    <ActivityIndicator color={colors.primary} />
                                </View>
                            ) : null
                        }
                        ListEmptyComponent={() => {
                            // if (loading) {
                            //     return <ActivityIndicator style={{ marginTop: 40 }} />;
                            // }
                            if (items.length === 0) {
                                return (
                                    <Text style={styles.empty}>
                                        {t("common.empty")}
                                    </Text>
                                );
                            }
                            return null;

                        }}
                    />
                </Animated.View>
            )}
        </SafeAreaView>
    );
};

export default NotificationScreen;

export const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: "#F5F7FA",
        paddingBottom: 60
    },

    card: {
        flexDirection: "row",
        padding: 14,
        borderRadius: 12,
        backgroundColor: "#fff",
        marginBottom: 12,
    },

    unreadCard: {
        backgroundColor: "#EEF2FF",
    },

    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#4F46E5",
        marginTop: 6,
        marginRight: 10,
    },

    title: {
        fontSize: 15,
        fontWeight: "600",
        color: "#111827",
    },

    content: {
        fontSize: 13,
        color: "#6B7280",
        marginTop: 2,
    },

    time: {
        fontSize: 11,
        color: "#9CA3AF",
        marginTop: 6,
    },

    emptyWrap: {
        alignItems: "center",
        marginTop: 80,
    },

    emptyText: {
        color: "#9CA3AF",
        fontSize: 14,
    },

    logoutBtn: {
        margin: 16,
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: "center",
        backgroundColor: "#EF4444",
    },

    logoutText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "600",
    },
    swipeAction: {
        justifyContent: "center",
        alignItems: "center",
        width: 90,
        marginBottom: 12,
        borderRadius: 12,
    },

    readAction: {
        backgroundColor: "#3B82F6", // blue
        padding: 10
    },

    deleteAction: {
        backgroundColor: "#EF4444", // red
    },

    swipeText: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "600",
    },
    empty: {
        textAlign: "center",
        marginTop: 40,
        color: "#9CA3AF",
    },
});
