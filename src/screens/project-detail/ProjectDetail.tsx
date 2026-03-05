// import React, { use, useEffect, useLayoutEffect } from 'react';
// import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Pressable } from 'react-native';
// import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useAppColors } from '~/hooks/useAppColors';
// import projectFe from '~/api/projectType.api';
// import { getStatusColor, getStatusText } from '~/utils/helper/status';
// import { useTranslation } from 'react-i18next';
// import { formatCurrency, formatDate } from '~/utils/format/formatCurrency';
// import { BaseContent } from '~/components/base-screen/BaseContent';
// import Vi from '~/i18n/locales/vi';
// import { appColors } from '~/utils/constants/appColors';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { MainParamList } from '~/navigation/MainNavigator';

// const ProjectDetailScreen = () => {
//     const navigation = useNavigation<NativeStackNavigationProp<MainParamList>>();

//     const { t } = useTranslation();
//     const route = useRoute<any>();
//     const [project, setProject] = React.useState<any>(null);
//     const { projectId } = route.params;
//     const colors = useAppColors();
//     const [loading, setLoading] = React.useState(false);
//     const [editing, setEditing] = React.useState(false);

//     useEffect(() => {
//         const fetchProject = async () => {
//             try {
//                 setLoading(true);
//                 const res = await projectFe.getProjectById(projectId);
//                 // console.log('Project Detail:', res?.data?.result);
//                 setProject(res?.data?.result);
//             } catch (error) {
//                 console.error('Error fetching project:', error);
//             } finally {
//                 setLoading(false);
//             }

//         };
//         fetchProject();
//     }, [projectId]);

//     useLayoutEffect(() => {
//         navigation.setOptions({
//             headerRight: () => {
//                 if (project?.status !== 0) return null;

//                 return (
//                     <Pressable
//                         disabled={loading}
//                         onPress={onToggleActive}
//                     >
//                         <Text
//                             style={[
//                                 styles.textTitle,
//                                 loading && { opacity: 0.5 },
//                             ]}
//                         >
//                             {/* {editing ?  */}
//                             {t('project.statusOptions.active')}
//                             {/* : t('common.edit')} */}
//                         </Text>
//                     </Pressable>
//                 );
//             },
//         });
//     }, [navigation, project?.status, editing, loading]);

//     const onToggleActive = async () => {
//         try {
//             setLoading(true);
//             // console.log('Activating project with ID:', projectId);
//             await projectFe.activateProject(projectId);
//             //navigation.navigate("PaymentSchedule", { projectId } as never);

//             // setProject((prev: any) => prev ? { ...prev, status: 1 } : prev);
//         } catch (error) {
//             console.error('Error updating project status:', error);
//         } finally {
//             setLoading(false);

//         }
//     }

//     const calculateTimeProgress = () => {
//         if (!project?.startDate || !project?.endDate) return 0;

//         const now = new Date().getTime();
//         const start = new Date(project.startDate).getTime();
//         const end = new Date(project.endDate).getTime();

//         if (end <= start) return 0;

//         const percent = ((now - start) / (end - start)) * 100;
//         return Math.min(Math.max(percent, 0), 100);
//     };

//     const calculateCostProgress = () => {
//         if (!project?.costPlan || !project?.cost) return 0;
//         if (project.costPlan === 0) return 0;

//         const percent = (project.cost / project.costPlan) * 100;
//         return Math.min(Math.max(percent, 0), 100);
//     };

//     const timeProgress = calculateTimeProgress();
//     const costProgress = calculateCostProgress();

//     return (
//         <BaseContent style={{ flex: 1, backgroundColor: colors.background }}>
//             {/* {loading ? (

