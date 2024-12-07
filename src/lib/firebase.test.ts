import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

// Test data for alerts
const testAlerts = [
  {
    userId: 'test-user',
    targetPrice: 235.50,
    currentPrice: 234.75,
    customMessage: 'Test alert 1',
    notificationChannels: ['web', 'email'],
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    userId: 'test-user',
    targetPrice: 240.00,
    currentPrice: 234.75,
    customMessage: 'Test alert 2',
    notificationChannels: ['whatsapp'],
    isActive: true,
    createdAt: new Date().toISOString()
  }
];

export async function seedTestData() {
  try {
    // Add test alerts
    const alertsRef = collection(db, 'alerts');
    for (const alert of testAlerts) {
      await addDoc(alertsRef, alert);
    }
    console.log('Test data seeded successfully');
  } catch (error) {
    console.error('Error seeding test data:', error);
  }
}