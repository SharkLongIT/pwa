import React, { memo } from 'react';
import {
  ImageBackground,
  ImageSourcePropType,
  Keyboard,
  Platform,
  StatusBar,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { appColors } from '~/utils/constants/appColors';

type Edge = 'top' | 'right' | 'left' | 'bottom';

export interface BaseScreenProps extends ViewProps {
  containerStyle: StyleProp<ViewStyle>;
  children: React.ReactNode;
  top?: boolean;
  bottom?: boolean;
  dismissKeyboard?: boolean;
  avoidHeader?: boolean;
  backgroundStyle?: StyleProp<ViewStyle>;
  imageBackground?: ImageSourcePropType;
}

const withDismissKeyboard = (children: React.ReactNode, enabled: boolean) => {
  if (enabled) {
    return (
      <TouchableOpacity activeOpacity={1.0} style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
        {children}
      </TouchableOpacity>
    );
  }
  return <View style={{ flex: 1 }}>{children}</View>;
};

const ScreenBackground = (props: ViewProps & { imageSource?: ImageSourcePropType; color?: string }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { style, imageSource, color, ...rest } = props;
  if (imageSource) {
    return <ImageBackground source={imageSource} resizeMode='stretch' style={[StyleSheet.absoluteFill, style]} />;
  }
  if (color) {
    return <View style={[StyleSheet.absoluteFill, { backgroundColor: color }, style]} />;
  }
  return <View />;
};

function BaseScreen(props: BaseScreenProps) {
  const {
    containerStyle,
    top = false,
    bottom = false,
    children,
    dismissKeyboard = false,
    // avoidHeader = false,
    imageBackground,
    backgroundStyle,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ...rest
  } = props;

  let edges: Edge[] = ['right', 'left'];
  // if (Platform.OS === 'ios') {
  //   edges.push('top');
  // }
  if (top === true) edges.push('top');
  if (bottom === true) edges.push('bottom');

  return (
    <View style={styles.screen}>
      {imageBackground && <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent />}
      <ScreenBackground imageSource={imageBackground} style={backgroundStyle} color={appColors.white} />
      <SafeAreaView edges={edges} style={containerStyle}>
        {withDismissKeyboard(children, dismissKeyboard)}
      </SafeAreaView>
    </View>
  );
}

export default memo(BaseScreen);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: appColors.white,
  },
});
