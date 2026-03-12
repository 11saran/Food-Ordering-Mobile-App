import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Image,
    SafeAreaView,
    useColorScheme,
    Dimensions,
    ImageBackground
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { categories } from '../../data/mockData';
import Header from '../../components/Header';
import Colors from '../../constants/Colors';

const { width } = Dimensions.get('window');

export default function CategoriesScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const [search, setSearch] = useState('');

    const colors = isDark ? Colors.dark : Colors.light;

    const filteredCategories = categories.filter(cat => 
        cat.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
            <Header 
                title="FoodieExpress" 
                rightElement={
                    <TouchableOpacity style={styles.notificationButton}>
                        <Ionicons name="notifications-outline" size={24} color={colors.text} />
                    </TouchableOpacity>
                }
            />

            <ScrollView 
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.titleContainer}>
                    <Text style={[styles.pageTitle, { color: colors.text }]}>All Categories</Text>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <View style={[styles.searchWrapper, { backgroundColor: colors.inputBg }]}>
                        <Ionicons name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
                        <TextInput
                            placeholder="Search categories or food"
                            placeholderTextColor={colors.textSecondary}
                            style={[styles.searchInput, { color: colors.text }]}
                            value={search}
                            onChangeText={setSearch}
                        />
                    </View>
                </View>

                {/* Categories Grid */}
                <View style={styles.grid}>
                    {filteredCategories.map((item, index) => (
                        <TouchableOpacity 
                            key={item.id} 
                            style={styles.card}
                            onPress={() => router.push(`/category/${item.id}`)}
                        >
                            <ImageBackground 
                                source={{ uri: item.image }} 
                                style={styles.cardImage}
                                imageStyle={{ borderRadius: 20 }}
                            >
                                <View style={styles.cardOverlay}>
                                    <Text style={styles.categoryName}>{item.name}</Text>
                                    <Text style={styles.optionsCount}>{Math.floor(Math.random() * 10) + 10}+ Options</Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    ))}
                </View>
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
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '800',
    },
    notificationButton: {
        padding: 5,
    },
    scrollContent: {
        paddingBottom: 110,
    },
    titleContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    pageTitle: {
        fontSize: 28,
        fontWeight: '800',
    },
    searchContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 20,
    },
    searchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 52,
        borderRadius: 15,
        paddingHorizontal: 15,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 12,
        gap: 16,
    },
    card: {
        width: (width - 40) / 2,
        aspectRatio: 0.8,
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardImage: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    cardOverlay: {
        padding: 15,
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: '100%',
        justifyContent: 'flex-end',
    },
    categoryName: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '800',
    },
    optionsCount: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
        fontWeight: '500',
        marginTop: 4,
    },
});
