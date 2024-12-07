import React, { useState } from 'react';
import { Bell, X, AlertTriangle } from 'lucide-react';
import type { Alert, Commodity } from '../types';

interface Props {
  onSubmit: (alert: Omit<Alert, 'id'>) => void;
  onClose: () => void;
  commodityId: string;
  commodity: Commodity;
}

export default function AlertModal({ onSubmit, onClose, commodityId, commodity }: Props) {
  const [alertData, setAlertData] = useState({
    type: 'PRICE_ABOVE',
    value: commodity.currentPrice,
    message: '',
    notificationMethod: 'whatsapp',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      commodityId,
      type: alertData.type as Alert['type'],
      value: alertData.value,
      message: alertData.message,
      isActive: true,
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Bell className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Set Price Alert</h2>
                <p className="text-sm text-gray-500">{commodity.name}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-blue-800 mb-2">
              <AlertTriangle className="w-4 h-4" />
              <span className="font-medium">Current Price</span>
            </div>
            <div className="text-2xl font-bold text-blue-900">
              ${commodity.currentPrice.toFixed(2)}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alert Type
              </label>
              <select
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={alertData.type}
                onChange={(e) => setAlertData({ ...alertData, type: e.target.value })}
              >
                <option value="PRICE_ABOVE">Price Above</option>
                <option value="PRICE_BELOW">Price Below</option>
                <option value="PERCENTAGE_CHANGE">Percentage Change</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trigger Value
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  step="0.01"
                  className="pl-7 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={alertData.value}
                  onChange={(e) => setAlertData({ ...alertData, value: parseFloat(e.target.value) })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notification Method
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className={`flex items-center justify-center px-4 py-2 border rounded-lg ${
                    alertData.notificationMethod === 'whatsapp'
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setAlertData({ ...alertData, notificationMethod: 'whatsapp' })}
                >
                  WhatsApp
                </button>
                <button
                  type="button"
                  className={`flex items-center justify-center px-4 py-2 border rounded-lg ${
                    alertData.notificationMethod === 'email'
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setAlertData({ ...alertData, notificationMethod: 'email' })}
                >
                  Email
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message Template
              </label>
              <textarea
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
                value={alertData.message}
                onChange={(e) => setAlertData({ ...alertData, message: e.target.value })}
                placeholder="Enter message to send when alert triggers..."
              />
              <p className="mt-2 text-sm text-gray-500">
                Available variables: {'{price}'}, {'{change}'}, {'{commodity}'}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Alert
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}