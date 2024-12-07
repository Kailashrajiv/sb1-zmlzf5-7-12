import { useState, useEffect } from 'react';
import { collection, addDoc, query, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { PriceAlert, NotificationChannel } from '../types/alerts';
import { useMCXPrice } from './useMCXPrice';

export function usePriceAlert() {
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const { priceData } = useMCXPrice();
  const { user } = useAuth();
  const [lastNotifiedPrice, setLastNotifiedPrice] = useState<number | null>(null);

  useEffect(() => {
    if (!user) return;

    // Subscribe to user's alerts
    const q = query(
      collection(db, 'alerts'),
      where('userId', '==', user.id)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newAlerts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as PriceAlert[];

      setAlerts(newAlerts);
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!priceData?.currentPrice || !user) return;

    const currentPrice = priceData.currentPrice;
    
    if (lastNotifiedPrice === currentPrice) return;

    alerts.forEach(async (alert) => {
      if (!alert.isActive) return;

      const shouldTrigger = Math.abs(currentPrice - alert.targetPrice) <= 0.01;
      
      if (shouldTrigger) {
        await triggerAlert(alert, currentPrice);
        setLastNotifiedPrice(currentPrice);
      }
    });
  }, [priceData?.currentPrice, alerts, lastNotifiedPrice, user]);

  const createAlert = async (
    targetPrice: number,
    customMessage: string,
    notificationChannels: NotificationChannel[]
  ): Promise<PriceAlert> => {
    if (!user) throw new Error('User must be authenticated');

    const newAlert: Omit<PriceAlert, 'id'> = {
      userId: user.id,
      targetPrice,
      currentPrice: priceData?.currentPrice || 0,
      customMessage,
      notificationChannels,
      isActive: true,
      createdAt: new Date().toISOString()
    };

    const docRef = await addDoc(collection(db, 'alerts'), newAlert);
    return { id: docRef.id, ...newAlert };
  };

  const deleteAlert = async (alertId: string) => {
    await deleteDoc(doc(db, 'alerts', alertId));
  };

  const triggerAlert = async (alert: PriceAlert, currentPrice: number) => {
    const message = formatAlertMessage(alert, currentPrice);
    
    // Add notification to Firestore
    await addDoc(collection(db, 'notifications'), {
      userId: user?.id,
      alertId: alert.id,
      message,
      channels: alert.notificationChannels,
      createdAt: new Date().toISOString(),
      status: 'pending'
    });
  };

  const formatAlertMessage = (alert: PriceAlert, currentPrice: number): string => {
    return `The MCX price has reached Rs. ${currentPrice}/kg\n${alert.customMessage}`;
  };

  return {
    alerts,
    createAlert,
    deleteAlert
  };
}