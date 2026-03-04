import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    RefreshControl,
    Animated,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import notiApi from "~/api/noti.api";
import { RootState } from "~/redux/store";
import { useAppColors } from "./useAppColors";
import { INotification } from "~/interface/notification";
import { useFocusEffect } from "@react-navigation/native";


type FilterType = "ALL" | "UNREAD";
const mapNotification = (item: any): INotification => {
    return {
        id: item.notification.id,
        title: item.notification.notificationName,
        content: item.notification.data?.message || '',
        time: item.notification.creationTime,
        // isRead: item.state === 1,
        state: item.notification.state
    };
};

export const useNotifications = () => {
    const [items, setItems] = useState<any[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [filter, setFilter] = useState<FilterType>("ALL");
    const [page, setPage] = useState(0);
    const pageSize = 10;

    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    // const [refreshing, setRefreshing] = useState(false);
    const [refreshing, setRefreshing] = useState<boolean>(false);


    const auth = useSelector((state: RootState) => state.auth.user);
    const opacity = useRef(new Animated.Value(0)).current;

    const fetchNotifications = React.useCallback(
        async (pageIndex = 0, append = false) => {

            const res = await notiApi.getNotifications({
                userId: auth?.id || 0,
                skipCount: pageIndex * pageSize,
                maxResultCount: pageSize,

            });
            console.log(res)

            const rawItems = res.data.result.items;
            const mappedItems = rawItems.map(mapNotification);

            setItems(prev => (append ? [...prev, ...mappedItems] : mappedItems));
            setTotalCount(res.data.result.totalCount);
        },
        [auth?.id]
    );


    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);
            setPage(0);

            fetchNotifications(0).finally(() => {
                setLoading(false);
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            });
        }, [fetchNotifications])
    );

    // 🔹 Pull to refresh
    const onRefresh = async () => {
        setRefreshing(true);
        setPage(0);
        await fetchNotifications(0);
        setRefreshing(false);
    };

    // 🔹 Load more
    const loadMore = async () => {
        if (loadingMore) return;
        if (items.length >= totalCount) return;

        setLoadingMore(true);
        const nextPage = page + 1;
        setPage(nextPage);
        await fetchNotifications(nextPage, true);
        setLoadingMore(false);
    };

    const toggleFilter = () => {
        setFilter(prev => (prev === "ALL" ? "UNREAD" : "ALL"));
        // console.log("check")
    };


    return {
        fetchNotifications,
        items,
        totalCount,
        onRefresh,
        loadMore,
        loading,
        loadingMore,
        refreshing,
        opacity,
        toggleFilter,
        filter
    };
};
