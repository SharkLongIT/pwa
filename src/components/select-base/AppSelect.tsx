import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    FlatList,
    StyleSheet,
    Pressable,
} from 'react-native';

interface Option {
    label: string;
    value: string;
}

interface AppSelectProps {
    label?: string;
    value?: string | null;
    options: Option[];
    placeholder?: string;
    onChange: (value: string) => void;
    error?: string;
    required?: boolean;
}

const AppSelect: React.FC<AppSelectProps> = ({
    label,
    value,
    options,
    placeholder = 'Chọn...',
    onChange,
    error,
    required,
}) => {
    const [visible, setVisible] = useState(false);

    const selected = options.find(item => item.value === value);

    return (
        <View style={{ marginBottom: 16 }}>
            {/* {required && <Text style={{ color: '#EF4444' }}>* </Text>}
            {label && <Text style={styles.label}>{label} </Text>} */}
            {label && (
                <Text style={styles.label}>
                    {label}
                    {required && <Text style={styles.required}> *</Text>}
                </Text>
            )}
            <TouchableOpacity
                style={[styles.selectBox, error && styles.errorBorder]}
                onPress={() => setVisible(true)}
            >
                <Text style={{ color: selected ? '#111827' : '#9CA3AF' }}>
                    {selected ? selected.label : placeholder}
                </Text>
                <Text style={styles.arrow}>▼</Text>
            </TouchableOpacity>

            {error && <Text style={styles.errorText}>{error}</Text>}

            <Modal visible={visible} transparent animationType="fade">
                <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
                    <View style={styles.dropdown}>
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.option,
                                        item.value === value && styles.selectedOption,
                                    ]}
                                    onPress={() => {
                                        onChange(item.value);
                                        setVisible(false);
                                    }}
                                >
                                    <Text
                                        style={{
                                            color:
                                                item.value === value ? '#4F46E5' : '#111827',
                                        }}
                                    >
                                        {item.label}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
};

export default AppSelect;

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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    arrow: {
        fontSize: 12,
        color: '#6B7280',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        padding: 20,
    },
    dropdown: {
        backgroundColor: '#fff',
        borderRadius: 12,
        maxHeight: 300,
    },
    option: {
        padding: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    selectedOption: {
        backgroundColor: '#EEF2FF',
    },
    errorBorder: {
        borderColor: '#EF4444',
    },
    errorText: {
        marginTop: 4,
        fontSize: 12,
        color: '#EF4444',
    },
    required: {
        color: '#EF4444',
    },
});