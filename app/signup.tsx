import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView,
    SafeAreaView,
    useColorScheme,
    ImageBackground,
    Dimensions
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { useRouter } from 'expo-router';

const { height, width } = Dimensions.get('window');

export default function SignupScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();
    const { showToast } = useToast();
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const colors = isDark ? Colors.dark : Colors.light;
    const router = useRouter();

    const handleSignup = async () => {
        if (!name || !email || !password || !confirmPassword) {
            showToast({ message: 'Please fill in all fields', type: 'error' });
            return;
        }

        if (password !== confirmPassword) {
            showToast({ message: 'Passwords do not match', type: 'error' });
            return;
        }

        if (password.length < 6) {
            showToast({ message: 'Password must be at least 6 characters', type: 'error' });
            return;
        }

        setIsLoading(true);
        try {
            await register(email, password, name);
            showToast({ message: 'Account created successfully!', type: 'success' });
            // Since useProtectedRoute will handle redirection based on auth state, 
            // we don't necessarily need to manual navigate, but it's good practice.
            router.replace('/(tabs)');
        } catch (error: any) {
            showToast({ 
                message: error.message || 'Failed to create account', 
                type: 'error' 
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLZz5M4A0wEeOMY5SBcO_h_Mk_Qhq-BFh2YZ1BhKwT5D0069zt8gb-Q9kd5mzh8xdQDneF-JFKDijQyoJNPvraSpvDQPm70sB8FTm_O8Fq03Lx46XvzbUH5ji4JvfyQTE7z3RPPeZN6agh22o8t4qcxKx2GBNMjWCvdY8bRdFlWUWoZ2qW1br7BTAXzBjQrj56nRlJ-gHzY6hE5NkR_HBaB-KLgNWIeTf5WH0rYRmaUWMpet768H8-h7lbeLjDaBymTYDZ9IiWqgMd' }} 
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <View style={styles.overlay} />
                
                <SafeAreaView style={styles.content}>
                    <KeyboardAvoidingView 
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.keyboardView}
                    >
                        <ScrollView 
                            contentContainerStyle={styles.scrollContent}
                            showsVerticalScrollIndicator={false}
                            bounces={false}
                        >
                            <View style={[styles.card, { backgroundColor: isDark ? colors.background : colors.card }]}>
                                {/* Header Section */}
                                <View style={styles.headerSection}>
                                    <View style={[styles.logoContainer, { backgroundColor: colors.primary }]}>
                                        <MaterialCommunityIcons name="account-plus" size={36} color="white" />
                                    </View>
                                    <Text style={[styles.welcomeTitle, { color: colors.text }]}>Create Account</Text>
                                    <Text style={[styles.welcomeSubtitle, { color: colors.textSecondary }]}>Join FoodieExpress today</Text>
                                </View>

                                {/* Form */}
                                <View style={styles.formSection}>
                                    {/* Name Field */}
                                    <View style={styles.inputGroup}>
                                        <Text style={[styles.label, { color: colors.text }]}>Full Name</Text>
                                        <View style={[styles.inputWrapper, { borderColor: colors.border }]}>
                                            <TextInput
                                                style={[styles.input, { color: colors.text }]}
                                                placeholder="John Doe"
                                                placeholderTextColor="#94a3b8"
                                                value={name}
                                                onChangeText={setName}
                                                autoCapitalize="words"
                                            />
                                            <MaterialCommunityIcons name="account-outline" size={20} color="#94a3b8" />
                                        </View>
                                    </View>

                                    {/* Email Field */}
                                    <View style={styles.inputGroup}>
                                        <Text style={[styles.label, { color: colors.text }]}>Email Address</Text>
                                        <View style={[styles.inputWrapper, { borderColor: colors.border }]}>
                                            <TextInput
                                                style={[styles.input, { color: colors.text }]}
                                                placeholder="name@example.com"
                                                placeholderTextColor="#94a3b8"
                                                value={email}
                                                onChangeText={setEmail}
                                                keyboardType="email-address"
                                                autoCapitalize="none"
                                            />
                                            <MaterialCommunityIcons name="email-outline" size={20} color="#94a3b8" />
                                        </View>
                                    </View>

                                    {/* Password Field */}
                                    <View style={styles.inputGroup}>
                                        <Text style={[styles.label, { color: colors.text }]}>Password</Text>
                                        <View style={[styles.inputWrapper, { borderColor: colors.border }]}>
                                            <TextInput
                                                style={[styles.input, { color: colors.text }]}
                                                placeholder="Enter your Password"
                                                placeholderTextColor="#94a3b8"
                                                value={password}
                                                onChangeText={setPassword}
                                                secureTextEntry={!isPasswordVisible}
                                                autoCapitalize="none"
                                            />
                                            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                                                <MaterialCommunityIcons 
                                                    name={isPasswordVisible ? "eye-outline" : "eye-off-outline"} 
                                                    size={20} 
                                                    color="#94a3b8" 
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    {/* Confirm Password Field */}
                                    <View style={styles.inputGroup}>
                                        <Text style={[styles.label, { color: colors.text }]}>Confirm Password</Text>
                                        <View style={[styles.inputWrapper, { borderColor: colors.border }]}>
                                            <TextInput
                                                style={[styles.input, { color: colors.text }]}
                                                placeholder="Repeat your password"
                                                placeholderTextColor="#94a3b8"
                                                value={confirmPassword}
                                                onChangeText={setConfirmPassword}
                                                secureTextEntry={!isPasswordVisible}
                                                autoCapitalize="none"
                                            />
                                            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                                                <MaterialCommunityIcons 
                                                    name={isPasswordVisible ? "eye-outline" : "eye-off-outline"} 
                                                    size={20} 
                                                    color="#94a3b8" 
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                                {/* Signup Button */}
                                <TouchableOpacity 
                                    style={[styles.signupButton, { backgroundColor: colors.primary }]} 
                                    onPress={handleSignup}
                                    activeOpacity={0.8}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <ActivityIndicator color="white" />
                                    ) : (
                                        <Text style={styles.signupButtonText}>Create Account</Text>
                                    )}
                                </TouchableOpacity>

                                {/* Footer */}
                                <View style={styles.footer}>
                                    <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                                        Already have an account? {' '}
                                        <Text 
                                            style={[styles.loginLinkText, { color: colors.primary }]}
                                            onPress={() => router.back()}
                                        >Login</Text>
                                    </Text>
                                </View>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    content: {
        flex: 1,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingVertical: 40,
    },
    card: {
        borderRadius: 24,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    headerSection: {
        alignItems: 'center',
        marginBottom: 32,
    },
    logoContainer: {
        width: 64,
        height: 64,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#ff7b00',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    welcomeTitle: {
        fontSize: 24,
        fontWeight: '900',
        letterSpacing: -0.5,
    },
    welcomeSubtitle: {
        fontSize: 16,
        fontWeight: '500',
        marginTop: 4,
    },
    formSection: {
        gap: 16,
    },
    inputGroup: {
        gap: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: '700',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderRadius: 14,
        paddingHorizontal: 16,
        height: 56,
    },
    input: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
    },
    signupButton: {
        height: 60,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32,
        shadowColor: '#ff7b00',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 6,
    },
    signupButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '800',
    },
    footer: {
        marginTop: 32,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 14,
        fontWeight: '500',
    },
    loginLinkText: {
        fontWeight: '800',
    },
});
