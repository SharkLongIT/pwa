import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const SIDEBAR_WIDTH = width * 0.75;

type Props = {
    visible: boolean;
    onClose: () => void;
};

const SideBar = ({ visible, onClose }: Props) => {
    const translateX = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
    const overlayOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(translateX, {
                    toValue: 0,
                    duration: 260,
                    useNativeDriver: true,
                }),
                Animated.timing(overlayOpacity, {
                    toValue: 1,
                    duration: 260,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(translateX, {
                    toValue: -SIDEBAR_WIDTH,
                    duration: 240,
                    useNativeDriver: true,
                }),
                Animated.timing(overlayOpacity, {
                    toValue: 0,
                    duration: 240,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [visible]);

    if (!visible) return null;

    return (
        <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
            {/* Overlay */}
            <Animated.View
                style={[
                    styles.overlay,
                    { opacity: overlayOpacity },
                ]}
            >
                <TouchableOpacity style={{ flex: 1 }} onPress={onClose} />
            </Animated.View>

            {/* Sidebar */}
            <Animated.View
                style={[
                    styles.sidebar,
                    { transform: [{ translateX }] },
                ]}
            >
                <Text style={styles.title}>Menu</Text>

                <Text style={styles.item}>🏠 Trang chủ</Text>
                <Text style={styles.item}>👤 Hồ sơ</Text>
                <Text style={styles.item}>🔔 Thông báo</Text>
                <Text style={styles.item}>⚙️ Cài đặt</Text>
            </Animated.View>
        </View>
    );
};

export default SideBar;

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
        zIndex: 9,
    },

    sidebar: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: SIDEBAR_WIDTH,
        backgroundColor: '#fff',
        paddingTop: 60,
        paddingHorizontal: 20,
        zIndex: 10,
        elevation: 20,
    },

    title: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 24,
    },

    item: {
        fontSize: 16,
        paddingVertical: 14,
    },
});
