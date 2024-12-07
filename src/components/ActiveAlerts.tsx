import React from 'react';
import { Bell, Trash2 } from 'lucide-react';
import { usePriceAlert } from '../hooks/usePriceAlert';
import { format } from 'date-fns';

export default function ActiveAlerts() {
  const { alerts, setAlerts } = usePriceAlert();

  const deleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  if (alerts.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No active alerts
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {alerts.map(alert => (
        <div
          key={alert.id}
          className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-600" />
              <div>
                <div className="font-medium">₹{alert.targetPrice}/kg</div>
                <div className="text-sm text-gray-500">
                  Created {format(new Date(alert.createdAt), 'MMM d, yyyy HH:mm')}
                </div>
              </div>
            </div>
            <button
              onClick={() => deleteAlert(alert.id)}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <Trash2 className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          {alert.customMessage && (
            <div className="mt-2 text-sm text-gray-600">
              {alert.customMessage}
            </div>
          )}
          <div className="mt-2 flex gap-2">
            {alert.notificationChannels.map(channel => (
              <span
                key={channel}
                className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs"
              >
                {channel}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}