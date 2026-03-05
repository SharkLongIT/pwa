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

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>
                        {isEditMode
                            ? t('project.edit')
                            : t('project.create')}
                    </Text>

                    {loading ? (
                        <ActivityIndicator size="large" />
                    ) : (
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <AppInput
                                label={t('project.name')}
                                onChangeText={form.handleChange(
                                    'projectName',
                                    form.setProjectName
                                )}
                                value={form.projectName}
                                required
                                error={form.errors.projectName}
                            />

                            <AppSelect
                                label={t('project.type')}
                                value={form.projectTypeId}
                                options={form.projectTypes.map(p => ({
                                    label: p.code,
                                    value: p.id.toString(),
                                }))}
                                onChange={form.handleSelectProjectType}
                                required
                                error={form.errors.projectTypeId}
                            />

                            {/* <DatePickerField
                                label={t('project.dateStart')}
                                value={form.dateStart}
                                onChange={form.handleChange(
                                    'dateStart',
                                    form.setDateStart
                                )}
                                error={form.errors.dateStart}
                            />

                            <DatePickerField
                                label={t('project.dateEnd')}
                                value={form.dateEnd}
                                onChange={form.handleChange(
                                    'dateEnd',
                                    form.setDateEnd
                                )}
                                error={form.errors.dateEnd}
                            /> */}
                            <View style={{ marginBottom: 16 }}>
                                <Text style={styles.label}>{t('project.dateStart')} <Text style={styles.required}> *</Text></Text>
                                <DatePickerField
                                    label={t('project.dateStart')}
                                    value={form.dateStart}
                                    onChange={form.handleChange('dateStart', form.setDateStart)}
                                    error={form.errors.dateStart}
                                />
                                <Text style={[styles.label, { marginTop: 16 }]}>{t('project.dateEnd')} <Text style={styles.required}> *</Text></Text>
                                <DatePickerField
                                    label={t('project.dateEnd')}
                                    value={form.dateEnd}
                                    onChange={form.handleChange('dateEnd', form.setDateEnd)}
                                    error={form.errors.dateEnd}
                                />
                            </View>
                            <AppInput
                                label={t('project.cost')}
                                keyboardType="numeric"
                                onChangeText={form.handleCostChange}
                                value={form.costDisplay}
                                required
                                error={form.errors.cost}
                            />

                            <AppInput
                                label={t('project.slotPayment')}
                                keyboardType="numeric"
                                onChangeText={form.handleChange(
                                    'slotPayment',
                                    form.setSlotPayment
                                )}
                                required
                                error={form.errors.slotPayment}
                                value={form.slotPayment}
                            />

                            <AppInput
                                label={t('project.costPlan')}
                                value={form.costPlan}
                                editable={false}
                            />

                            <AppInput
                                label={t('project.profitPlan')}
                                value={form.profitPlan}
                                editable={false}
                            />

                            <AppSelect
                                label={t('project.status')}
                                value={form.status}
                                options={[
                                    { label: t('project.statusOptions.draft'), value: '0' },
                                    { label: t('project.statusOptions.active'), value: '1' },
                                    { label: t('project.statusOptions.completed'), value: '2' },
                                ]}
                                onChange={form.handleChange(
                                    'status',
                                    form.setStatus
                                )}
                            />
                        </ScrollView>
                    )}

                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={styles.cancelBtn}
                            onPress={onClose}
                        >
                            <Text style={styles.cancelText}>
                                {t('common.cancel')}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.saveBtn}
                            onPress={handleSubmit}
                            disabled={loading}
                        >
                            <Text style={styles.saveText}>
                                {t('common.save')}
                            </Text>
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
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        padding: 20,
    },
    container: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        maxHeight: '85%',
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 6,
        color: '#111827',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    cancelBtn: {
        flex: 1,
        marginRight: 10,
        padding: 12,
        borderRadius: 10,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
    },
    saveBtn: {
        flex: 1,
        padding: 12,
        borderRadius: 10,
        backgroundColor: '#4F46E5',
        alignItems: 'center',
    },
    cancelText: {
        color: '#374151',
        fontWeight: '600',
    },
    saveText: {
        color: '#fff',
        fontWeight: '600',
    },
    required: {
        color: '#EF4444',
    },
});