import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useCart } from '../../context/CartContext';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { cartItems } = useCart();
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const colors = {
      primary: '#ff7b00',
      background: isDark ? '#23190f' : '#ffffff',
      border: isDark ? '#3f2f1d' : '#f1f5f9',
  };

  return (
    <>
    <StatusBar style={isDark ? "light" : "dark"} />
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ff7b00',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: { 
          height: 85, 
          paddingBottom: 25, 
          paddingTop: 10,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          elevation: 0,
          backgroundColor: colors.background
        },
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 2,
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name={focused ? "home" : "home-outline"} size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color, focused }) => (
            <View>
              <MaterialCommunityIcons name={focused ? "cart" : "cart-outline"} size={26} color={color} />
              {cartItemCount > 0 && (
                <View style={[styles.badge, { backgroundColor: '#ff7b00' }]}>
                  <Text style={styles.badgeText}>{cartItemCount}</Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          tabBarLabel: 'Categories',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.centerTabContainer}>
              <View style={[
                styles.centerTabIcon, 
                { 
                  backgroundColor: focused ? '#ff7b00' : 'transparent',
                  borderColor: focused ? colors.background : 'transparent',
                  elevation: focused ? 8 : 0,
                  shadowOpacity: focused ? 0.3 : 0,
                  top: focused ? -20 : 0,
                }
              ]}>
                <MaterialIcons 
                  name="category" 
                  size={28} 
                  color={focused ? "white" : color} 
                />
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name={focused ? "clipboard-text" : "clipboard-text-outline"} size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name={focused ? "account" : "account-outline"} size={26} color={color} />
          ),
        }}
      />
    </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: '#000',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  centerTabContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerTabIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -20,
    shadowColor: '#ff7b00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 4,
  },
});
