import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TextInputProps,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

interface AppInputProps extends TextInputProps {
    label?: string;
    error?: string;
    required?: boolean;
    containerStyle?: any;
    onchangeText?: (text: string) => void;
}

const AppInput: React.FC<AppInputProps> = ({
    label,
    error,
    required,
    secureTextEntry,
    containerStyle,
    style,
    keyboardType,
    onChangeText,
    ...props
}) => {
    const [isSecure, setIsSecure] = useState(secureTextEntry);

    return (
        <View style={[styles.container, containerStyle]}>
            {label && (
                <Text style={styles.label}>
                    {label}
                    {required && <Text style={styles.required}> *</Text>}
                </Text>
            )}

            <View style={[styles.inputWrapper, error && styles.inputError]}>
                <TextInput
                    style={[styles.input, style]}
                    secureTextEntry={isSecure}
                    placeholderTextColor="#9CA3AF"
                    {...props}
                    // onChangeText={onChangeText}
                    onChangeText={(text) => {
                        if (keyboardType === "numeric") {
                            text = text.replace(/[^0-9]/g, '');
                        }
                        onChangeText?.(text);
                    }}
                />

                {secureTextEntry && (
                    <TouchableOpacity
                        onPress={() => setIsSecure(!isSecure)}
                        style={styles.eyeButton}
                    >
                        <Text style={styles.eyeText}>
                            {isSecure ? '👁️' : '🙈'}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

export default AppInput;

const styles = StyleSheet.create({
    container: {
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
    inputWrapper: {
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: '#111827',
    },
    inputError: {
        borderColor: '#EF4444',
    },
    errorText: {
        marginTop: 4,
        fontSize: 12,
        color: '#EF4444',
    },
    eyeButton: {
        paddingLeft: 8,
    },
    eyeText: {
        fontSize: 16,
    },
});