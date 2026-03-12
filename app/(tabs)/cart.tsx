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
    Alert,
    Dimensions
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import Header from '../../components/Header';
import Colors from '../../constants/Colors';

const { width } = Dimensions.get('window');

export default function CartScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const { cartItems, updateQuantity, cartTotal, clearCart } = useCart();
    const { showToast } = useToast();

    const colors = isDark ? Colors.dark : Colors.light;

    const handlePlaceOrder = () => {
        if (cartItems.length === 0) {
            showToast({ message: 'Cart is empty', type: 'error' });
            return;
        }
        
        clearCart();
        showToast({ 
            message: 'Order Placed successfully!', 
            type: 'success' 
        });
    };

    const deliveryFee = 0; // FREE as per design

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
            <Header title="Your Cart" />

            <ScrollView 
                style={styles.container}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Cart Items List */}
                {cartItems.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <MaterialCommunityIcons name="cart-off" size={80} color={colors.textSecondary} />
                        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>Your cart is empty</Text>
                    </View>
                ) : (
                    cartItems.map((item) => (
                        <View key={item.id} style={[styles.cartItem, { borderBottomColor: colors.border }]}>
                            <Image source={{ uri: item.image }} style={styles.itemImage} />
                            <View style={styles.itemInfo}>
                                <Text style={[styles.itemName, { color: colors.text }]}>{item.name}</Text>
                                <Text style={[styles.itemUnitPrice, { color: colors.primary }]}>
                                    Rs {item.price.toFixed(2)} {item.quantity > 1 ? 'each' : ''}
                                </Text>
                                
                                <View style={styles.quantityWrapper}>
                                    <TouchableOpacity 
                                        onPress={() => updateQuantity(item.id, item.quantity - 1)}
                                        style={[styles.qtyButton, { backgroundColor: colors.inputBg }]}
                                    >
                                        <Ionicons name="remove" size={18} color={colors.text} />
                                    </TouchableOpacity>
                                    <Text style={[styles.qtyText, { color: colors.text }]}>{item.quantity}</Text>
                                    <TouchableOpacity 
                                        onPress={() => updateQuantity(item.id, item.quantity + 1)}
                                        style={[styles.qtyButton, { backgroundColor: colors.inputBg }]}
                                    >
                                        <Ionicons name="add" size={18} color={colors.text} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.itemTotalContainer}>
                                <Text style={[styles.itemTotalText, { color: colors.text }]}>
                                    Rs {(item.price * item.quantity).toFixed(2)}
                                </Text>
                            </View>
                        </View>
                    ))
                )}

                {/* Add More Items Button */}
                <TouchableOpacity 
                    style={[styles.addMoreButton, { borderColor: colors.border }]}
                    onPress={() => router.push('/(tabs)')}
                >
                    <Ionicons name="add-circle-outline" size={20} color={colors.textSecondary} />
                    <Text style={[styles.addMoreText, { color: colors.textSecondary }]}>Add more items</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Order Summary & Action */}
            <View style={[styles.summaryCard, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
                <View style={styles.summaryRow}>
                    <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Subtotal</Text>
                    <Text style={[styles.summaryValue, { color: colors.text }]}>Rs {cartTotal.toFixed(2)}</Text>
                </View>
                <View style={[styles.summaryRow, { marginTop: 12 }]}>
                    <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Delivery Fee</Text>
                    <Text style={[styles.freeText]}>FREE</Text>
                </View>
                
                <View style={[styles.totalRow, { borderTopColor: colors.border }]}>
                    <Text style={[styles.totalLabel, { color: colors.text }]}>Total</Text>
                    <Text style={[styles.totalValue, { color: colors.primary }]}>Rs {cartTotal.toFixed(2)}</Text>
                </View>

                <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
                    <Text style={styles.placeOrderText}>Place Order</Text>
                    <Ionicons name="chevron-forward" size={20} color="white" />
                </TouchableOpacity>
                <Text style={[styles.termsText, { color: colors.textSecondary }]}>
                    By placing an order, you agree to our Terms of Service
                </Text>
            </View>
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
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    emptyContainer: {
        paddingTop: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: '600',
    },
    cartItem: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderBottomWidth: 1,
        alignItems: 'center',
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 16,
    },
    itemInfo: {
        flex: 1,
        marginLeft: 15,
    },
    itemName: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 4,
    },
    itemUnitPrice: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 10,
    },
    quantityWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    qtyButton: {
        width: 34,
        height: 34,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    qtyText: {
        fontSize: 16,
        fontWeight: '800',
        minWidth: 12,
        textAlign: 'center',
    },
    itemTotalContainer: {
        alignItems: 'flex-end',
    },
    itemTotalText: {
        fontSize: 16,
        fontWeight: '800',
    },
    addMoreButton: {
        marginHorizontal: 20,
        marginTop: 20,
        height: 56,
        borderRadius: 15,
        borderWidth: 2,
        borderStyle: 'dashed',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    addMoreText: {
        fontSize: 15,
        fontWeight: '600',
    },
    summaryCard: {
        padding: 24,
        paddingBottom: 35,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.05,
        shadowRadius: 15,
        elevation: 10,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    summaryLabel: {
        fontSize: 14,
        fontWeight: '600',
    },
    summaryValue: {
        fontSize: 14,
        fontWeight: '700',
    },
    freeText: {
        color: '#22c55e',
        fontSize: 14,
        fontWeight: '700',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
        paddingTop: 15,
        borderTopWidth: 1,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: '800',
    },
    totalValue: {
        fontSize: 20,
        fontWeight: '900',
    },
    placeOrderButton: {
        backgroundColor: '#ff7b00',
        height: 58,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        gap: 5,
        shadowColor: '#ff7b00',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    placeOrderText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
    termsText: {
        fontSize: 12,
        textAlign: 'center',
        marginTop: 15,
    }
});

