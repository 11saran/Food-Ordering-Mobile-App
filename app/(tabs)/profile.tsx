import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    SafeAreaView,
    useColorScheme,
    Dimensions,
    Modal
} from 'react-native';
import { useState } from 'react';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header';
import Colors from '../../constants/Colors';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const { user, logout } = useAuth();
    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

    const colors = isDark ? Colors.dark : Colors.light;

    const MenuItem = ({ icon, title, onPress, isLogout = false }: { 
        icon: any, 
        title: string, 
        onPress?: () => void,
        isLogout?: boolean 
    }) => (
        <TouchableOpacity 
            style={[styles.menuItem, { backgroundColor: colors.card }]} 
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={[
                styles.iconContainer, 
                { backgroundColor: isLogout ? '#fee2e2' : '#fff5eb' }
            ]}>
                <MaterialIcons 
                    name={icon} 
                    size={22} 
                    color={isLogout ? '#ef4444' : colors.primary} 
                />
            </View>
            <Text style={[
                styles.menuTitle, 
                { color: isLogout ? '#ef4444' : colors.text }
            ]}>
                {title}
            </Text>
            {!isLogout && (
                <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
            )}
        </TouchableOpacity>
    );

    const handleLogout = async () => {
        setIsLogoutModalVisible(false);
        try {
            await logout();
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
            <Header title="Profile" />

            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Profile Section */}
                <View style={styles.profileSection}>
                    <View style={styles.avatarWrapper}>
                        <Image 
                            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBI8NBJtg27MQFDbAR_Wj1sVVc3QjV4mOEf-7wqoDHoD5eS--FyyUk1kLjDtqo7j9HenNXprk2xuxzvV3QL7wGMl7AZQIsL7RczaFVdb6y9wDUu_RU23Fcagi3LA7FogTPOulFjdkuYWxNGD_xQdhq7QIgrdSZgd3iIXhd7q6GBN8gdtPdFjcX79qPYNO1yvaWGAZdQbLsFBBgf5fuXGx8SIWlFte2hp0ZY0TTGPPCY4isT2s4zW-6xiJyhC2X3OsKNmQaj4wsAKL3U' }} 
                            style={styles.avatar} 
                        />
                        <TouchableOpacity style={[styles.editButton, { borderColor: isDark ? '#23190f' : '#f8f7f5' }]}>
                            <MaterialIcons name="edit" size={14} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.userInfo}>
                        <Text style={[styles.userName, { color: colors.text }]}>
                            {user?.name || 'Alex Johnson'}
                        </Text>
                        <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
                            {user?.email || 'alex.johnson@foodieexpress.com'}
                        </Text>
                    </View>
                </View>

                {/* Account Settings */}
                <View style={styles.sectionContainer}>
                    <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>ACCOUNT SETTINGS</Text>
                    <View style={styles.menuContainer}>
                        <MenuItem icon="person" title="My Account" />
                        <MenuItem icon="location-on" title="Saved Addresses" />
                        <MenuItem icon="payments" title="Payment Methods" />
                    </View>
                </View>

                {/* Support & More */}
                <View style={styles.sectionContainer}>
                    <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>SUPPORT & MORE</Text>
                    <View style={styles.menuContainer}>
                        <MenuItem icon="help-center" title="Help & Support" />
                        <MenuItem 
                            icon="logout" 
                            title="Logout" 
                            isLogout 
                            onPress={() => setIsLogoutModalVisible(true)} 
                        />
                    </View>
                </View>

                {/* Logout Confirmation Modal */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={isLogoutModalVisible}
                    onRequestClose={() => setIsLogoutModalVisible(false)}
                >
                    <TouchableOpacity 
                        style={styles.modalOverlay} 
                        activeOpacity={1} 
                        onPress={() => setIsLogoutModalVisible(false)}
                    >
                        <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
                            <View style={styles.modalIconContainer}>
                                <MaterialIcons name="logout" size={32} color="#ef4444" />
                            </View>
                            <Text style={[styles.modalTitle, { color: colors.text }]}>Logout Confirmation</Text>
                            <Text style={[styles.modalDescription, { color: colors.textSecondary }]}>
                                Are you sure you want to log out? You will need to sign in again to access your account.
                            </Text>
                            <View style={styles.modalButtons}>
                                <TouchableOpacity 
                                    style={[styles.modalButton, styles.cancelButton, { borderColor: isDark ? '#333' : '#eee' }]} 
                                    onPress={() => setIsLogoutModalVisible(false)}
                                >
                                    <Text style={[styles.cancelText, { color: colors.text }]}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={[styles.modalButton, styles.logoutButton]} 
                                    onPress={handleLogout}
                                >
                                    <Text style={styles.logoutText}>Log Out</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Modal>

                <View style={{ height: 100 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderBottomWidth: 1,
    },
    backButton: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '800',
    },
    scrollContent: {
        paddingTop: 0,
    },
    profileSection: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    avatarWrapper: {
        position: 'relative',
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: 'rgba(255, 123, 0, 0.1)',
    },
    editButton: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: '#ff7b00',
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
    },
    userInfo: {
        alignItems: 'center',
        marginTop: 20,
    },
    userName: {
        fontSize: 24,
        fontWeight: '800',
        letterSpacing: -0.5,
    },
    userEmail: {
        fontSize: 15,
        marginTop: 4,
        fontWeight: '500',
    },
    sectionContainer: {
        marginTop: 10,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '800',
        letterSpacing: 1,
        marginBottom: 12,
        paddingLeft: 10,
    },
    menuContainer: {
        gap: 12,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    menuTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: '700',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        width: '100%',
        maxWidth: 340,
        borderRadius: 30,
        padding: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 5,
    },
    modalIconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#fee2e2',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '800',
        marginBottom: 8,
        textAlign: 'center',
    },
    modalDescription: {
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'center',
        marginBottom: 24,
        paddingHorizontal: 10,
    },
    modalButtons: {
        flexDirection: 'row',
        gap: 12,
        width: '100%',
    },
    modalButton: {
        flex: 1,
        height: 52,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelButton: {
        borderWidth: 1,
    },
    logoutButton: {
        backgroundColor: '#ef4444',
    },
    cancelText: {
        fontSize: 15,
        fontWeight: '700',
    },
    logoutText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '700',
    },
});

