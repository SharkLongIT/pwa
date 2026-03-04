import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    View,
    StyleSheet,
    ScrollView,
    Pressable,
    Image,
    Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PagerView from 'react-native-pager-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import BannerCarousel from '~/components/carousel-banner/BannerCarousel';
import TabContent from '~/components/tab-view/TabContent';
import Weather from '~/components/weather/Weather';
import { useAppColors } from '~/hooks/useAppColors';
import { DrawerParamList } from '~/navigation/MainNavigator';
import { RootState } from '~/redux/store';
import { showToast } from '~/utils/toast';

const HomeScreen = () => {
    const lastScrollY = React.useRef(0);

    const navigation = useNavigation();
    const { t } = useTranslation();
    const auth = useSelector((state: RootState) => state.auth.user);
    const colors = useAppColors();
    const handleScroll = (e: any) => {
        const currentY = e.nativeEvent.contentOffset.y;
        const diff = currentY - lastScrollY.current;

        // luôn show tab khi ở gần top
        if (currentY < 20) {
            navigation.getParent()?.setOptions({
                tabBarStyle: {
                    transform: [{ translateY: 0 }],
                },
            });
            lastScrollY.current = currentY;
            return;
        }

        // kéo xuống → ẩn
        if (diff > 10) {
            navigation.getParent()?.setOptions({
                tabBarStyle: {
                    transform: [{ translateY: 100 }],
                },
            });
        }

        // kéo lên → hiện
        if (diff < -10) {
            navigation.getParent()?.setOptions({
                tabBarStyle: {
                    transform: [{ translateY: 0 }],
                },
            });
        }

        lastScrollY.current = currentY;
    };

    return (

        <View style={{ flex: 1, backgroundColor: colors.background, }}>
            {/* ===== HEADER ===== */}
            <SafeAreaView edges={['top']} style={styles.safeHeader}>
                <Weather />

            </SafeAreaView>

            {/* ===== BODY ===== */}
            <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: 60,
                    }}
                >
                    {/* HEADER */}
                    <View style={styles.header}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.welcome}>{t("welcome_back")}</Text>
                            <Text style={[styles.userName, { color: colors.textPrimary }]}>
                                {auth?.name ?? "User"} 👋
                            </Text>
                        </View>
                        <Pressable onPress={() => navigation.navigate("Profile" as never)}>
                            <Image
                                source={require("~/assets/images/default-avatar.png")}
                                style={styles.avatar}
                            />
                        </Pressable>

                    </View>
                    {/* CONTENT */}
                    <BannerCarousel />
                    <View style={{ padding: 20 }}>
                        <Text style={{ color: colors.textPrimary }}>Home Screen Content</Text>

                        <Pressable onPress={() => showToast("error", "This is a toast message!", "Error details", "bottom")}>
                            <Text style={{ color: colors.primary, marginTop: 20 }}>
                                Toast Example error Bottom
                            </Text>
                        </Pressable>
                        <Pressable onPress={() => showToast("info", "This is an info toast message!", "Info details", "top")}>
                            <Text style={{ color: colors.primary, marginTop: 20 }}>
                                Toast Example info Top
                            </Text>
                        </Pressable>
                        <Pressable onPress={() => showToast("success", "This is a success toast message!", "Success details", "bottom")}>
                            <Text style={{ color: colors.primary, marginTop: 20 }}>
                                Toast Example success Bottom
                            </Text>
                        </Pressable>

                    </View>


                    {/* <TabContent /> */}
                </ScrollView>

            </SafeAreaView>
        </View>
    );
};

export default HomeScreen;
const styles = StyleSheet.create({
    headerGradient: {
        paddingBottom: 20,
    },

    safeHeader: {
        paddingHorizontal: 20,
        // backgroundColor: 'red',

    },

    container: {
        paddingTop: 10,
    },
    /* HEADER */
    header: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 20,
        paddingVertical: 12,
        padding: 20,

    },

    welcome: {
        fontSize: 13,
        color: "#64748B",
    },

    userName: {
        fontSize: 22,
        fontWeight: "700",
        marginTop: 4,
        color: "#0F172A",
    },

    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginLeft: 12,
    },
    image: {
        width: "100%",
        height: "100%",
    },

});
