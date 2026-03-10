export const formatCurrency = (value: string) => {
    if (!value) return '';

    const number = parseInt(value, 10);
    if (isNaN(number)) return '';

    return number.toLocaleString('vi-VN');
};

export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};

export const formatMoney = (value: number | string) => {

    if (value === null || value === undefined) return "";

    const number = Number(value);

    return new Intl.NumberFormat("vi-VN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(number);


};