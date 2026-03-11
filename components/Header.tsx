import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import Colors from '../constants/Colors';

interface HeaderProps {
    title: string;
    showBack?: boolean;
    onBackPress?: () => void;
    rightElement?: React.ReactNode;
    transparent?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
    title,
    showBack = true,
    onBackPress,
    rightElement,
    transparent = false,
}) => {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const colors = isDark ? Colors.dark : Colors.light;

    const handleBack = () => {
        if (onBackPress) {
            onBackPress();
        } else {
            router.back();
        }
    };

    return (
        <View style={[
            styles.header, 
            { 
                backgroundColor: transparent ? 'transparent' : colors.background,
                borderBottomColor: transparent ? 'transparent' : colors.border,
                borderBottomWidth: transparent ? 0 : 1
            }
        ]}>
            {showBack ? (
                <TouchableOpacity 
                    onPress={handleBack} 
                    style={[styles.backButton, { backgroundColor: colors.backBg }]}
                >
                    <Ionicons name="arrow-back" size={24} color={isDark ? colors.text : colors.primary} />
                </TouchableOpacity>
            ) : (
                <View style={styles.placeholder} />
            )}

            <Text style={[styles.headerTitle, { color: colors.text }]} numberOfLines={1}>
                {title}
            </Text>

            {rightElement ? (
                <View style={styles.rightSection}>
                    {rightElement}
                </View>
            ) : (
                <View style={styles.placeholder} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 40,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '800',
        marginHorizontal: 10,
    },
    placeholder: {
        width: 44,
    },
    rightSection: {
        width: 44,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Header;
