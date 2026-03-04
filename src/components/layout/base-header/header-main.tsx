import { Pressable, StyleSheet, View } from "react-native";
import React from 'react';

import { Text } from "react-native-paper";
import { useAppColors } from "~/hooks/useAppColors";
import { FilterLinesIcon } from "~/assets/icons";

type FilterProps = {
    loading: boolean;
    toggleFilter: () => void;
};

type Props = {
    title: string;
    filter?: FilterProps;
}
const HeaderMain: React.FC<Props> = ({ title, filter }) => {
    const colors = useAppColors();
    return (
        <View style={[styles.header, { backgroundColor: colors.background }]}>
            <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>{title}</Text>
            {filter && (
                <Pressable
                    disabled={filter.loading}
                    onPress={filter.toggleFilter}
                    style={{ opacity: filter.loading ? 0.5 : 1 }}
                >

                    <FilterLinesIcon
                        width={24}
                        height={24}
                    // color={filter.type === "UNREAD" ? colors.primary : colors.textSecondary}
                    />
                </Pressable>
            )}
        </View>
    );
};

export default HeaderMain;

const styles = StyleSheet.create({
    header: {
        marginBottom: 5,
        paddingHorizontal: 20,
        paddingTop: 16,
        flexDirection: 'row'
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#111827',
        flex: 1
    },
});