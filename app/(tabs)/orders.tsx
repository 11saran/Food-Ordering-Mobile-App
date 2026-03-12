import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    SafeAreaView,
    useColorScheme,
    Dimensions
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { orders, Order } from '../../data/mockData';
import Header from '../../components/Header';
import Colors from '../../constants/Colors';

const { width } = Dimensions.get('window');

const TABS = ['All', 'In Progress', 'Completed'];

export default function OrdersScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const [activeTab, setActiveTab] = useState('All');

    const colors = isDark ? Colors.dark : Colors.light;

    const filteredOrders = orders.filter(order => {
        if (activeTab === 'All') return true;
        if (activeTab === 'In Progress') return order.status === 'Preparing';
        if (activeTab === 'Completed') return order.status === 'Delivered';
        return true;
    });

    const inProgressOrders = filteredOrders.filter(o => o.status === 'Preparing');
    const pastOrders = filteredOrders.filter(o => o.status === 'Delivered');

    const renderOrderCard = (order: Order) => {
        const isInProgress = order.status === 'Preparing';

        return (
            <View key={order.id} style={[styles.orderCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={styles.orderCardHeader}>
                    <View style={styles.orderInfoContainer}>
                        <Image source={{ uri: order.image }} style={styles.orderImage} />
                        <View style={styles.orderTextContainer}>
                            <Text style={[styles.orderNumber, { color: colors.text }]}>Order #{order.orderNumber}</Text>
                            <View style={styles.statusContainer}>
                                {isInProgress ? (
                                    <View style={styles.statusRow}>
                                        <MaterialCommunityIcons name="pot-steam-outline" size={16} color={colors.primary} />
                                        <Text style={[styles.statusText, { color: colors.primary }]}>Preparing your food</Text>
                                    </View>
                                ) : (
                                    <View style={styles.statusRow}>
                                        <Ionicons name="checkmark-circle" size={16} color="#22c55e" />
                                        <Text style={[styles.statusText, { color: colors.textSecondary }]}>Delivered</Text>
                                    </View>
                                )}
                            </View>
                            <Text style={[styles.orderDate, { color: colors.textSecondary }]}>
                                {order.date} • {order.time}
                            </Text>
                        </View>
                    </View>
                    <Text style={[styles.orderPrice, { color: colors.text }]}>Rs {order.price.toFixed(2)}</Text>
                </View>

                <View style={[styles.orderActions, { borderTopColor: colors.border }]}>
                    {isInProgress ? (
                        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.primary }]}>
                            <Text style={styles.actionButtonText}>Track Order</Text>
                        </TouchableOpacity>
                    ) : (
                        <>
                            <TouchableOpacity style={[styles.reorderButton, { backgroundColor: '#fff5eb' }]}>
                                <Text style={[styles.reorderButtonText, { color: colors.primary }]}>Reorder</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.moreButton, { borderColor: colors.border }]}>
                                <Ionicons name="ellipsis-horizontal" size={20} color={colors.textSecondary} />
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
            <Header title="My Orders" />

            {/* Tabs */}
            <View style={[styles.tabsContainer, { borderBottomColor: colors.border }]}>
                {TABS.map(tab => (
                    <TouchableOpacity 
                        key={tab} 
                        onPress={() => setActiveTab(tab)}
                        style={[
                            styles.tab, 
                            activeTab === tab && { borderBottomColor: colors.primary }
                        ]}
                    >
                        <Text style={[
                            styles.tabText, 
                            { color: activeTab === tab ? colors.primary : colors.textSecondary },
                            activeTab === tab && styles.activeTabText
                        ]}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <ScrollView 
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* In Progress Section */}
                {inProgressOrders.length > 0 && (
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: colors.primary }]}>IN PROGRESS</Text>
                        {inProgressOrders.map(renderOrderCard)}
                    </View>
                )}

                {/* Past Orders Section */}
                {pastOrders.length > 0 && (
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: isDark ? '#94a3b8' : '#94a3b8' }]}>PAST ORDERS</Text>
                        {pastOrders.map(renderOrderCard)}
                    </View>
                )}

                {filteredOrders.length === 0 && (
                    <View style={styles.emptyContainer}>
                        <MaterialCommunityIcons name="clipboard-text-outline" size={80} color={colors.textSecondary} />
                        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>No orders found</Text>
                    </View>
                )}
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
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderBottomWidth: 1,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff5eb',
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '800',
    },
    tabsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        borderBottomWidth: 1,
    },
    tab: {
        marginRight: 25,
        paddingVertical: 15,
        borderBottomWidth: 3,
        borderBottomColor: 'transparent',
    },
    tabText: {
        fontSize: 14,
        fontWeight: '600',
    },
    activeTabText: {
        fontWeight: '800',
    },
    scrollContent: {
        paddingBottom: 40,
    },
    section: {
        marginTop: 25,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '800',
        letterSpacing: 1.5,
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    orderCard: {
        marginHorizontal: 16,
        marginVertical: 8,
        padding: 16,
        borderRadius: 20,
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    orderCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    orderInfoContainer: {
        flexDirection: 'row',
    },
    orderImage: {
        width: 64,
        height: 64,
        borderRadius: 12,
    },
    orderTextContainer: {
        marginLeft: 15,
        justifyContent: 'center',
    },
    orderNumber: {
        fontSize: 16,
        fontWeight: '800',
    },
    statusContainer: {
        marginTop: 4,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    statusText: {
        fontSize: 14,
        fontWeight: '600',
    },
    orderDate: {
        fontSize: 12,
        marginTop: 4,
    },
    orderPrice: {
        fontSize: 16,
        fontWeight: '800',
    },
    orderActions: {
        flexDirection: 'row',
        marginTop: 15,
        paddingTop: 15,
        borderTopWidth: 1,
        gap: 10,
    },
    actionButton: {
        flex: 1,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#ff7b00',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    actionButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '800',
    },
    reorderButton: {
        flex: 1,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    reorderButtonText: {
        fontSize: 14,
        fontWeight: '800',
    },
    moreButton: {
        width: 48,
        height: 48,
        borderRadius: 12,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        paddingTop: 80,
        alignItems: 'center',
    },
    emptyText: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: '600',
    },
});
