import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext'; // Fixed human typo
import { CartProvider } from '../context/CartContext';
import { ToastProvider } from '../context/ToastContext';
import { useProtectedRoute } from '../hooks/useProtectedRoute';

function RootLayoutNav() {
  // Call our human-friendly navigation guard
  useProtectedRoute();

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="category/[id]" options={{ title: 'Menu Items', headerBackTitle: 'Back' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <RootLayoutNav />
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
