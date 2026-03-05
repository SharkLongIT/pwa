import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

interface Props {
    percent: number;
    color?: string;
}

const AnimatedProgressBar: React.FC<Props> = ({ percent, color = '#22C55E' }) => {
    const animatedWidth = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animatedWidth, {
            toValue: percent,
            duration: 800,
            useNativeDriver: false,
        }).start();
    }, [percent]);

    const width = animatedWidth.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
    });

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.fill,
                    {
                        width,
                        backgroundColor: color,
                    },
                ]}
            />
        </View>
    );
};

export default AnimatedProgressBar;

const styles = StyleSheet.create({
    container: {
        height: 10,
        backgroundColor: '#E5E7EB',
        borderRadius: 5,
        overflow: 'hidden',
    },
    fill: {
        height: '100%',
    },
});