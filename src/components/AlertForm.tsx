import React, { useState } from 'react';
import { Bell, X } from 'lucide-react';
import type { Alert } from '../types';

interface Props {
  onSubmit: (alert: Omit<Alert, 'id'>) => void;
  onClose: () => void;
  commodityId: string;
}

export function AlertForm({ onSubmit, onClose, commodityId }: Props) {
  const [alertData, setAlertData] = useState({
    type: 'PRICE_ABOVE',
    value: 0,
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      commodityId,
      ...alertData,
      isActive: true,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold">Set Price Alert</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alert Type
            </label>
            <select
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={alertData.type}
              onChange={(e) => setAlertData({ ...alertData, type: e.target.value as Alert['type'] })}
            >
              <option value="PRICE_ABOVE">Price Above</option>
              <option value="PRICE_BELOW">Price Below</option>
              <option value="PERCENTAGE_CHANGE">Percentage Change</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trigger Value
            </label>
            <input
              type="number"
              step="0.01"
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={alertData.value}
              onChange={(e) => setAlertData({ ...alertData, value: parseFloat(e.target.value) })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message Template
            </label>
            <textarea
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
              value={alertData.message}
              onChange={(e) => setAlertData({ ...alertData, message: e.target.value })}
              placeholder="Enter message to send when alert triggers..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Alert
          </button>
        </form>
      </div>
    </div>
  );
}