import React, { useRef } from "react";
import { View, Animated, FlatList, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const data = [1, 2, 3, 4];

export default function Indicator() {
    const scrollX = useRef(new Animated.Value(0)).current;

    return (
        <>
            <Animated.FlatList
                data={data}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.toString()}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                renderItem={() => (
                    <View style={{ width, height: 200, backgroundColor: "#eee" }} />
                )}
            />

            {/* INDICATOR */}
            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 12 }}>
                {data.map((_, i) => {
                    const inputRange = [
                        (i - 1) * width,
                        i * width,
                        (i + 1) * width,
                    ];

                    const scale = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.8, 1.4, 0.8],
                        extrapolate: "clamp",
                    });

                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.4, 1, 0.4],
                        extrapolate: "clamp",
                    });

                    return (
                        <Animated.View
                            key={i}
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: "#4F46E5",
                                marginHorizontal: 4,
                                transform: [{ scale }],
                                opacity,
                            }}
                        />
                    );
                })}
            </View>
        </>
    );
}
