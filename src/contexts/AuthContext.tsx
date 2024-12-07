import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  sendEmailVerification as firebaseSendEmailVerification,
  sendPasswordResetEmail,
  AuthError,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import type { User, AuthState, SignUpCredentials } from '../types/auth';
import toast from 'react-hot-toast';

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signUp: (data: SignUpCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getAuthErrorMessage = (error: AuthError): string => {
  switch (error.code) {
    case 'auth/invalid-credential':
      return 'Invalid email or password. Please try again.';
    case 'auth/user-not-found':
      return 'No account found with this email address.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.';
    default:
      return 'An error occurred. Please try again.';
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          const userData = userDoc.data() as Omit<User, 'id'> | undefined;

          setState({
            user: userData ? {
              id: firebaseUser.uid,
              ...userData,
              emailVerified: firebaseUser.emailVerified
            } : null,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });

          if (!firebaseUser.emailVerified) {
            toast.error(
              'Please verify your email address',
              {
                duration: 5000,
                icon: '✉️',
                action: {
                  text: 'Resend',
                  onClick: () => sendVerificationEmail()
                }
              }
            );
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: 'Failed to load user data'
          });
        }
      } else {
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const sendVerificationEmail = async () => {
    const currentUser = auth.currentUser;
    if (currentUser && !currentUser.emailVerified) {
      try {
        await firebaseSendEmailVerification(currentUser);
        toast.success('Verification email sent!');
      } catch (error) {
        console.error('Error sending verification email:', error);
        toast.error('Failed to send verification email');
      }
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { user: firebaseUser } = await signInWithEmailAndPassword(auth, email, password);
      
      if (!firebaseUser.emailVerified) {
        await sendVerificationEmail();
        toast.error('Please verify your email before signing in');
        await firebaseSignOut(auth);
        throw new Error('Email not verified');
      }

      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      const userData = userDoc.data() as Omit<User, 'id'>;

      setState(prev => ({
        ...prev,
        user: {
          id: firebaseUser.uid,
          ...userData,
          emailVerified: firebaseUser.emailVerified
        },
        isAuthenticated: true,
        error: null
      }));

      toast.success('Welcome back!');
    } catch (error) {
      const authError = error as AuthError;
      const errorMessage = getAuthErrorMessage(authError);
      toast.error(errorMessage);
      setState(prev => ({
        ...prev,
        error: errorMessage
      }));
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user: firebaseUser } = await signInWithPopup(auth, provider);

      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      
      if (!userDoc.exists()) {
        const userData: Omit<User, 'id'> = {
          fullName: firebaseUser.displayName || '',
          email: firebaseUser.email || '',
          phoneNumber: firebaseUser.phoneNumber || '',
          countryCode: '+1',
          createdAt: new Date().toISOString(),
          emailVerified: true
        };

        await setDoc(doc(db, 'users', firebaseUser.uid), userData);
        
        setState(prev => ({
          ...prev,
          user: {
            id: firebaseUser.uid,
            ...userData
          },
          isAuthenticated: true,
          error: null
        }));
      }

      toast.success('Successfully signed in with Google');
    } catch (error) {
      const authError = error as AuthError;
      const errorMessage = getAuthErrorMessage(authError);
      toast.error(errorMessage);
      setState(prev => ({
        ...prev,
        error: errorMessage
      }));
      throw error;
    }
  };

  const signUp = async (data: SignUpCredentials) => {
    try {
      const { user: firebaseUser } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(firebaseUser, {
        displayName: data.fullName
      });

      const userData: Omit<User, 'id'> = {
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        countryCode: data.countryCode,
        createdAt: new Date().toISOString(),
        emailVerified: false
      };

      await setDoc(doc(db, 'users', firebaseUser.uid), userData);
      await sendVerificationEmail();

      setState(prev => ({
        ...prev,
        user: {
          id: firebaseUser.uid,
          ...userData
        },
        isAuthenticated: true,
        error: null
      }));

      toast.success('Account created successfully! Please verify your email.');
    } catch (error) {
      const authError = error as AuthError;
      const errorMessage = getAuthErrorMessage(authError);
      toast.error(errorMessage);
      setState(prev => ({
        ...prev,
        error: errorMessage
      }));
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      });
      toast.success('Signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent!');
    } catch (error) {
      const authError = error as AuthError;
      const errorMessage = getAuthErrorMessage(authError);
      toast.error(errorMessage);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      ...state, 
      signIn, 
      signInWithGoogle,
      signUp, 
      signOut,
      sendVerificationEmail,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}