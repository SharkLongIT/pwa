import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from 'react';

import { Text } from "react-native-paper";

type Props = {
    title: string;
    onpress?: () => void;
}
const BaseButton: React.FC<Props> = ({ title, onpress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onpress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

export default BaseButton;

const styles = StyleSheet.create({
    button: {
        marginTop: 'auto',
        marginBottom: 20,
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        backgroundColor: '#EF4444',
    },

    buttonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
    },
});