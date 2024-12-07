import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore, initializeFirestore, persistentLocalCache, persistentSingleTabManager } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBdfU7o3i_2U3oUE_GRKGtUeVuzSJ0RnHU",
  authDomain: "novexpro-a629e.firebaseapp.com",
  projectId: "novexpro-a629e",
  storageBucket: "novexpro-a629e.firebasestorage.app",
  messagingSenderId: "101696695126",
  appId: "1:101696695126:web:685125cd6fe5333b23c4f7",
  measurementId: "G-RBJC2PRDFY"
};

let app;
let auth;
let db;
let analytics;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  
  // Initialize Firestore with persistent cache configuration
  db = initializeFirestore(app, {
    localCache: persistentLocalCache({
      tabManager: persistentSingleTabManager()
    })
  });
  
  // Enable persistent auth state
  setPersistence(auth, browserLocalPersistence);
  
  // Initialize Analytics only in browser environment
  if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }
} catch (error: any) {
  if (error.code !== 'app/duplicate-app') {
    console.error('Error initializing Firebase:', error);
  }
  app = initializeApp(firebaseConfig);
  auth = getAuth();
  db = getFirestore();
  if (typeof window !== 'undefined') {
    analytics = getAnalytics();
  }
}

export { app, auth, db, analytics };