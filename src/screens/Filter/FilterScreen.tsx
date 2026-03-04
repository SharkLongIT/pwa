import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderMain from '~/components/layout/base-header/header-main';
import { useAppColors } from '~/hooks/useAppColors';
import { appColors } from '~/utils/constants/appColors';

const categories = ['Tất cả', 'Điện tử', 'Thời trang', 'Gia dụng'];

const FilterScreen = () => {
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('Tất cả');
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');
    const [sort, setSort] = useState<'new' | 'price'>('new');
    const { t } = useTranslation();
    const colors = useAppColors();
    return (
        <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
            <HeaderMain title={t('tab.search')} />
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                {/* SEARCH */}
                <Text style={[styles.label, { color: colors.textPrimary }]}>{t('common.keyword')}</Text>
                <TextInput
                    placeholder={t('common.enterKeyword')}
                    value={keyword}
                    onChangeText={setKeyword}
                    style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.textPrimary }]}
                />

                {/* CATEGORY */}
                {/* <Text style={styles.label}>Danh mục</Text>
                <View style={styles.row}>
                    {categories.map(item => (
                        <TouchableOpacity
                            key={item}
                            style={[
                                styles.chip,
                                category === item && styles.chipActive,
                            ]}
                            onPress={() => setCategory(item)}
                        >
                            <Text
                                style={[
                                    styles.chipText,
                                    category === item && styles.chipTextActive,
                                ]}
                            >
                                {item}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View> */}

                {/* PRICE */}
                {/* <Text style={styles.label}>Khoảng giá</Text>
                <View style={styles.row}>
                    <TextInput
                        placeholder="Từ"
                        keyboardType="numeric"
                        value={priceFrom}
                        onChangeText={setPriceFrom}
                        style={[styles.input, styles.priceInput]}
                    />
                    <TextInput
                        placeholder="Đến"
                        keyboardType="numeric"
                        value={priceTo}
                        onChangeText={setPriceTo}
                        style={[styles.input, styles.priceInput]}
                    />
                </View> */}

                {/* SORT */}
                {/* <Text style={styles.label}>Sắp xếp</Text>
                <View style={styles.row}>
                    <TouchableOpacity
                        style={[
                            styles.sortItem,
                            sort === 'new' && styles.sortActive,
                        ]}
                        onPress={() => setSort('new')}
                    >
                        <Text
                            style={[
                                styles.sortText,
                                sort === 'new' && styles.sortTextActive,
                            ]}
                        >
                            Mới nhất
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.sortItem,
                            sort === 'price' && styles.sortActive,
                        ]}
                        onPress={() => setSort('price')}
                    >
                        <Text
                            style={[
                                styles.sortText,
                                sort === 'price' && styles.sortTextActive,
                            ]}
                        >
                            Giá thấp
                        </Text>
                    </TouchableOpacity>
                </View> */}

                {/* ACTION */}
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.resetBtn}>
                        <Text style={styles.resetText}>{t('common.reset')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.applyBtn}>
                        <Text style={styles.applyText}>{t('common.apply')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default FilterScreen;

/* -------------------- Styles -------------------- */
const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },

    container: {
        flex: 1,
        padding: 16,
    },

    label: {
        fontSize: 13,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
        marginTop: 12,
    },

    input: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 14,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },

    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },

    chip: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 20,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },

    chipActive: {
        backgroundColor: appColors.primary,
        borderColor: appColors.primary,
    },

    chipText: {
        fontSize: 13,
        color: '#374151',
    },

    chipTextActive: {
        color: '#fff',
        fontWeight: '600',
    },

    priceInput: {
        flex: 1,
    },

    sortItem: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 12,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        alignItems: 'center',
    },

    sortActive: {
        backgroundColor: appColors.primary,
        borderColor: appColors.primary,
    },

    sortText: {
        fontSize: 14,
        color: '#374151',
        fontWeight: '500',
    },

    sortTextActive: {
        color: '#fff',
        fontWeight: '600',
    },

    actions: {
        flexDirection: 'row',
        marginTop: 'auto',
        gap: 12,
        paddingBottom: 60,
    },

    resetBtn: {
        flex: 1,
        backgroundColor: '#E5E7EB',
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center',
    },

    resetText: {
        color: '#374151',
        fontWeight: '600',
    },

    applyBtn: {
        flex: 1,
        backgroundColor: appColors.primary,
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center',
    },

    applyText: {
        color: '#fff',
        fontWeight: '600',
    },
});
