import React from 'react';
import { Text, StyleSheet } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';

const GradientText = ({ text, style }: { text: string; style?: any }) => {
    return (
        <MaskedView
            style={{ backgroundColor: 'transparent' }}
            maskElement={
                <Text style={[style, styles.maskText]}>
                    {text}
                </Text>
            }
        >
            <LinearGradient
                colors={['#4983F6', '#C175F5', '#FBACB7']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            >
                <Text style={[style, styles.hiddenText]}>
                    {text}
                </Text>
            </LinearGradient>
        </MaskedView>
    );
};

export default GradientText;

const styles = StyleSheet.create({
    maskText: {
        backgroundColor: 'transparent',
    },
    hiddenText: {
        opacity: 0,
    },
});
