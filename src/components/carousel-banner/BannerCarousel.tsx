import React from "react";
import { View, Image, Dimensions, StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import Animated, { useSharedValue } from "react-native-reanimated";
import AnimatedDot from "./AnimatedDot";

const width = Dimensions.get("window").width;

const data = [
    { id: 1, image: "https://picsum.photos/600/400?1" },
    { id: 2, image: "https://picsum.photos/600/400?2" },
    { id: 3, image: "https://picsum.photos/600/400?3" },
    { id: 4, image: "https://picsum.photos/600/400?4" },
];

const BannerCarousel = () => {
    const progress = useSharedValue(0);

    return (
        <View style={{ marginTop: 12 }}>
            <Carousel
                width={width}
                height={200}
                autoPlay
                loop
                pagingEnabled
                snapEnabled
                data={data}
                mode="parallax"
                autoPlayInterval={4000} // thời gian đứng của slide
                scrollAnimationDuration={1200} // thời gian chạy 
                onProgressChange={(_, absoluteProgress) => {
                    progress.value = absoluteProgress;
                }}
                modeConfig={{
                    parallaxScrollingScale: 0.9,
                    parallaxScrollingOffset: 50,
                }}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Image
                            source={{ uri: item.image }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    </View>
                )}
            />

            <View style={styles.dotWrap}>
                {data.map((_, index) => (
                    <AnimatedDot
                        key={index}
                        index={index}
                        progress={progress}
                    />
                ))}
            </View>
        </View>
    );
};

export default BannerCarousel;
const styles = StyleSheet.create({
    item: {
        flex: 1,
        borderRadius: 16,
        overflow: "hidden",

        // iOS shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 10,

        // Android shadow
        elevation: 6,
    },

    image: {
        width: "100%",
        height: "100%",
    },

    dotWrap: {
        position: "absolute",
        bottom: 14,
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",

        // nền mờ cho iOS-style
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
});
