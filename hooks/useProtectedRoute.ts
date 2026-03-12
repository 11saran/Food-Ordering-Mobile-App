import { useRootNavigationState, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export function useProtectedRoute() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    const isNavigationReady = !!navigationState?.key;
    if (!isNavigationReady || loading) return;

    const inAuthGroup = segments[0] === 'login' || segments[0] === 'signup';
    const segment0 = segments[0] as string;
    const isAtRoot = (segments.length as number) === 0 || segment0 === 'index' || !segment0;

    const timer = setTimeout(() => {
      if (!user && !inAuthGroup) {
        // If not logged in, go to login
        router.replace('/login');
      } else if (user && (inAuthGroup || isAtRoot)) {
        // If logged in, go home
        router.replace('/(tabs)' as any);
      }
    }, 1);

    return () => clearTimeout(timer);
  }, [user, segments, navigationState?.key, loading]);
}
