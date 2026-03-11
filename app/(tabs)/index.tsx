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
    Dimensions
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Colors from '../../constants/Colors';

const { width } = Dimensions.get('window');

const categories = [
    { id: '1', name: 'Pizza', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBz6nagzLaUuwdlbBCOIMdiwR_HyW8rOzjEMjrHOFq5YPXXr4-b3TmPinKHmaNaouQ47fUeln4hmfKA4KkK4eOWrLLm9ROvdSRI2zDWMImt0ZdfObmg9AvFo2MQ54tOTqwsAX0sjVwfae6CvlOLHypRm1IEa5xA_GmlCvzUJKSr1rEOSep3W9K3X-JCTVbT3IW5_-UXzKlep73xd36jPdXwOTH9DdPA6fTNGbs_ulnIrNbhSU_In_P4zsPJ82OK2Fi1Eyc_Wtt4L92b' },
    { id: '2', name: 'Burger', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDpcHmdjjRScUIdGfB_5-Fsh9PoEh6L7KSNf43EvLqVZ8dwL9pWggt5V9bR8QPJDxv3DtPQNJUWoeYwpNvdwPbl3kL8nNubvN4T1TdPbtfyTNZxmAS6-V8_-PjKiHSAof0IIH-6DnozCRH4JMizPGE_aRV_pCaVGz0BedjslRbOFbJ6tXuVi4ssp0oXSQCSqF24mDtN_3sTJyEEi0ilZlA6R9VPygpeFObMYcTcgMxTmk7t8BM-g9ddX7qm4nZ6jvSufbI3DzzTdyr' },
    { id: '3', name: 'Drinks', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiYYn5BXBpAiwC7zC7acbgFj03-AVbvT5HbwkrAYNAD0IaEKOucuvtV_M3_95EfXpCfr3QD6Kkv77fwz1ZKjlebPDzecVW15T6wUSZ-7xp5OxzcYOzNIJ1jlzqekpMDNOrkeVctnJ4IIQQZL5D-5GM-SJs2gffnl0WDDXrU-dMkQ5K1KttnAA3aAcJma4DJyPwJ_Sum2wzxfGMoeSa-2gSYIREtvuqyI1vFWB0sl16di_9x6VZqeCvhrcCytg3oo9MmlKvaIdgFHJf' },
    { id: '4', name: 'Desserts', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZJ8AXRFLVwirfrF4taPld4IS6iVc4WCOueAn4B4ppF0-UCpQzhSPm5xQlBxT_fApuC00ladwQmti8djfujRczzgzl8B5fo2QZocW_o_Mso2daQ5FM8TEg2xB0jI6McSn_PC6VqHd9igzBMRiFAbKqhaC61AyJJB_ijdA8mKG0S6JxR8a0sGIGAHrxqdS9up9qY9R_YhCM6-QcYzogvEolH03SHNSjAEonTrqjig_60BwKaWPBQC1zaTri4aDBdz4yuX6bP3HuxLrk' }
];

export default function HomeScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const [search, setSearch] = useState('');

    const colors = isDark ? Colors.dark : Colors.light;

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
            <ScrollView 
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={[styles.header, { backgroundColor: colors.background }]}>
                    <View style={styles.headerTitleContainer}>
                        <MaterialCommunityIcons name="silverware-fork-knife" size={28} color={colors.primary} />
                        <Text style={[styles.headerTitle, { color: colors.text }]}>FoodieExpress</Text>
                    </View>
                    <TouchableOpacity style={styles.notificationButton}>
                        <Ionicons name="notifications-outline" size={24} color={colors.textSecondary} />
                        <View style={[styles.notificationBadge, { backgroundColor: colors.primary }]} />
                    </TouchableOpacity>
                </View>

                {/* Featured Banner */}
                <View style={styles.bannerContainer}>
                    <View style={[styles.banner, { backgroundColor: colors.primary }]}>
                        <View style={styles.bannerTextContent}>
                            <Text style={styles.bannerOffer}>LIMITED OFFER</Text>
                            <Text style={styles.bannerTitle}>Get 50% Off on Your First Order!</Text>
                            <TouchableOpacity style={styles.bannerButton}>
                                <Text style={styles.bannerButtonText}>Order Now</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bannerImageContainer}>
                            <Image 
                                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8hkuC8UwJuBn9CeclEK6QRese8wAjuT7j8oAmutc_IzOmhjzy0PApPgcDLpZdcHxhPW2AWqUnfjxQW5KiC5xqQbHk9GNrwRvIfuUOihF-2Oe0RuHoVEeV0RRIiRGKrMSOYnVFRMQC4-ZiQB-4s5CMl1-4FspxAlPpJviLiTi3s2MhK3FFL8U6P0rw_42g_glaRjUbaoaPCpbJihDw0KrIyzpWVguiCRrGUKls8bgaqGlUc_BFHIBApFN7xrT_0jDFGsoCOkPb9CJW' }} 
                                style={styles.bannerImage}
                            />
                        </View>
                    </View>
                </View>

                {/* Quick Categories */}
                <View style={styles.sectionHeader}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Categories</Text>
                    <TouchableOpacity onPress={() => router.push('/(tabs)/categories')}>
                        <Text style={[styles.viewAllText, { color: colors.primary }]}>View All</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.categoriesGrid}>
                    {categories.map((category) => (
                        <TouchableOpacity 
                            key={category.id} 
                            style={styles.categoryCard}
                            onPress={() => router.push(`/category/${category.id}`)}
                        >
                            <Image source={{ uri: category.image }} style={styles.categoryImage} />
                            <View style={styles.categoryOverlay}>
                                <Text style={styles.categoryName}>{category.name}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Popular Near You */}
                <View style={styles.sectionHeader}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Popular Near You</Text>
                </View>

                <TouchableOpacity style={[styles.restaurantCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <Image 
                        source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtKJDDZhLNCywV6uvPh2G8IHyUkotksSsGrv-itzxCvFi1I2g-SiUZ0z0aC_FbFc0xVjdibjNGJANVe0wDZXDrqqNOGtcf_8goUO1mTJLbOpFSby2krhwnt3x3JVjhmNJ-7AbwHuD-rgf6-13kn9fwGmtcNo5v-WryPgc76l5IaHaeQp-YKd2zvSOR4DjXtYpLj4DNxMeH_z402DsPVWaEd8onjucMVVjVn2L-ZWO9kbmLTNWOKWbMygE_TK1VX5t7B1iViNweUdgK' }} 
                        style={styles.restaurantImage}
                    />
                    <View style={styles.restaurantInfo}>
                        <Text style={[styles.restaurantName, { color: colors.text }]}>The Golden Grill</Text>
                        <Text style={[styles.restaurantDetails, { color: colors.textSecondary }]}>American • Burgers • 2.5 km</Text>
                        <View style={styles.ratingContainer}>
                            <Ionicons name="star" size={14} color={colors.primary} />
                            <Text style={[styles.ratingText, { color: colors.text }]}>4.8</Text>
                            <Text style={[styles.reviewsText, { color: colors.textSecondary }]}> (2.4k+ reviews)</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 30, // Extra padding for tab bar
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 50,
    },
    headerTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '800',
        letterSpacing: -0.5,
    },
    notificationButton: {
        position: 'relative',
        padding: 5,
    },
    notificationBadge: {
        position: 'absolute',
        top: 5,
        right: 5,
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    searchContainer: {
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    searchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 54,
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
    bannerContainer: {
        paddingHorizontal: 20,
        marginBottom: 25,
    },
    banner: {
        height: 160,
        borderRadius: 20,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    bannerTextContent: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    bannerOffer: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1,
        marginBottom: 4,
    },
    bannerTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '800',
        lineHeight: 22,
        marginBottom: 15,
    },
    bannerButton: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 10,
        alignSelf: 'flex-start',
    },
    bannerButtonText: {
        color: '#ff7b00',
        fontSize: 14,
        fontWeight: '800',
    },
    bannerImageContainer: {
        width: '45%',
        height: '100%',
    },
    bannerImage: {
        width: '140%',
        height: '130%',
        position: 'absolute',
        top: -10,
        right: -25,
        borderRadius: 100,
        transform: [{ rotate: '15deg' }],
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
    },
    viewAllText: {
        fontSize: 14,
        fontWeight: '700',
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 14,
        gap: 12,
        marginBottom: 25,
    },
    categoryCard: {
        width: (width - 40 - 12) / 2, // 2 cols with spacing
        height: 130,
        borderRadius: 18,
        overflow: 'hidden',
    },
    categoryImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    categoryOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'flex-end',
        padding: 15,
    },
    categoryName: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '800',
    },
    restaurantCard: {
        flexDirection: 'row',
        padding: 12,
        borderRadius: 20,
        marginHorizontal: 20,
        marginBottom: 15,
        borderWidth: 1,
        alignItems: 'center',
    },
    restaurantImage: {
        width: 80,
        height: 80,
        borderRadius: 12,
    },
    restaurantInfo: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'center',
    },
    restaurantName: {
        fontSize: 16,
        fontWeight: '800',
        marginBottom: 4,
    },
    restaurantDetails: {
        fontSize: 13,
        marginBottom: 6,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 13,
        fontWeight: '800',
        marginLeft: 4,
    },
    reviewsText: {
        fontSize: 11,
    },
});

