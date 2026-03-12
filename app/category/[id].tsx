import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { 
    FlatList, 
    Image, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View, 
    SafeAreaView, 
    TextInput,
    useColorScheme,
    Dimensions,
    ScrollView
} from 'react-native';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { categories, foodItems } from '../../data/mockData';
import Colors from '../../constants/Colors';

const { width } = Dimensions.get('window');

const FILTERS = ['All', 'Veggie', 'Non-Veg'];

export default function CategoryScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { addToCart, cartItems, updateQuantity, cartTotal } = useCart();
    const { showToast } = useToast();
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const colors = isDark ? Colors.dark : Colors.light;

    const [search, setSearch] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');

    const categoryId = typeof id === 'string' ? id : id[0];
    const category = categories.find((c) => c.id === categoryId);
    const categoryName = category?.name || 'Category';
    
    const filteredItems = foodItems
        .filter((i) => i.categoryId === categoryId)
        .filter((i) => {
            if (activeFilter === 'All') return true;
            if (activeFilter === 'Veggie') return i.tag === 'Veg';
            if (activeFilter === 'Non-Veg') return i.tag === 'Non-Veg';
            return true;
        })
        .filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));

    const renderItem = ({ item }: { item: any }) => {
        const cartItem = cartItems.find(i => i.id === item.id);
        
        return (
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                    <Text style={[styles.itemName, { color: colors.text }]}>{item.name}</Text>
                    {item.tag && (
                        <View style={[
                            styles.tagBadge, 
                            { backgroundColor: item.tag === 'Veg' ? '#ecfdf5' : '#fef2f2' }
                        ]}>
                            <Text style={[
                                styles.tagText, 
                                { color: item.tag === 'Veg' ? '#10b981' : '#ef4444' }
                            ]}>
                                {item.tag}
                            </Text>
                        </View>
                    )}
                </View>
                <Text style={[styles.itemDescription, { color: colors.textSecondary }]} numberOfLines={2}>
                    {item.description || 'Delicious freshly prepared ' + item.name.toLowerCase()}
                </Text>
                <View style={styles.cardFooter}>
                    <Text style={[styles.itemPrice, { color: colors.primary }]}>Rs {item.price.toFixed(2)}</Text>
                    
                    {cartItem ? (
                        <View style={styles.quantityContainer}>
                            <TouchableOpacity 
                                style={[styles.qtyButton, { borderColor: colors.border }]}
                                onPress={() => updateQuantity(item.id, cartItem.quantity - 1)}
                            >
                                <Ionicons name="remove" size={18} color={colors.text} />
                            </TouchableOpacity>
                            <Text style={[styles.qtyText, { color: colors.text }]}>{cartItem.quantity}</Text>
                            <TouchableOpacity 
                                style={[styles.qtyButton, { backgroundColor: colors.primary, borderColor: colors.primary }]}
                                onPress={() => addToCart(item)}
                            >
                                <Ionicons name="add" size={18} color="white" />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity 
                            style={[styles.addButton, { backgroundColor: colors.primary }]}
                            activeOpacity={0.8}
                            onPress={() => {
                                addToCart(item);
                                showToast({ message: `${item.name} added to cart`, type: 'success' });
                            }}
                        >
                            <MaterialCommunityIcons name="cart-plus" size={18} color="white" />
                            <Text style={styles.addButtonText}>Add</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <Stack.Screen options={{ headerShown: false }} />
            
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity 
                        onPress={() => router.back()}
                        style={[styles.backButton, { backgroundColor: colors.primary + '1A' }]}
                    >
                        <Ionicons name="arrow-back" size={24} color={colors.primary} />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { color: colors.text }]}>{categoryName}</Text>
                </View>
            </View>

            {/* Search Bar */}
            <View style={styles.searchSection}>
                <View style={[styles.searchWrapper, { backgroundColor: isDark ? colors.card : '#fff', borderColor: colors.border }]}>
                    <Ionicons name="search" size={20} color="#94a3b8" style={styles.searchIcon} />
                    <TextInput
                        style={[styles.searchInput, { color: colors.text }]}
                        placeholder={`Search for your favorite ${categoryName.toLowerCase()}`}
                        placeholderTextColor="#94a3b8"
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>
            </View>

            {/* Filters */}
            <View style={styles.filtersSection}>
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.filtersContent}
                >
                    {FILTERS.map((filter) => (
                        <TouchableOpacity
                            key={filter}
                            onPress={() => setActiveFilter(filter)}
                            style={[
                                styles.filterPill,
                                activeFilter === filter 
                                    ? { backgroundColor: colors.primary, borderColor: colors.primary }
                                    : { backgroundColor: isDark ? colors.card : '#fff', borderColor: colors.border }
                            ]}
                        >
                            <Text style={[
                                styles.filterPillText,
                                activeFilter === filter 
                                    ? { color: 'white' }
                                    : { color: isDark ? colors.textSecondary : '#64748b' }
                            ]}>
                                {filter}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* List */}
            <FlatList
                data={filteredItems}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>No items found matching your search.</Text>
                    </View>
                }
            />

            {/* Sticky View Cart Bar */}
            {cartItems.length > 0 && (
                <View style={[styles.viewCartBar, { backgroundColor: colors.primary }]}>
                    <TouchableOpacity 
                        style={styles.viewCartButton}
                        activeOpacity={0.9}
                        onPress={() => router.push('/cart')}
                    >
                        <View style={styles.cartInfo}>
                            <View style={styles.cartBadge}>
                                <Text style={styles.cartBadgeText}>
                                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                                </Text>
                            </View>
                            <Text style={styles.viewCartText}>View Cart</Text>
                        </View>
                        <Text style={styles.cartTotalText}>Rs {cartTotal.toFixed(2)}</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 45,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '800',
    },
    filterButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchSection: {
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    searchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        borderRadius: 12,
        paddingHorizontal: 12,
        borderWidth: 1,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        fontWeight: '500',
    },
    filtersSection: {
        marginBottom: 16,
    },
    filtersContent: {
        paddingHorizontal: 16,
        gap: 12,
    },
    filterPill: {
        height: 38,
        paddingHorizontal: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    filterPillText: {
        fontSize: 13,
        fontWeight: '700',
    },
    listContainer: {
        padding: 16,
        gap: 16,
        paddingBottom: 100,
    },
    card: {
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    cardImage: {
        width: '100%',
        aspectRatio: 16 / 9,
    },
    cardContent: {
        padding: 16,
        gap: 8,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    itemName: {
        fontSize: 18,
        fontWeight: '800',
        flex: 1,
        marginRight: 8,
    },
    tagBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 999,
    },
    tagText: {
        fontSize: 10,
        fontWeight: '800',
        textTransform: 'uppercase',
    },
    itemDescription: {
        fontSize: 13,
        lineHeight: 18,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
    },
    itemPrice: {
        fontSize: 18,
        fontWeight: '800',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 38,
        paddingHorizontal: 16,
        borderRadius: 10,
        gap: 6,
    },
    addButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '800',
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 40,
    },
    emptyText: {
        fontSize: 14,
        fontWeight: '500',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    qtyButton: {
        width: 32,
        height: 32,
        borderRadius: 8,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    qtyText: {
        fontSize: 16,
        fontWeight: '800',
        minWidth: 20,
        textAlign: 'center',
    },
    viewCartBar: {
        position: 'absolute',
        bottom: 20,
        left: 16,
        right: 16,
        height: 64,
        borderRadius: 20,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        overflow: 'hidden',
    },
    viewCartButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        paddingHorizontal: 20,
    },
    cartInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    cartBadge: {
        backgroundColor: 'rgba(255,255,255,0.25)',
        width: 32,
        height: 32,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartBadgeText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '900',
    },
    viewCartText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '800',
    },
    cartTotalText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '900',
    },
});
