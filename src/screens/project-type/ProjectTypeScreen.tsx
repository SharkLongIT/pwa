import React, { useEffect, useLayoutEffect, useState, useCallback, useMemo } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    Alert,
    Pressable,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "~/context/ThemeContext";
import { useTranslation } from "react-i18next";
import projectFe from "~/api/projectType.api";
import { ProjectType } from "~/interface/project";
import { PAGINATION } from "~/utils/enum";
import CreateOrUpdateProjectTypeModal from "./modal/CreateOrUpdateProjectTypeModal";
import { showToast } from "~/utils/toast";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainParamList } from "~/navigation/MainNavigator";

export default function ProjectTypeScreen() {

    const { theme } = useTheme();
    const { t } = useTranslation();
    const isDark = theme === "dark";
    const navigation = useNavigation<NativeStackNavigationProp<MainParamList>>();

    const [projectTypes, setProjectTypes] = useState<ProjectType[]>([]);
    const [allProjectTypes, setAllProjectTypes] = useState<ProjectType[]>([]);

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const [search, setSearch] = useState("");

    const [modalVisible, setModalVisible] = useState(false);
    const [editingItem, setEditingItem] = useState<ProjectType>();

    const [editing, setEditing] = useState(false);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    /* ================= FETCH ================= */

    const fetchProjects = useCallback(async (
        pageNumber = 1,
        isLoadMore = false,
        isRefresh = false
    ) => {

        try {

            if (isLoadMore) setLoadingMore(true);
            else if (isRefresh) setRefreshing(true);
            else setLoading(true);

            const res = await projectFe.getAllProjectsTypePaging({
                skipCount: (pageNumber - 1) * PAGINATION.pageSize,
                maxResultCount: PAGINATION.pageSize,
            });

            const items = res?.data?.result?.items ?? [];
            const total = res?.data?.result?.totalCount ?? 0;

            setHasMore(pageNumber * PAGINATION.pageSize < total);
            setPage(pageNumber);

            if (isLoadMore) {
                setAllProjectTypes(prev => [...prev, ...items]);
            } else {
                setAllProjectTypes(items);
            }

        } catch (error) {

            console.log("Fetch error", error);

        } finally {

            setLoading(false);
            setLoadingMore(false);
            setRefreshing(false);

        }

    }, []);

    useEffect(() => {
        fetchProjects();
    }, []);

    /* ================= LOCAL SEARCH ================= */

    const filteredProjectTypes = useMemo(() => {

        if (!search) return allProjectTypes;

        const key = search.toLowerCase();

        return allProjectTypes.filter(item =>
            item.code?.toLowerCase().includes(key)
        );

    }, [search, allProjectTypes]);

    useEffect(() => {
        setProjectTypes(filteredProjectTypes);
    }, [filteredProjectTypes]);

    /* ================= HEADER ================= */

    useLayoutEffect(() => {

        navigation.setOptions({

            headerRight: () => (

                <Pressable onPress={toggleEdit}>

                    <Text style={styles.headerBtn}>
                        {editing
                            ? `${t("common.delete")} (${selectedIds.length})`
                            : t("common.choose")}
                    </Text>

                </Pressable>

            ),

        });

    }, [editing, selectedIds]);

    /* ================= REFRESH ================= */

    const handleRefresh = () => {
        fetchProjects(1, false, true);
    };

    /* ================= LOAD MORE ================= */

    const handleLoadMore = () => {

        if (loading || loadingMore || !hasMore) return;

        fetchProjects(page + 1, true);

    };

    /* ================= CRUD ================= */

    const createProjectType = async (data: ProjectType) => {

        try {

            await projectFe.createProjectType(data);

            showToast("success", t("common.createSuccess"), "");

            fetchProjects();

        } catch {

            showToast("error", t("common.createFail"), "");

        }

    };

    const updateProjectType = async (data: ProjectType) => {

        try {

            await projectFe.updateProjectType(data);

            showToast("success", t("common.updateSuccess"), "");

            fetchProjects();

        } catch {

            showToast("error", t("common.updateFail"), "");

        }

    };

    const deleteProjectType = (data: ProjectType) => {

        Alert.alert(
            t("common.confirmDeleteTitle"),
            t("common.confirmDeleteMessage"),
            [
                { text: t("common.cancel"), style: "cancel" },
                {
                    text: t("common.delete"),
                    style: "destructive",
                    onPress: async () => {

                        try {

                            await projectFe.deleteProjectType(data.id);

                            showToast("success", t("common.deleteSuccess"), "");

                            fetchProjects();

                        } catch {

                            showToast("error", t("common.deleteError"), "");

                        }

                    },
                },
            ]
        );

    };

    /* ================= MULTI SELECT ================= */

    const toggleSelect = (id: number) => {

        setSelectedIds(prev => {

            let newSelected: number[];

            if (prev.includes(id)) {
                newSelected = prev.filter(x => x !== id);
            } else {
                newSelected = [...prev, id];
            }

            if (newSelected.length === 0) {
                setEditing(false);
            }

            return newSelected;

        });

    };

    const onLongPressItem = (id: number) => {

        if (!editing) {

            setEditing(true);
            setSelectedIds([id]);

        }

    };

    const toggleEdit = () => {

        if (!editing) {

            setEditing(true);

        } else {

            deleteMultiple();

        }

    };

    const deleteMultiple = () => {

        if (selectedIds.length === 0) return;

        Alert.alert(
            t("common.confirmDeleteTitle"),
            `${t("common.delete")} ${selectedIds.length}?`,
            [
                { text: t("common.cancel"), style: "cancel" },
                {
                    text: t("common.delete"),
                    style: "destructive",
                    onPress: async () => {

                        try {

                            await Promise.all(
                                selectedIds.map(id =>
                                    projectFe.deleteProjectType(id)
                                )
                            );

                            showToast("success", t("common.deleteSuccess"), "");

                            setEditing(false);
                            setSelectedIds([]);

                            fetchProjects();

                        } catch {

                            showToast("error", t("common.deleteError"), "");

                        }

                    },
                },
            ]
        );

    };

    /* ================= ITEM ================= */

    const RateItem = ({ label, value }: any) => (

        <View style={styles.rateItem}>
            <Text style={styles.rateLabel}>{label}</Text>
            <Text style={styles.rateValue}>{value}%</Text>
        </View>

    );

    const renderItem = ({ item }: { item: ProjectType }) => {

        const selected = selectedIds.includes(item.id);

        return (

            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => editing && toggleSelect(item.id)}
                onLongPress={() => onLongPressItem(item.id)}
            >

                <View
                    style={[
                        styles.card,
                        {
                            backgroundColor: isDark ? "#1F2937" : "#fff",
                            borderColor: selected ? "#6366F1" : "transparent",
                            borderWidth: 2,
                        },
                    ]}
                >

                    {editing && (
                        <Ionicons
                            name={selected ? "checkbox" : "square-outline"}
                            size={22}
                            color="#6366F1"
                            style={styles.checkbox}
                        />
                    )}

                    <View style={styles.cardHeader}>

                        <View style={styles.headerLeft}>

                            <View style={styles.iconBox}>
                                <Ionicons name="cube-outline" size={18} color="#6366F1" />
                            </View>

                            <Text
                                style={[
                                    styles.code,
                                    { color: isDark ? "#fff" : "#111827" },
                                ]}
                            >
                                {item.code}
                            </Text>

                        </View>
                        {!editing && (
                            <View style={styles.actions}>
                                <TouchableOpacity onPress={() => {
                                    setEditingItem(item);
                                    setModalVisible(true);
                                }} >
                                    <Ionicons name="create-outline" size={18} color="#F59E0B" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => deleteProjectType(item)} >
                                    <Ionicons name="trash-outline" size={18} color="#EF4444" />
                                </TouchableOpacity>
                            </View>
                        )}

                    </View>

                    <View style={styles.rateGrid}>

                        <RateItem label={t("project.costRate")} value={item.costRate} />
                        <RateItem label={t("project.profitRate")} value={item.profitRate} />
                        <RateItem label={t("project.marginRate")} value={item.marginRate} />
                        <RateItem label={t("project.feedbackRate")} value={item.feedbackRate} />

                    </View>

                </View>

            </TouchableOpacity>

        );

    };

    /* ================= UI ================= */

    return (

        <View style={[styles.container, { backgroundColor: isDark ? "#111827" : "#F9FAFB" }]}>

            <View style={[styles.searchBox, { backgroundColor: isDark ? "#1F2937" : "#F3F4F6" }]}>

                <Ionicons name="search" size={18} color="#9CA3AF" />

                <TextInput
                    placeholder={t("common.keyword")}
                    placeholderTextColor="#9CA3AF"
                    value={search}
                    onChangeText={setSearch}
                    style={[styles.searchInput, { color: isDark ? "#fff" : "#111" }]}
                />

            </View>

            <CreateOrUpdateProjectTypeModal
                visible={modalVisible}
                projectType={editingItem}
                onClose={() => {
                    setModalVisible(false);
                    setEditingItem(undefined);
                }}
                onSubmit={(data) => {
                    editingItem ?
                        updateProjectType(data) :
                        createProjectType(data);
                    setModalVisible(false);
                }}
            />

            <FlatList
                data={projectTypes}
                keyExtractor={(item) => String(item.id)}
                renderItem={renderItem}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.3}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 120 }}
                ListFooterComponent={
                    loadingMore && projectTypes.length > 0
                        ? <ActivityIndicator style={{ marginVertical: 20 }} />
                        : null
                }
                ListEmptyComponent={() => {

                    if (loading) {
                        return <ActivityIndicator style={{ marginTop: 40 }} />;
                    }

                    if (projectTypes.length === 0) {
                        return (
                            <Text style={styles.empty}>
                                {t("common.empty")}
                            </Text>
                        );
                    }

                    return null;

                }}
            />

            <TouchableOpacity
                style={styles.fab}
                onPress={() => {
                    setEditingItem(undefined);
                    setModalVisible(true);
                }}
            >
                <Ionicons name="add" size={26} color="#fff" />
            </TouchableOpacity>

        </View>

    );
}
/* ================= STYLES ================= */

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 16,
    },

    headerBtn: {
        fontSize: 16,
        fontWeight: "600",
        color: "#007AFF",
    },

    searchBox: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        borderRadius: 10,
        marginBottom: 16,
        height: 44,
        gap: 8,
    },

    searchInput: {
        flex: 1,
        fontSize: 14,
    },

    card: {
        borderRadius: 16,
        padding: 16,
        marginBottom: 14,
        elevation: 2,
    },

    checkbox: {
        position: "absolute",
        right: 12,
        top: 12,
    },

    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 14,
    },

    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    iconBox: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: "#EEF2FF",
        alignItems: "center",
        justifyContent: "center",
    },

    code: {
        fontSize: 16,
        fontWeight: "600",
    },

    rateGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },

    rateItem: {
        width: "48%",
        marginBottom: 10,
    },

    rateLabel: {
        fontSize: 12,
        color: "#6B7280",
    },

    rateValue: {
        fontSize: 14,
        fontWeight: "600",
    },

    actions: {
        flexDirection: "row",
        gap: 16,
    },

    empty: {
        textAlign: "center",
        marginTop: 40,
        color: "#9CA3AF",
    },

    fab: {
        position: "absolute",
        bottom: 80,
        right: 30,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: "#6366F1",
        alignItems: "center",
        justifyContent: "center",
        elevation: 4,
    },

});