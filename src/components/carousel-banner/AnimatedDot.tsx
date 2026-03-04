import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
    useAnimatedStyle,
    interpolate,
    Extrapolate,
    SharedValue,
} from "react-native-reanimated";

interface Props {
    index: number;
    progress: SharedValue<number>;
}

const AnimatedDot = ({ index, progress }: Props) => {
    const animatedStyle = useAnimatedStyle(() => {
        const width = interpolate(
            progress.value,
            [index - 1, index, index + 1],
            [6, 18, 6],
            Extrapolate.CLAMP
        );

        const scale = interpolate(
            progress.value,
            [index - 1, index, index + 1],
            [0.9, 1.1, 0.9],
            Extrapolate.CLAMP
        );

        return {
            width,
            transform: [{ scale }],
            opacity: index === Math.round(progress.value) ? 1 : 0.5,
        };
    });


    return <Animated.View style={[styles.dot, animatedStyle]} />;
};

export default AnimatedDot;

const styles = StyleSheet.create({
    dot: {
        height: 6,
        borderRadius: 3,
        backgroundColor: "#2563EB",
        marginHorizontal: 4,
    },
});
