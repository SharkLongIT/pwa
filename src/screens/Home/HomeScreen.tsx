import React, { useEffect, useMemo, useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    Pressable,
    Image,
    FlatList,
    TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { PieChart } from "react-native-chart-kit";

import projectFe from "~/api/projectType.api";
import Weather from "~/components/weather/Weather";
import { useAppColors } from "~/hooks/useAppColors";
import { MainParamList } from "~/navigation/MainNavigator";
import { RootState } from "~/redux/store";

import { appEvent } from "~/utils/appEvent";
import { EVENT, PAGINATION, STATUS_OPTIONS } from "~/utils/enum";

import { formatCurrency, formatDate } from "~/utils/format/formatCurrency";
import { getStatusColor, getStatusText } from "~/utils/helper/status";

const HomeScreen = () => {
    const navigation =
        useNavigation<NativeStackNavigationProp<MainParamList>>();

    const { t } = useTranslation();
    const colors = useAppColors();

    const auth = useSelector((state: RootState) => state.auth.user);

    const [projects, setProjects] = useState<any[]>([]);
    const [allProjects, setAllProjects] = useState<any[]>([]);

    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const [selectedStatus, setSelectedStatus] = useState<number | undefined>();
    const [keyword, setKeyword] = useState("");

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    /* ================= FETCH ================= */

    const fetchProjects = async (
        pageNumber = 1,
        isLoadMore = false,
        isRefresh = false
    ) => {
        try {

            if (isLoadMore) setLoadingMore(true);
            else if (isRefresh) setRefreshing(true);
            else setLoading(true);

            const res = await projectFe.getAllProjectsByUserId({
                status: selectedStatus,
                skipCount: (pageNumber - 1) * PAGINATION.pageSize,
                maxResultCount: PAGINATION.pageSize,
            });

            const items = res?.data?.result?.items ?? [];
            const total = res?.data?.result?.totalCount ?? 0;

            setHasMore(pageNumber * PAGINATION.pageSize < total);
            setPage(pageNumber);

            if (isLoadMore) {
                setAllProjects(prev => [...prev, ...items]);
            } else {
                setAllProjects(items);
            }

        } catch (err) {
            console.log("Fetch error:", err);
        } finally {
            setLoading(false);
            setLoadingMore(false);
            setRefreshing(false);
        }
    };

    /* ================= INITIAL ================= */

    useEffect(() => {
        fetchProjects();
    }, []);

    /* ================= STATUS FILTER ================= */

    useEffect(() => {
        fetchProjects(1);
    }, [selectedStatus]);

    /* ================= REFRESH ================= */

    const handleRefresh = () => {
        fetchProjects(1, false, true);
    };

    /* ================= LOAD MORE ================= */

    const handleLoadMore = () => {

        if (loading || loadingMore || !hasMore) return;

        fetchProjects(page + 1, true);

    };

    /* ================= EVENT REFRESH ================= */

    useEffect(() => {

        const listener = () => fetchProjects(1);

        appEvent.addListener(EVENT.PROJECT_CREATED, listener);

        return () => {
            appEvent.removeListener(EVENT.PROJECT_CREATED, listener);
        };

    }, [selectedStatus]);

    /* ================= SEARCH LOCAL ================= */

    const filteredProjects = useMemo(() => {

        if (!keyword) return allProjects;

        const key = keyword.toLowerCase();

        return allProjects.filter(p =>
            p.projectCode?.toLowerCase().includes(key) ||
            p.projectTypeCode?.toLowerCase().includes(key)
        );

    }, [keyword, allProjects]);

    /* ================= SUMMARY ================= */

    const totalCost = useMemo(
        () => filteredProjects.reduce((sum, p) => sum + (p.cost ?? 0), 0),
        [filteredProjects]
    );

    const totalProfit = useMemo(
        () => filteredProjects.reduce((sum, p) => sum + (p.profitPlan ?? 0), 0),
        [filteredProjects]
    );

    /* ================= CHART DATA ================= */

    const donutData = [
        {
            name: t("project.cost"),
            value: totalCost,
            color: "#ef4444",
            legendFontColor: colors.textPrimary,
            legendFontSize: 12,
        },
        {
            name: t("project.profitPlan"),
            value: totalProfit,
            color: "#16a34a",
            legendFontColor: colors.textPrimary,
            legendFontSize: 12,
        },
    ];

    /* ================= PROJECT CARD ================= */

    const ProjectCard = ({ item }: { item: any }) => {

        return (
            <Pressable
                style={[styles.card, { backgroundColor: colors.card }]}
                onPress={() =>
                    navigation.navigate(
                        "ProjectDetail",
                        { projectId: item.id } as never
                    )
                }
            >
                <View style={styles.cardHeader}>

                    <Text
                        style={[
                            styles.projectCode,
                            { color: colors.textPrimary },
                        ]}
                    >
                        {item.projectCode}
                    </Text>

                    <View
                        style={[
                            styles.statusBadge,
                            {
                                backgroundColor:
                                    getStatusColor(item.status) + "20",
                            },
                        ]}
                    >
                        <Text
                            style={{
                                color: getStatusColor(item.status),
                                fontWeight: "600",
                            }}
                        >
                            {getStatusText(item.status, t)}
                        </Text>
                    </View>

                </View>

                <Text style={[styles.text, { color: colors.textSecondary }]}>
                    {t("project.type")}: {item.projectTypeCode}
                </Text>

                <Text style={[styles.text, { color: colors.textSecondary }]}>
                    {formatDate(item.startDate)} - {formatDate(item.endDate)}
                </Text>

                <View style={styles.divider} />

                <Text style={[styles.cost, { color: colors.textSecondary }]}>
                    {t("project.cost")}: {formatCurrency(item.cost)}
                </Text>

                <Text style={styles.costPlan}>
                    {t("project.costPlan")}: {formatCurrency(item.costPlan)}
                </Text>

                <Text style={styles.profit}>
                    {t("project.profitPlan")}: {formatCurrency(item.profitPlan)}
                </Text>

            </Pressable>
        );
    };

    /* ================= SKELETON ================= */

    const SkeletonCard = () => (
        <View style={[styles.card, { backgroundColor: "#e5e7eb" }]} />
    );

    /* ================= RENDER ================= */

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>

            <SafeAreaView edges={["top"]}>
                <Weather />
            </SafeAreaView>

            <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>

                <FlatList
                    data={filteredProjects}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <ProjectCard item={item} />}
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.4}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        padding: 20,
                        paddingBottom: 80,
                    }}

                    ListFooterComponent={
                        loadingMore ? (
                            <Text style={{ textAlign: "center" }}>
                                {t("loading_more")}
                            </Text>
                        ) : null
                    }

                    ListEmptyComponent={
                        loading ? (
                            <>
                                <SkeletonCard />
                                <SkeletonCard />
                            </>
                        ) : (
                            <Text style={{ textAlign: "center" }}>
                                {t("project.noProject")}
                            </Text>
                        )
                    }

                    ListHeaderComponent={
                        <>
                            {/* HEADER */}

                            <View style={styles.header}>

                                <View style={{ flex: 1 }}>

                                    <Text style={styles.welcome}>
                                        {t("welcome_back")}
                                    </Text>

                                    <Text
                                        style={[
                                            styles.userName,
                                            { color: colors.textPrimary },
                                        ]}
                                    >
                                        {auth?.name ?? "User"} 👋
                                    </Text>

                                </View>

                                <Image
                                    source={require("~/assets/images/default-avatar.png")}
                                    style={styles.avatar}
                                />

                            </View>

                            {/* SEARCH */}

                            <View
                                style={[
                                    styles.searchBox,
                                    { backgroundColor: colors.card },
                                ]}
                            >
                                <TextInput
                                    placeholder={t("project.filter")}
                                    value={keyword}
                                    onChangeText={setKeyword}
                                    style={{ color: colors.inputText }}
                                    placeholderTextColor={
                                        colors.inputPlaceholder
                                    }
                                />
                            </View>

                            {/* FILTER */}

                            <View style={styles.filterRow}>
                                {STATUS_OPTIONS.map((item) => (

                                    <Pressable
                                        key={item.labelKey}
                                        style={[
                                            styles.filterChip,
                                            selectedStatus === item.value &&
                                            styles.filterActive,
                                        ]}
                                        onPress={() =>
                                            setSelectedStatus(item.value)
                                        }
                                    >
                                        <Text
                                            style={{
                                                color:
                                                    selectedStatus ===
                                                        item.value
                                                        ? "#fff"
                                                        : "#6b7280",
                                            }}
                                        >
                                            {t(item.labelKey)}
                                        </Text>
                                    </Pressable>

                                ))}
                            </View>

                            {/* SUMMARY */}

                            <View
                                style={[
                                    styles.summaryCard,
                                    { backgroundColor: colors.card },
                                ]}
                            >

                                <Text
                                    style={[
                                        styles.sectionTitle,
                                        { color: colors.textPrimary },
                                    ]}
                                >
                                    {t("project.overview")}
                                </Text>

                                <PieChart
                                    data={donutData}
                                    width={300}
                                    height={160}
                                    chartConfig={{
                                        color: () => colors.textPrimary,
                                    }}
                                    accessor="value"
                                    backgroundColor="transparent"
                                    paddingLeft="15"
                                />

                            </View>
                        </>
                    }
                />
            </SafeAreaView>
        </View>
    );
};

export default HomeScreen;
/* ================= STYLES ================= */

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    welcome: {
        fontSize: 13,
        color: "#64748B",
    },
    userName: {
        fontSize: 22,
        fontWeight: "700",
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    card: {
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        minHeight: 120,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    projectCode: {
        fontSize: 16,
        fontWeight: "700",
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    divider: {
        height: 1,
        backgroundColor: "#E2E8F0",
        marginVertical: 10,
    },
    cost: { fontWeight: "600" },
    profit: { color: "#16a34a" },
    text: { color: "#64748B" },
    summaryCard: {
        padding: 18,
        borderRadius: 18,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 10,
    },
    filterRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 15,
    },
    filterChip: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: "#f3f4f6",
        marginRight: 10,
        marginBottom: 8,
    },
    filterActive: {
        backgroundColor: "#4F46E5",
    },
    searchBox: {
        marginBottom: 15,
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 14,
    },

    costPlan: {
        color: "#2563EB",
    },
});