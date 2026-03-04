import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

type Props = {
    value: boolean;
    onChange: (v: boolean) => void;
    label: string;
};

export default function RememberMe({ value, onChange, label }: Props) {
    return (
        <Pressable
            style={styles.row}
            onPress={() => onChange(!value)}
        >
            <View style={[styles.checkbox, value && styles.checked]}>
                {value && <Feather name="check" size={14} color="#fff" />}
            </View>
            <Text style={styles.text}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 6,
        borderWidth: 1.5,
        borderColor: '#9CA3AF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checked: {
        backgroundColor: '#2563EB',
        borderColor: '#2563EB',
    },
    text: {
        marginLeft: 8,
        fontSize: 14,
        color: '#374151',
    },
});
