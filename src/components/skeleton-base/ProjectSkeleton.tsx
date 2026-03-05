import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { View } from 'react-native';

const ProjectSkeleton = () => {
    return (
        // <SkeletonPlaceholder>
        //     <View style={{ padding: 16 }}>
        //         <View style={{ height: 100, borderRadius: 12, marginBottom: 16 }} />
        //         <View style={{ height: 120, borderRadius: 12, marginBottom: 16 }} />
        //         <View style={{ height: 120, borderRadius: 12 }} />
        //     </View>
        // </SkeletonPlaceholder>
        <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item
                marginHorizontal={20}
                marginTop={16}
                height={120}
                borderRadius={16}
            />
        </SkeletonPlaceholder>
    );
};

export default ProjectSkeleton;