import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // Firestore
import { 
  initializeAuth, 
  getReactNativePersistence,
  getAuth
} from 'firebase/auth'; // Real Firebase Auth with persistence
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const firebaseConfig = {
  apiKey: "AIzaSyAEnvj6R5x8_1iubGvFNyluDOICoI59z9k",
  authDomain: "foodorderapp-f9ba2.firebaseapp.com",
  projectId: "foodorderapp-f9ba2",
  storageBucket: "foodorderapp-f9ba2.firebasestorage.app",
  messagingSenderId: "375462995507",
  appId: "1:375462995507:web:1e6e05bca9298035862546"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Auth with Persistence
let auth;
if (Platform.OS === 'web') {
  auth = getAuth(app);
} else {
  try {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage)
    });
  } catch (e) {
    auth = getAuth(app);
  }
}

export { auth };
export const db = getFirestore(app);

export default app;