//                 <View style={styles.center}>
//                     <ActivityIndicator size="large" />
//                 </View>
//             ) : !project ? (
//                 <View style={styles.center}>
//                     <Text>Không tìm thấy dự án</Text>
//                 </View>
//             ) : ( */}
//             <ScrollView
//                 contentContainerStyle={styles.container}
//                 showsVerticalScrollIndicator={false}
//             >
//                 {/* HEADER */}
//                 <View style={[styles.headerCard, { backgroundColor: colors.card }]}>
//                     <View>
//                         <Text style={[styles.projectCode, { color: colors.textPrimary }]}>
//                             {project?.projectCode}
//                         </Text>

//                         <Text style={styles.dateText}>
//                             {formatDate(project?.startDate)} - {formatDate(project?.endDate)}
//                         </Text>

//                         <Text style={styles.dateText}>
//                             {t('project.slotPayment')}: {project?.slotPayment}
//                         </Text>

//                         <Text style={styles.dateText}>
//                             {t('project.costPlan')}: {formatCurrency(project?.costPlan)}
//                         </Text>

//                         <Text style={styles.dateText}>
//                             {t('project.profitPlan')}: {formatCurrency(project?.profitPlan)}
//                         </Text>
//                     </View>

//                     <View
//                         style={[
//                             styles.statusBadge,
//                             { backgroundColor: getStatusColor(project?.status) },
//                         ]}
//                     >
//                         <Text style={styles.statusText}>
//                             {getStatusText(project?.status)}
//                         </Text>
//                     </View>
//                 </View>

//                 {/* TIMELINE */}
//                 <View style={[styles.card, { backgroundColor: colors.card }]}>
//                     <Text style={styles.cardTitle}>
//                         📅 {t('project.timeline')}
//                     </Text>

//                     <View style={styles.progressBar}>
//                         <View
//                             style={[
//                                 styles.progressFillBlue,
//                                 { width: `${timeProgress}%` },
//                             ]}
//                         />
//                     </View>

//                     <Text style={styles.progressText}>
//                         {timeProgress.toFixed(1)}%
//                     </Text>
//                 </View>

//                 {/* FINANCE */}
//                 <View style={[styles.card, { backgroundColor: colors.card }]}>
//                     <Text style={styles.cardTitle}>
//                         💰 {t('project.finance')}
//                     </Text>

//                     <View style={styles.row}>
//                         <Text style={styles.label}>{t('project.cost')}</Text>
//                         <Text style={styles.value}>
//                             {formatCurrency(project?.cost)}
//                         </Text>
//                     </View>

//                     <View style={styles.row}>
//                         <Text style={styles.label}>{t('project.costPlan')}</Text>
//                         <Text style={styles.value}>
//                             {formatCurrency(project?.costPlan)}
//                         </Text>
//                     </View>

//                     <View style={styles.progressBar}>
//                         <View
//                             style={[
//                                 styles.progressFill,
//                                 {
//                                     width: `${costProgress}%`,
//                                     backgroundColor:
//                                         costProgress > 100 ? '#DC2626' : '#22C55E',
//                                 },
//                             ]}
//                         />
//                     </View>

//                     <Text style={styles.progressText}>
//                         {costProgress.toFixed(1)}% Cost / Plan
//                     </Text>
//                 </View>
//                 <View style={[styles.card, { backgroundColor: colors.card }]}>
//                     <Text style={styles.cardTitle}>
//                         📈 {t('project.type')}
//                     </Text>
//                     <Text style={styles.dateText}>
//                         {t('project.code')} :  {project?.projectType?.code}
//                     </Text>
//                     <Text style={styles.dateText}>
//                         {t('project.costRate')} : {project?.projectType?.costRate} %
//                     </Text>
//                     <Text style={styles.dateText}>
//                         {t('project.profitRate')} : {project?.projectType?.profitRate} %
//                     </Text>
//                     <Text style={styles.dateText}>
//                         {t('project.marginRate')} : {project?.projectType?.marginRate} %
//                     </Text>

//                 </View>
//             </ScrollView>
//             {/* )} */}
//         </BaseContent>
//     );
// };

