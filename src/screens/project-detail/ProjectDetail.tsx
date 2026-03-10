import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { BaseContent } from '~/components/base-screen/BaseContent';
import OverviewTab from './tabs/OverviewTab';
import PaymentTab from './tabs/PaymentTab';
import FinanceTab from './tabs/FinanceTab';
import projectFe from '~/api/projectType.api';
import { ProjectProvider } from './ProjectContext';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainParamList } from '~/navigation/MainNavigator';
import { Pressable, StyleSheet, Text, Alert, Platform, ActionSheetIOS, Modal, TouchableOpacity, View } from 'react-native';
import { appColors } from '~/utils/constants/appColors';
import CreateUpdateProjectModal from '../home/modal/CreateUpdateProjectModal';
import { showToast } from '~/utils/toast';
import { appEvent } from '~/utils/appEvent';
import { EVENT } from '~/utils/enum';
import { useAppColors } from '~/hooks/useAppColors';

const Tab = createMaterialTopTabNavigator();

const ProjectDetailScreen = () => {
    const { t } = useTranslation();
    const route = useRoute<any>();
    const colors = useAppColors();
    const { projectId } = route.params;
    const [project, setProject] = useState<any>(null);
    const navigation = useNavigation<NativeStackNavigationProp<MainParamList>>();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [bottomSheetVisible, setBottomSheetVisible] = useState<boolean>(false);
    const fetch = async () => {
        const res = await projectFe.getProjectDetail(projectId);
        setProject(res?.data?.result);
    };

    useEffect(() => {
        fetch();
    }, [projectId]);

    const statusMap: Record<number, string> = {
        0: t("project.statusOptions.active"),
        1: t("project.statusOptions.completed"),
    };

    const statusLabel = statusMap[project?.status];
    const onOpenActionMenu = () => {
        if (!project) return;


        const options = [
            ...(statusLabel ? [statusLabel] : []),
            t("common.edit"),
            t("common.delete"),
            t("common.cancel"),
        ];

        const cancelButtonIndex = options.length - 1;
        const destructiveButtonIndex = options.indexOf(t("common.delete"));

        if (Platform.OS === "ios") {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options,
                    cancelButtonIndex,
                    destructiveButtonIndex,
                },
                (buttonIndex) => {

                    if (statusLabel) {
                        if (buttonIndex === 0) {
                            handleActive();
                            return;
                        }
                        if (buttonIndex === 1) {
                            handleEdit();
                            return;
                        }
                        if (buttonIndex === 2) {
                            handleDelete();
                            return;
                        }
                    }
                    else {
                        if (buttonIndex === 0) {
                            handleEdit();
                            return;
                        }
                        if (buttonIndex === 1) {
                            handleDelete();
                            return;
                        }
                    }
                }
            );
        }
        else {
            setBottomSheetVisible(true);
        }
    };

    const handleEdit = () => {
        setModalVisible(true);
    };
    const handleActive = async () => {
        if (project.status === 0) {
            await projectFe.activateProject(projectId);
        } else if (project.status === 1) {
            const payload = {
                Id: projectId,
                status: 2
            }
            await projectFe.updateStatusProject(payload)
        }
        showToast("success", (t('common.updateSuccess')), '')
        fetch();
        appEvent.emit(EVENT.PROJECT_CREATED);
    }

    const handleDelete = async () => {
        Alert.alert(
            t('common.confirmDeleteTitle'),
            t('common.confirmDeleteMessage'),
            [
                {
                    text: t('common.cancel'),
                    style: "cancel",
                },
                {
                    text: t('common.delete'),
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await projectFe.deleteProject(projectId);
                            showToast("success", t('common.deleteSuccess'), '');
                            navigation.goBack();
                            appEvent.emit(EVENT.PROJECT_CREATED);
                        } catch (error) {
                            console.error("Delete error", error);
                        }
                    }
                }
            ],
            { cancelable: true }
        );
    };
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                // if (project?.status !== 0) return null;

                return (
                    <Pressable onPress={onOpenActionMenu}>
                        <Text style={styles.textTitle}>
                            ⋯
                        </Text>
                    </Pressable>
                );
            },
        });
    }, [navigation, project?.status]);


    return (
        <>
            <Modal
                transparent
                animationType="slide"
                visible={bottomSheetVisible}
                onRequestClose={() => setBottomSheetVisible(false)}
            >
                <TouchableOpacity
                    style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' }}
                    activeOpacity={1}
                    onPress={() => setBottomSheetVisible(false)}
                />
                <View
                    style={{
                        backgroundColor: '#fff',
                        padding: 16,
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                    }}
                >
                    {statusLabel && (
                        <TouchableOpacity
                            onPress={() => {
                                handleActive();
                                setBottomSheetVisible(false);
                            }}
                        >
                            <Text style={{ padding: 12 }}>
                                {statusLabel}
                            </Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity
                        onPress={() => {
                            handleEdit();
                            setBottomSheetVisible(false);
                        }}
                    >
                        <Text style={{ padding: 12 }}>{t('common.edit')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            handleDelete();
                            setBottomSheetVisible(false);
                        }}
                    >
                        <Text style={{ padding: 12, color: 'red' }}>{t('common.delete')}</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <CreateUpdateProjectModal
                visible={modalVisible}
                projectId={projectId}
                onClose={() => setModalVisible(false)}
                onSubmit={() => {
                    setModalVisible(false);
                    fetch();
                }}
            />
            <ProjectProvider value={project}>
                {/* <BaseContent style={{ flex: 1 }}> */}
                <Tab.Navigator screenOptions={{
                    tabBarStyle: { backgroundColor: colors.background }
                }}>
                    <Tab.Screen name="Overview" component={OverviewTab} options={{ title: t('project.overview'), tabBarLabelStyle: { color: colors.textPrimary } }} />
                    <Tab.Screen name="Payment" component={PaymentTab} options={{ title: t('project.paymentSchedule'), tabBarLabelStyle: { color: colors.textPrimary } }} />
                    {/* <Tab.Screen name="Finance" component={FinanceTab} /> */}
                </Tab.Navigator>
                {/* </BaseContent> */}
            </ProjectProvider>
        </>

    );
};
export default ProjectDetailScreen;
const styles = StyleSheet.create({
    textTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: appColors.primary,

    },
})