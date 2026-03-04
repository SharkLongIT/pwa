import React from 'react';
import {
    ImageBackground,
    Keyboard,
    StyleProp,
    View,
    ImageSourcePropType,
    ViewStyle,
    StyleSheet,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppColors } from '~/hooks/useAppColors';
import { appColors } from '~/utils/constants/appColors';

const insets = useSafeAreaInsets();

export interface BaseContentProps {
    style?: StyleProp<ViewStyle>;
    children: React.ReactNode;
}
export function BaseContent(props: BaseContentProps) {
    const insets = useSafeAreaInsets();
    const colors = useAppColors();
    return (
        <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={['left', 'right', 'bottom']} >
            <View style={[styles.container, props.style, { backgroundColor: colors.background }]}>
                {props.children}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: appColors.bg_content,
    },
    container: {
        flex: 1,
        // padding: 16,
    },
});