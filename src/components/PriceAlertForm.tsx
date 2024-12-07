import React, { useState } from 'react';
import { Bell, MessageCircle, Mail, AlertCircle } from 'lucide-react';
import { NotificationChannel } from '../types/alerts';
import { usePriceAlert } from '../hooks/usePriceAlert';

export default function PriceAlertForm() {
  const { createAlert } = usePriceAlert();
  const [targetPrice, setTargetPrice] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [channels, setChannels] = useState<NotificationChannel[]>(['web']);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!targetPrice) return;

    try {
      await createAlert(
        parseFloat(targetPrice),
        customMessage,
        channels
      );

      // Reset form
      setTargetPrice('');
      setCustomMessage('');
      setChannels(['web']);
    } catch (error) {
      console.error('Failed to create alert:', error);
    }
  };

  const toggleChannel = (channel: NotificationChannel) => {
    setChannels(prev => 
      prev.includes(channel)
        ? prev.filter(c => c !== channel)
        : [...prev, channel]
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <AlertCircle className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-bold">Set Price Alert</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Price (₹/kg)
          </label>
          <input
            type="number"
            step="0.01"
            value={targetPrice}
            onChange={(e) => setTargetPrice(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter target price"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Custom Message
          </label>
          <textarea
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            placeholder="Enter your custom message"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notification Channels
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => toggleChannel('web')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                channels.includes('web')
                  ? 'bg-blue-50 text-blue-600'
                  : 'bg-gray-50 text-gray-600'
              }`}
            >
              <Bell className="w-4 h-4" />
              Web
            </button>
            <button
              type="button"
              onClick={() => toggleChannel('whatsapp')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                channels.includes('whatsapp')
                  ? 'bg-blue-50 text-blue-600'
                  : 'bg-gray-50 text-gray-600'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </button>
            <button
              type="button"
              onClick={() => toggleChannel('email')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                channels.includes('email')
                  ? 'bg-blue-50 text-blue-600'
                  : 'bg-gray-50 text-gray-600'
              }`}
            >
              <Mail className="w-4 h-4" />
              Email
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create Alert
        </button>
      </form>
    </div>
  );
}