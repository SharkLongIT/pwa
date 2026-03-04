import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { useAppColors } from '~/hooks/useAppColors';

const NotificationSkeleton = () => {
    const colors = useAppColors();
    return (
        <SkeletonPlaceholder
            backgroundColor={colors.skeletonBackground}
            highlightColor={colors.skeletonHighlight}
        >
            <View style={{ padding: 16 }}>
                {[1, 2, 3, 4].map((i) => (
                    <View
                        key={i}
                        style={{
                            flexDirection: "row",
                            padding: 14,
                            borderRadius: 12,
                            marginBottom: 12,
                            backgroundColor: "#fff",
                        }}
                    >
                        {/* dot */}
                        <SkeletonPlaceholder.Item
                            width={8}
                            height={8}
                            borderRadius={4}
                            marginTop={6}
                            marginRight={10}
                        />

                        {/* content */}
                        <SkeletonPlaceholder.Item flex={1}>
                            <SkeletonPlaceholder.Item
                                width="60%"
                                height={14}
                                borderRadius={6}
                            />
                            <SkeletonPlaceholder.Item
                                width="90%"
                                height={12}
                                borderRadius={6}
                                marginTop={8}
                            />
                            <SkeletonPlaceholder.Item
                                width="40%"
                                height={10}
                                borderRadius={6}
                                marginTop={10}
                            />
                        </SkeletonPlaceholder.Item>
                    </View>
                ))}
            </View>
        </SkeletonPlaceholder>
    );
}


export default NotificationSkeleton;
