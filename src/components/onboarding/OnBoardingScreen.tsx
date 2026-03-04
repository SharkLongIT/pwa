import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '~/redux/store';
import { ContinueIcon } from '~/assets/icons';
import { AuthParamList } from '~/navigation/AuthNavigator';
import { setHasSeenWelcome } from '~/thunk/appSlice';

const OnBoardingScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<AuthParamList>>();
    const dispatch = useDispatch<AppDispatch>();

    return (
        <ImageBackground
            source={require('~/assets/images/background/Login_2.png')}
            style={styles.imageBackground}
        >
            <Pressable
                style={styles.container}
                onPress={() => {
                    dispatch(setHasSeenWelcome());
                    // navigation.replace('Login');
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Login' }],
                    });
                }}
            >
                <View style={styles.bottomContent}>
                    {/* TEXT */}
                    <View style={styles.textBlock}>
                        <Text style={styles.welcome}>Welcome</Text>

                        <Text style={styles.description}>
                            Build faster. Stay focused.
                            {"\n"}Your workflow starts here.
                        </Text>
                    </View>

                    {/* ACTION */}
                    <View style={styles.continueRow}>
                        <Text style={styles.continueText}>Continue</Text>
                        <ContinueIcon />
                    </View>
                </View>
            </Pressable>
        </ImageBackground>
    );

};

export default OnBoardingScreen;


const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        resizeMode: 'cover',
    },

    container: {
        flex: 1,
        padding: 24,
    },

    bottomContent: {
        marginTop: 'auto',
        marginBottom: 48,
    },

    textBlock: {
        marginBottom: 40,
    },

    welcome: {
        fontSize: 32,
        fontWeight: '800',
        color: '#212121',
        marginBottom: 12,
        letterSpacing: 0.5,
    },

    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#616161',
        maxWidth: '92%',
    },

    continueRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 10,
    },

    continueText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2563EB', // nổi bật hơn
    },
});

