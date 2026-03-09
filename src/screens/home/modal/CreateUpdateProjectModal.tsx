import React, { useEffect, useState } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import DatePickerField from '~/components/date-picker/DatePickerField';
import AppInput from '~/components/input-base/AppInput';
import AppSelect from '~/components/select-base/AppSelect';
import { useTranslation } from 'react-i18next';
import { useCreateProjectForm } from '~/hooks/useCreateProjectForm';
import projectFe from '~/api/projectType.api';
import { showToast } from '~/utils/toast';

interface Props {
    visible: boolean;
    onClose: () => void;
    onSubmit: () => void;
    projectId?: number;
}

const CreateUpdateProjectModal: React.FC<Props> = ({
    visible,
    onClose,
    onSubmit,
    projectId,
}) => {
    const { t } = useTranslation();
    const form = useCreateProjectForm(visible);

    const [loading, setLoading] = useState(false);
    const isEditMode = !!projectId;
    const [projectType, setProjectType] = useState<any>();

    /* ================= LOAD PROJECT WHEN EDIT ================= */

    useEffect(() => {
        if (!visible || !projectId || form.projectTypes.length === 0) return;

        const fetchProject = async () => {
            try {
                setLoading(true);
                const res = await projectFe.getProjectById(projectId);
                const project = res?.data?.result;
                if (!project) return;

                form.setProjectName(project.projectCode);

                // 👇 SỬA COST CHO ĐÚNG FORMAT
                form.handleCostChange(project.cost?.toString() || '');

                form.setDateStart(
                    project.startDate ? new Date(project.startDate) : null
                );

                form.setDateEnd(
                    project.endDate ? new Date(project.endDate) : null
                );
                form.setSlotPayment(project.slotPayment?.toString());
                form.setStatus(project.status?.toString());

                const matchedType = form.projectTypes.find(
                    p => p.code === project.projectType?.code
                );

                if (matchedType) {
                    form.handleSelectProjectType(matchedType.id.toString());
                }
                setProjectType(project.projectType);

            } catch (error) {
                console.error('Error loading project:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [visible, projectId, form.projectTypes]);

    const selectedType = form.projectTypes.find(
        p => p.id.toString() === form.projectTypeId
    );
    console.log(selectedType)

    /* ================= SUBMIT ================= */

    const handleSubmit = async () => {
        if (!form.validateAll()) return;

        let payload: any = {
            projectCode: form.projectName,
            cost: Number(form.costRaw),
            // startDate: form.dateStart,
            // endDate: form.dateEnd,
            startDate: form.dateStart
                ? form.dateStart.toISOString()
                : null,

            endDate: form.dateEnd
                ? form.dateEnd.toISOString()
                : null,
            slotPayment: Number(form.slotPayment),
            projectTypeCode:
                form.projectTypes.find(
                    pt => pt.id.toString() === form.projectTypeId
                )?.code || '',
            status: Number(form.status),

            // costPlan: Number(form.costRaw) * 
        };

        try {
            setLoading(true);

            if (isEditMode) {
                payload.Id = projectId;
                payload.projectType = projectType;
                await projectFe.updateProject(payload);
                showToast('success', t('common.updateSuccess'), '');
            } else {
                const response = await projectFe.createProject(payload);
                const newProjectId = response?.data?.result;

                if (payload.status !== 0) {
                    await projectFe.activateProject(newProjectId);
                }

                showToast('success', t('common.createSuccess'), '');
            }

            onSubmit();
            onClose();

        } catch (error) {
            console.error('Error saving project:', error);
            showToast('error', t('common.error'), '');
        } finally {
            setLoading(false);
        }
    };

    /* ================= UI ================= */

    // return (
    //     <Modal visible={visible} animationType="slide" transparent>
    //         <View style={styles.overlay}>
    //             <View style={styles.container}>
    //                 <Text style={styles.title}>
    //                     {isEditMode
    //                         ? t('project.edit')
    //                         : t('project.create')}
    //                 </Text>

    //                 {loading ? (
    //                     <ActivityIndicator size="large" />
    //                 ) : (
    //                     <ScrollView showsVerticalScrollIndicator={false}>
    //                         <AppInput
    //                             label={t('project.name')}
    //                             placeholder={t('project.namePlaceholder')}
    //                             onChangeText={form.handleChange(
    //                                 'projectName',
    //                                 form.setProjectName
    //                             )}
    //                             value={form.projectName}
    //                             required
    //                             error={form.errors.projectName}
    //                         />

    //                         <AppSelect
    //                             label={t('project.type')}
    //                             placeholder={t('project.typePlaceholder')}
    //                             value={form.projectTypeId}
    //                             options={form.projectTypes.map(p => ({
    //                                 label: p.code,
    //                                 value: p.id.toString(),
    //                             }))}
    //                             onChange={form.handleSelectProjectType}
    //                             required
    //                             error={form.errors.projectTypeId}
    //                         />
    //                         <View style={{ marginBottom: 16 }}>
    //                             <Text style={styles.label}>{t('project.dateStart')} <Text style={styles.required}> *</Text></Text>
    //                             <DatePickerField
    //                                 label={t('project.dateStart')}
    //                                 value={form.dateStart}
    //                                 onChange={form.handleChange('dateStart', form.setDateStart)}
    //                                 error={form.errors.dateStart}
    //                                 minDate={new Date()}
    //                             />
    //                             <Text style={[styles.label, { marginTop: 16 }]}>{t('project.dateEnd')} <Text style={styles.required}> *</Text></Text>
    //                             <DatePickerField
    //                                 label={t('project.dateEnd')}
    //                                 value={form.dateEnd}
    //                                 onChange={form.handleChange('dateEnd', form.setDateEnd)}
    //                                 error={form.errors.dateEnd}
    //                                 minDate={new Date()}
    //                             />
    //                         </View>
    //                         <AppInput
    //                             label={t('project.cost')}
    //                             placeholder={t('project.costPlaceholder')}
    //                             keyboardType="numeric"
    //                             onChangeText={form.handleCostChange}
    //                             value={form.costDisplay}
    //                             required
    //                             error={form.errors.cost}
    //                         />

    //                         <AppInput
    //                             label={t('project.slotPayment')}
    //                             placeholder={t('project.slotPaymentPlaceholder')}
    //                             keyboardType="numeric"
    //                             onChangeText={form.handleChange(
    //                                 'slotPayment',
    //                                 form.setSlotPayment
    //                             )}
    //                             required
    //                             error={form.errors.slotPayment}
    //                             value={form.slotPayment}
    //                         />

    //                         <AppInput
    //                             label={t('project.costPlan')}
    //                             value={form.costPlan}
    //                             editable={false}
    //                             placeholder={t('project.selectTypeToCalculate')}
    //                         />

    //                         <AppInput
    //                             label={t('project.profitPlan')}
    //                             value={form.profitPlan}
    //                             editable={false}
    //                             placeholder={t('project.selectTypeToCalculate')}
    //                         />

    //                         <AppSelect
    //                             label={t('project.status')}
    //                             value={form.status}
    //                             options={[
    //                                 { label: t('project.statusOptions.draft'), value: '0' },
    //                                 { label: t('project.statusOptions.active'), value: '1' },
    //                                 { label: t('project.statusOptions.completed'), value: '2' },
    //                             ]}
    //                             onChange={form.handleChange(
    //                                 'status',
    //                                 form.setStatus
    //                             )}
    //                         />
    //                     </ScrollView>
    //                 )}

    //                 <View style={styles.buttonRow}>
    //                     <TouchableOpacity
    //                         style={styles.cancelBtn}
    //                         onPress={onClose}
    //                     >
    //                         <Text style={styles.cancelText}>
    //                             {t('common.cancel')}
    //                         </Text>
    //                     </TouchableOpacity>

    //                     <TouchableOpacity
    //                         style={styles.saveBtn}
    //                         onPress={handleSubmit}
    //                         disabled={loading}
    //                     >
    //                         <Text style={styles.saveText}>
    //                             {t('common.save')}
    //                         </Text>
    //                     </TouchableOpacity>
    //                 </View>
    //             </View>
    //         </View>
    //     </Modal>
    // );
    const RateItem = ({ label, value }: { label: any, value: any }) => (
        <View style={styles.rateItem}>
            <Text style={styles.rateLabel}>{label}</Text>
            <Text style={styles.rateValue}>{value}%</Text>
        </View>
    );
    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>
                        {isEditMode ? t('project.edit') : t('project.create')}
                    </Text>

                    {loading ? (
                        <ActivityIndicator size="large" />
                    ) : (
                        <ScrollView showsVerticalScrollIndicator={false}>

                            {/* Project Name */}
                            <AppInput
                                label={t('project.name')}
                                placeholder={t('project.namePlaceholder')}
                                value={form.projectName}
                                onChangeText={form.handleChange(
                                    'projectName',
                                    form.setProjectName
                                )}
                                required
                                error={form.errors.projectName}
                            />

                            {/* Project Type */}
                            <AppSelect
                                label={t('project.type')}
                                placeholder={t('project.typePlaceholder')}
                                value={form.projectTypeId}
                                options={form.projectTypes.map(p => ({
                                    label: p.code,
                                    value: p.id.toString(),
                                }))}
                                onChange={form.handleSelectProjectType}
                                required
                                error={form.errors.projectTypeId}
                            />

                            {/* TYPE PREVIEW */}
                            {selectedType && (
                                <View style={styles.typeCard}>
                                    <Text style={styles.typeTitle}>{selectedType.code}</Text>

                                    <View style={styles.rateRow}>
                                        <RateItem
                                            label={t('project.costRate')}
                                            value={selectedType.costRate}
                                        />
                                        <RateItem
                                            label={t('project.profitRate')}
                                            value={selectedType.profitRate}
                                        />
                                    </View>

                                    <View style={styles.rateRow}>
                                        <RateItem
                                            label={t('project.marginRate')}
                                            value={selectedType.marginRate}
                                        />
                                        <RateItem
                                            label={t('project.feedbackRate')}
                                            value={selectedType.feedbackRate}
                                        />
                                    </View>
                                </View>
                            )}

                            {/* Dates */}
                            <View style={styles.dateGroup}>
                                <Text style={styles.label}>
                                    {t('project.dateStart')} <Text style={styles.required}>*</Text>
                                </Text>

                                <DatePickerField
                                    label={t('project.dateStart')}
                                    value={form.dateStart}
                                    onChange={form.handleChange('dateStart', form.setDateStart)}
                                    error={form.errors.dateStart}
                                    minDate={new Date()}
                                />

                                <Text style={[styles.label, { marginTop: 16 }]}>
                                    {t('project.dateEnd')} <Text style={styles.required}>*</Text>
                                </Text>

                                <DatePickerField
                                    label={t('project.dateStart')}
                                    value={form.dateEnd}
                                    onChange={form.handleChange('dateEnd', form.setDateEnd)}
                                    error={form.errors.dateEnd}
                                    minDate={new Date()}
                                />
                            </View>

                            {/* Cost */}
                            <AppInput
                                label={t('project.cost')}
                                placeholder={t('project.costPlaceholder')}
                                keyboardType="numeric"
                                value={form.costDisplay}
                                onChangeText={form.handleCostChange}
                                required
                                error={form.errors.cost}
                            />

                            {/* Slot Payment */}
                            <AppInput
                                label={t('project.slotPayment')}
                                placeholder={t('project.slotPaymentPlaceholder')}
                                keyboardType="numeric"
                                value={form.slotPayment}
                                onChangeText={form.handleChange(
                                    'slotPayment',
                                    form.setSlotPayment
                                )}
                                required
                                error={form.errors.slotPayment}
                            />

                            {/* Plan values */}
                            <AppInput
                                label={t('project.costPlan')}
                                value={form.costPlan}
                                editable={false}
                                placeholder={t('project.selectTypeToCalculate')}
                            />

                            <AppInput
                                label={t('project.profitPlan')}
                                value={form.profitPlan}
                                editable={false}
                                placeholder={t('project.selectTypeToCalculate')}
                            />

                            {/* Status */}
                            <AppSelect
                                label={t('project.status')}
                                value={form.status}
                                options={[
                                    { label: t('project.statusOptions.draft'), value: '0' },
                                    { label: t('project.statusOptions.active'), value: '1' },
                                    { label: t('project.statusOptions.completed'), value: '2' },
                                ]}
                                onChange={form.handleChange('status', form.setStatus)}
                            />

                        </ScrollView>
                    )}

                    {/* BUTTONS */}
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                            <Text style={styles.cancelText}>{t('common.cancel')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.saveBtn}
                            onPress={handleSubmit}
                            disabled={loading}
                        >
                            <Text style={styles.saveText}>{t('common.save')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default CreateUpdateProjectModal;
const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.35)',
        justifyContent: 'center',
        padding: 20,
    },

    container: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 20,
        maxHeight: '90%',
    },

    title: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 16,
    },

    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 6,
        color: '#111827',
    },

    required: {
        color: '#EF4444',
    },

    dateGroup: {
        marginBottom: 12,
    },

    /* TYPE CARD */

    typeCard: {
        backgroundColor: '#F8FAFC',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        marginBottom: 12,
    },

    typeTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 12,
    },

    rateRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },

    rateItem: {
        width: '48%',
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 10,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },

    rateLabel: {
        fontSize: 12,
        color: '#6B7280',
    },

    rateValue: {
        fontSize: 16,
        fontWeight: '700',
        marginTop: 2,
    },

    /* BUTTON */

    buttonRow: {
        flexDirection: 'row',
        marginTop: 14,
    },

    cancelBtn: {
        flex: 1,
        marginRight: 10,
        backgroundColor: '#F3F4F6',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
    },

    saveBtn: {
        flex: 1,
        backgroundColor: '#4F46E5',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
    },

    cancelText: {
        fontWeight: '600',
        color: '#374151',
    },

    saveText: {
        fontWeight: '600',
        color: '#FFF',
    },
});
// const styles = StyleSheet.create({
//     overlay: {
//         flex: 1,
//         backgroundColor: 'rgba(0,0,0,0.4)',
//         justifyContent: 'center',
//         padding: 20,
//     },
//     container: {
//         backgroundColor: '#fff',
//         borderRadius: 16,
//         padding: 20,
//         maxHeight: '85%',
//     },
//     title: {
//         fontSize: 18,
//         fontWeight: '700',
//         marginBottom: 16,
//     },
//     label: {
//         fontSize: 14,
//         fontWeight: '600',
//         marginBottom: 6,
//         color: '#111827',
//     },
//     buttonRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginTop: 10,
//     },
//     cancelBtn: {
//         flex: 1,
//         marginRight: 10,
//         padding: 12,
//         borderRadius: 10,
//         backgroundColor: '#F3F4F6',
//         alignItems: 'center',
//     },
//     saveBtn: {
//         flex: 1,
//         padding: 12,
//         borderRadius: 10,
//         backgroundColor: '#4F46E5',
//         alignItems: 'center',
//     },
//     cancelText: {
//         color: '#374151',
//         fontWeight: '600',
//     },
//     saveText: {
//         color: '#fff',
//         fontWeight: '600',
//     },
//     required: {
//         color: '#EF4444',
//     },
//     previewCard: {
//         marginTop: 12,
//         padding: 16,
//         borderRadius: 12,
//         backgroundColor: "#F9FAFB",
//         borderWidth: 1,
//         borderColor: "#E5E7EB",
//     },

//     previewTitle: {
//         fontSize: 16,
//         fontWeight: "600",
//         marginBottom: 12,
//     },

//     previewGrid: {
//         flexDirection: "row",
//         flexWrap: "wrap",
//         gap: 12,
//     },

//     previewItem: {
//         width: "48%",
//     },

//     previewLabel: {
//         fontSize: 12,
//         color: "#6B7280",
//     },

//     previewValue: {
//         fontSize: 16,
//         fontWeight: "600",
//         marginTop: 2,
//     },
// });