// export default ProjectDetailScreen;
// const styles = StyleSheet.create({
//     safe: {
//         flex: 1,
//         backgroundColor: appColors.background,
//     },
//     container: {
//         padding: 16,
//     },
//     textTitle: {
//         fontSize: 16,
//         fontWeight: '600',
//         color: appColors.primary,
//     },
//     center: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     headerCard: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         borderRadius: 12,
//         padding: 16,
//         marginBottom: 16,
//     },
//     projectCode: {
//         fontSize: 20,
//         fontWeight: 'bold',
//     },
//     dateText: {
//         fontSize: 14,
//         color: '#64748B',
//         marginTop: 4,
//     },
//     statusBadge: {
//         paddingVertical: 4,
//         paddingHorizontal: 8,
//         borderRadius: 8,
//     },
//     statusText: {
//         color: '#fff',
//         fontSize: 12,
//     },
//     card: {
//         borderRadius: 12,
//         padding: 16,
//         marginBottom: 16,
//     },
//     cardTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 12,
//     },
//     row: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginBottom: 8,
//     },
//     label: {
//         fontSize: 14,
//         color: '#64748B',
//     },
//     value: {
//         fontSize: 14,
//         fontWeight: 'bold',
//     },
//     progressBar: {
//         height: 10,
//         backgroundColor: '#E5E7EB',
//         borderRadius: 5,
//         overflow: 'hidden',
//         marginTop: 8,
//     },
//     progressFill: {
//         height: '100%',
//     },
//     progressFillBlue: {
//         height: '100%',
//         backgroundColor: '#3B82F6',
//     },
//     progressText: {
//         fontSize: 12,
//         color: '#64748B',
//         marginTop: 4,
//     },

// });
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
import { Pressable, StyleSheet, Text, Alert, Platform, ActionSheetIOS } from 'react-native';
import { appColors } from '~/utils/constants/appColors';
import CreateUpdateProjectModal from '../home/modal/CreateUpdateProjectModal';
import { showToast } from '~/utils/toast';
import { appEvent } from '~/utils/appEvent';
import { EVENT } from '~/utils/enum';

const Tab = createMaterialTopTabNavigator();

const ProjectDetailScreen = () => {
    const { t } = useTranslation();
    const route = useRoute<any>();
    const { projectId } = route.params;
    const [project, setProject] = useState<any>(null);
    const navigation = useNavigation<NativeStackNavigationProp<MainParamList>>();
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const fetch = async () => {
        const res = await projectFe.getProjectDetail(projectId);
        setProject(res?.data?.result);
    };

    useEffect(() => {
        fetch();
    }, [projectId]);

    const onOpenActionMenu = () => {
        if (!project) return;

        const options = [
            t("common.edit"),
            t("common.delete"),
            t("common.cancel"),
        ];

        const cancelButtonIndex = 2;
        const destructiveButtonIndex = 1;

        if (Platform.OS === "ios") {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options,
                    cancelButtonIndex,
                    destructiveButtonIndex,
                },
                (buttonIndex) => {
                    if (buttonIndex === 0) {
                        handleEdit();
                    } else if (buttonIndex === 1) {
                        handleDelete();
                    }
                }
            );
        } else {
            Alert.alert(
                t("common.action"),
                "",
                [
                    { text: t("common.edit"), onPress: handleEdit },
                    {
                        text: t("common.delete"),
                        style: "destructive",
                        onPress: handleDelete,
                    },
                    { text: t("common.cancel"), style: "cancel" },
                ]
            );
        }
    };
    const handleEdit = () => {
        setModalVisible(true);
    };

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
                if (project?.status !== 0) return null;

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
                <BaseContent style={{ flex: 1 }}>
                    <Tab.Navigator>
                        <Tab.Screen name="Overview" component={OverviewTab} options={{ title: t('project.overview') }} />
                        <Tab.Screen name="Payment" component={PaymentTab} options={{ title: t('project.paymentSchedule') }} />
                        {/* <Tab.Screen name="Finance" component={FinanceTab} /> */}
                    </Tab.Navigator>
                </BaseContent>
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