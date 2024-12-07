import { useState, useEffect, useCallback } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  QueryConstraint,
  getDoc,
  addDoc,
  onSnapshot,
  Timestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { PriceAlert } from '../types/alerts';
import toast from 'react-hot-toast';

const ALERTS_PER_PAGE = 10;

interface UseAlertsProps {
  searchTerm: string;
  filters: {
    type: string;
    status: string;
    sortBy: string;
  };
  page: number;
}

export function useAlerts({ searchTerm, filters, page }: UseAlertsProps) {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  // Subscribe to alerts
  useEffect(() => {
    if (!user?.id) {
      setAlerts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const queryConstraints: QueryConstraint[] = [
        where('userId', '==', user.id)
      ];

      if (filters.type !== 'all') {
        queryConstraints.push(where('category', '==', filters.type));
      }

      if (filters.status !== 'all') {
        queryConstraints.push(where('isActive', '==', filters.status === 'active'));
      }

      queryConstraints.push(orderBy('createdAt', 'desc'));
      queryConstraints.push(limit(ALERTS_PER_PAGE));

      const alertsRef = collection(db, 'alerts');
      const q = query(alertsRef, ...queryConstraints);

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          let fetchedAlerts = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as PriceAlert[];

          if (searchTerm) {
            const term = searchTerm.toLowerCase();
            fetchedAlerts = fetchedAlerts.filter(alert =>
              alert.customMessage?.toLowerCase().includes(term) ||
              alert.targetPrice.toString().includes(term)
            );
          }

          setAlerts(fetchedAlerts);
          setTotalPages(Math.ceil(fetchedAlerts.length / ALERTS_PER_PAGE) || 1);
          setLoading(false);
          setError(null);
        },
        (err) => {
          console.error('Error fetching alerts:', err);
          setError('Failed to load alerts. Please refresh the page.');
          setLoading(false);
          toast.error('Failed to load alerts. Please refresh the page.');
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error('Error setting up alerts subscription:', err);
      setError('Failed to load alerts. Please refresh the page.');
      setLoading(false);
      toast.error('Failed to load alerts. Please refresh the page.');
    }
  }, [user?.id, searchTerm, filters, page]);

  const createAlert = useCallback(async (alertData: Omit<PriceAlert, 'id' | 'userId' | 'createdAt'>) => {
    if (!user?.id) {
      toast.error('You must be logged in to create alerts');
      return;
    }

    try {
      const newAlert = {
        ...alertData,
        userId: user.id,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      const docRef = await addDoc(collection(db, 'alerts'), newAlert);
      toast.success('Alert created successfully');
      return { id: docRef.id, ...newAlert };
    } catch (error) {
      console.error('Error creating alert:', error);
      toast.error('Failed to create alert. Please try again.');
      throw error;
    }
  }, [user?.id]);

  const updateAlert = useCallback(async (id: string, data: Partial<PriceAlert>) => {
    if (!user?.id) {
      toast.error('You must be logged in to update alerts');
      return;
    }

    try {
      const alertRef = doc(db, 'alerts', id);
      const alertDoc = await getDoc(alertRef);

      if (!alertDoc.exists() || alertDoc.data()?.userId !== user.id) {
        throw new Error('Alert not found or unauthorized');
      }

      await updateDoc(alertRef, {
        ...data,
        updatedAt: Timestamp.now()
      });

      toast.success('Alert updated successfully');
    } catch (error) {
      console.error('Error updating alert:', error);
      toast.error('Failed to update alert. Please try again.');
      throw error;
    }
  }, [user?.id]);

  const deleteAlert = useCallback(async (id: string) => {
    if (!user?.id) {
      toast.error('You must be logged in to delete alerts');
      return;
    }

    try {
      const alertRef = doc(db, 'alerts', id);
      const alertDoc = await getDoc(alertRef);

      if (!alertDoc.exists() || alertDoc.data()?.userId !== user.id) {
        throw new Error('Alert not found or unauthorized');
      }

      await deleteDoc(alertRef);
      toast.success('Alert deleted successfully');
    } catch (error) {
      console.error('Error deleting alert:', error);
      toast.error('Failed to delete alert. Please try again.');
      throw error;
    }
  }, [user?.id]);

  return {
    alerts,
    loading,
    error,
    totalPages,
    createAlert,
    updateAlert,
    deleteAlert
  };
}