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
    Image,
    ImageBackground,
    Dimensions
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const { height, width } = Dimensions.get('window');

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const { showToast } = useToast();
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const colors = isDark ? Colors.dark : Colors.light;

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setIsLoading(true);
        try {
            await login(email, password);
            showToast({ message: 'Login successful!', type: 'success' });
        } catch (error: any) {
            showToast({ 
                message: error.message || 'Invalid email or password', 
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
                                {/* Logo & Welcome */}
                                <View style={styles.headerSection}>
                                    <View style={[styles.logoContainer, { backgroundColor: colors.primary }]}>
                                        <MaterialIcons name="restaurant" size={36} color="white" />
                                    </View>
                                    <Text style={[styles.welcomeTitle, { color: colors.text }]}>Welcome back</Text>
                                    <Text style={[styles.welcomeSubtitle, { color: colors.textSecondary }]}>FoodieExpress</Text>
                                </View>

                                {/* Form */}
                                <View style={styles.formSection}>
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

                                    <View style={styles.inputGroup}>
                                        <Text style={[styles.label, { color: colors.text }]}>Password</Text>
                                        <View style={[styles.inputWrapper, { borderColor: colors.border }]}>
                                            <TextInput
                                                style={[styles.input, { color: colors.text }]}
                                                placeholder="Enter your password"
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

                                    <TouchableOpacity style={styles.forgotPassword}>
                                        <Text style={[styles.forgotPasswordText, { color: colors.primary }]}>Forgot Password?</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* Login Button */}
                                <TouchableOpacity 
                                    style={[styles.loginButton, { backgroundColor: colors.primary }]} 
                                    onPress={handleLogin}
                                    activeOpacity={0.8}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <ActivityIndicator color="white" />
                                    ) : (
                                        <Text style={styles.loginButtonText}>Login</Text>
                                    )}
                                </TouchableOpacity>

                                {/* Divider */}
                                <View style={styles.dividerRow}>
                                    <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
                                    <Text style={styles.dividerText}>or continue with</Text>
                                    <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
                                </View>

                                {/* Social Login Grid */}
                                <View style={styles.socialGrid}>
                                    <TouchableOpacity style={[styles.socialButton, { borderColor: colors.border }]}>
                                        <Ionicons name="logo-google" size={20} color={isDark ? "white" : "#DB4437"} />
                                        <Text style={[styles.socialText, { color: colors.text }]}>Google</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.socialButton, { borderColor: colors.border }]}>
                                        <MaterialCommunityIcons name="apple" size={20} color={isDark ? "white" : "black"} />
                                        <Text style={[styles.socialText, { color: colors.text }]}>Apple</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* Footer */}
                                <View style={styles.footer}>
                                    <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                                        Don't have an account? {' '}
                                        <Text 
                                            style={[styles.signUpText, { color: colors.primary }]}
                                            onPress={() => Alert.alert('Feature Coming Soon', 'Registration will be available in the next update!')}
                                        >Sign Up</Text>
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

// Reuse some Material Icons
const MaterialIcons = ({ name, size, color }: { name: any, size: number, color: string }) => (
    <MaterialCommunityIcons name={name === 'restaurant' ? 'silverware-fork-knife' : name} size={size} color={color} />
);

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
        gap: 20,
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
    forgotPassword: {
        alignSelf: 'flex-end',
    },
    forgotPasswordText: {
        fontSize: 14,
        fontWeight: '700',
    },
    loginButton: {
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
    loginButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '800',
    },
    dividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
    },
    dividerLine: {
        flex: 1,
        height: 1,
    },
    dividerText: {
        marginHorizontal: 16,
        color: '#94a3b8',
        fontSize: 14,
        fontWeight: '500',
    },
    socialGrid: {
        flexDirection: 'row',
        gap: 12,
    },
    socialButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 54,
        borderRadius: 14,
        borderWidth: 1.5,
        gap: 10,
    },
    socialIcon: {
        width: 20,
        height: 20,
    },
    socialText: {
        fontSize: 14,
        fontWeight: '700',
    },
    footer: {
        marginTop: 32,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 14,
        fontWeight: '500',
    },
    signUpText: {
        fontWeight: '800',
    },
});
