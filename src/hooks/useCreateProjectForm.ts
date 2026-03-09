import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import projectFe from '~/api/projectType.api';
import { formatCurrency } from '~/utils/format/formatCurrency';

export const useCreateProjectForm = (visible: boolean) => {

    const { t } = useTranslation();

    const [projectTypes, setProjectTypes] = useState<any[]>([]);

    const [projectName, setProjectName] = useState('');
    const [costRaw, setCostRaw] = useState('');
    const [costDisplay, setCostDisplay] = useState('');
    const [slotPayment, setSlotPayment] = useState('');
    const [projectTypeId, setProjectTypeId] = useState<string | null>(null);
    const [status, setStatus] = useState('0');
    const [dateStart, setDateStart] = useState<Date | null>(null);
    const [dateEnd, setDateEnd] = useState<Date | null>(null);

    const [costRate, setCostRate] = useState<number | null>(null);
    const [profitRate, setProfitRate] = useState<number | null>(null);

    const [errors, setErrors] = useState<Record<string, string>>({});

    // ================= FETCH =================

    useEffect(() => {
        if (visible) fetchProjectTypes();
        else resetForm();
    }, [visible]);

    const fetchProjectTypes = async () => {
        try {
            const { data } = await projectFe.getProjectTypes();
            if (data.success) setProjectTypes(data.result);
        } catch (err) {
            console.log(err);
        }
    };

    const resetForm = () => {
        setProjectName('');
        setCostRaw('');
        setCostDisplay('');
        setSlotPayment('');
        setProjectTypeId(null);
        setStatus('0');
        setDateStart(null);
        setDateEnd(null);
        setCostRate(null);
        setProfitRate(null);
        setErrors({});
    };

    // ================= VALIDATE =================

    const validateField = (field: string, value: any) => {
        let message = '';

        switch (field) {
            case 'projectName':
                if (!value) message = t('project.nameError');
                break;
            case 'cost':
                if (!value) message = t('project.costError');
                break;
            case 'slotPayment':
                if (!value) message = t('project.slotPaymentError');
                break;
            case 'projectTypeId':
                if (!value) message = t('project.typeError');
                break;
            case 'dateStart':
                if (!value) message = t('project.dateStartError');
                break;
            case 'dateEnd':
                if (!value) message = t('project.dateEndError');
                break;
        }

        setErrors(prev => ({
            ...prev,
            [field]: message,
        }));

        return message === '';
    };

    const validateAll = () => {
        const results = [
            validateField('projectName', projectName),
            validateField('cost', costRaw),
            validateField('slotPayment', slotPayment),
            validateField('projectTypeId', projectTypeId),
            validateField('dateStart', dateStart),
            validateField('dateEnd', dateEnd),
        ];

        return results.every(Boolean);
    };

    // ================= HANDLERS =================

    const handleChange =
        (field: string, setter: (val: any) => void) =>
            (value: any) => {
                setter(value);

                if (errors[field]) {
                    validateField(field, value);
                }
            };

    const handleCostChange = (text: string) => {
        const cleaned = text.replace(/\D/g, '');

        setCostRaw(cleaned);
        setCostDisplay(formatCurrency(cleaned));

        if (errors['cost']) {
            validateField('cost', cleaned);
        }
    };

    const handleSelectProjectType = (value: string) => {
        setProjectTypeId(value);

        const selected = projectTypes.find(
            p => p.id.toString() === value
        );

        if (selected) {
            setCostRate(selected.costRate);
            setProfitRate(selected.profitRate);
        }

        if (errors['projectTypeId']) {
            validateField('projectTypeId', value);
        }
    };

    // ================= DERIVED =================

    const costPlan = useMemo(() => {
        const costNumber = parseInt(costRaw, 10);
        if (!isNaN(costNumber) && costRate !== null) {
            return formatCurrency((costNumber * costRate / 100).toString());
        }
        return '';
    }, [costRaw, costRate]);

    const profitPlan = useMemo(() => {
        const costNumber = parseInt(costRaw, 10);
        if (!isNaN(costNumber) && profitRate !== null) {
            return formatCurrency((costNumber * profitRate / 100).toString());
        }
        return '';
    }, [costRaw, profitRate]);

    return {
        // state
        projectTypes,
        projectName,
        costRaw,
        costDisplay,
        slotPayment,
        projectTypeId,
        status,
        dateStart,
        dateEnd,
        costPlan,
        profitPlan,
        errors,

        setProjectName,
        setDateStart,
        setDateEnd,
        setSlotPayment,
        setProjectTypeId,
        setStatus,

        // handlers
        handleChange,
        handleCostChange,
        handleSelectProjectType,
        validateAll,

        //handleSubmit,

    };
};