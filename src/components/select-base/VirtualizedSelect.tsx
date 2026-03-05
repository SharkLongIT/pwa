import React, { useState, useMemo, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    FlatList,
    StyleSheet,
    TextInput,
    Pressable,
    ListRenderItem,
} from 'react-native';

interface Option {
    label: string;
    value: string;
}

interface Props {
    label?: string;
    value?: string;
    options: Option[];
    onChange: (value: string) => void;
    placeholder?: string;
}

const ITEM_HEIGHT = 50;

const VirtualizedSelect: React.FC<Props> = ({
    label,
    value,
    options,
    onChange,
    placeholder = 'Chọn...',
}) => {
    const [visible, setVisible] = useState(false);
    const [search, setSearch] = useState('');

    const selected = useMemo(
        () => options.find(o => o.value === value),
        [value, options]
    );

    // 🔥 Filter tối ưu
    const filteredData = useMemo(() => {
        if (!search) return options;

        return options.filter(o =>
            o.label.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, options]);

    // 🔥 Render item memo
    const renderItem: ListRenderItem<Option> = useCallback(
        ({ item }) => {
            const isSelected = item.value === value;

            return (
                <TouchableOpacity
                    style={[
                        styles.item,
                        isSelected && styles.selectedItem,
                    ]}
                    onPress={() => {
                        onChange(item.value);
                        setVisible(false);
                    }}
                >
                    <Text style={{ color: isSelected ? '#4F46E5' : '#111' }}>
                        {item.label}
                    </Text>
                </TouchableOpacity>
            );
        },
        [value, onChange]
    );

    const keyExtractor = useCallback((item: Option) => item.value, []);

    return (
        <View style={{ marginBottom: 16 }}>
            {label && <Text style={styles.label}>{label}</Text>}

            <TouchableOpacity
                style={styles.selectBox}
                onPress={() => setVisible(true)}
            >
                <Text style={{ color: selected ? '#111' : '#9CA3AF' }}>
                    {selected ? selected.label : placeholder}
                </Text>
                <Text>▼</Text>
            </TouchableOpacity>

            <Modal visible={visible} animationType="slide">
                <View style={styles.modalContainer}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Chọn</Text>
                        <TouchableOpacity onPress={() => setVisible(false)}>
                            <Text style={{ color: '#EF4444' }}>Đóng</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Search */}
                    <TextInput
                        placeholder="Tìm kiếm..."
                        style={styles.searchInput}
                        value={search}
                        onChangeText={setSearch}
                    />

                    {/* 🚀 Virtualized FlatList */}
                    <FlatList
                        data={filteredData}
                        keyExtractor={keyExtractor}
                        renderItem={renderItem}
                        initialNumToRender={20}
                        maxToRenderPerBatch={20}
                        windowSize={10}
                        removeClippedSubviews
                        getItemLayout={(_, index) => ({
                            length: ITEM_HEIGHT,
                            offset: ITEM_HEIGHT * index,
                            index,
                        })}
                    />
                </View>
            </Modal>
        </View>
    );
};

export default VirtualizedSelect;

const styles = StyleSheet.create({
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 6,
    },
    selectBox: {
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 48,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '700',
    },
    searchInput: {
        margin: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 10,
        paddingHorizontal: 12,
        height: 44,
    },
    item: {
        height: ITEM_HEIGHT,
        justifyContent: 'center',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    selectedItem: {
        backgroundColor: '#EEF2FF',
    },
});