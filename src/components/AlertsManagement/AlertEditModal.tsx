import React, { useState } from 'react';
import { X } from 'lucide-react';
import { PriceAlert } from '../../types/alerts';

interface AlertEditModalProps {
  alert: PriceAlert;
  onClose: () => void;
  onSave: (data: Partial<PriceAlert>) => Promise<void>;
}

export default function AlertEditModal({ alert, onClose, onSave }: AlertEditModalProps) {
  const [formData, setFormData] = useState({
    targetPrice: alert.targetPrice,
    customMessage: alert.customMessage,
    notificationChannels: alert.notificationChannels,
    isActive: alert.isActive
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.targetPrice || formData.targetPrice <= 0) {
      newErrors.targetPrice = 'Please enter a valid target price';
    }

    if (formData.notificationChannels.length === 0) {
      newErrors.notificationChannels = 'Please select at least one notification method';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await onSave(formData);
    } catch (error) {
      console.error('Failed to update alert:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold">Edit Alert</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Price
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.targetPrice}
              onChange={(e) => setFormData({
                ...formData,
                targetPrice: parseFloat(e.target.value)
              })}
              className={`w-full px-3 py-2 border ${
                errors.targetPrice ? 'border-red-500' : 'border-gray-200'
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
            {errors.targetPrice && (
              <p className="mt-1 text-sm text-red-500">{errors.targetPrice}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom Message
            </label>
            <textarea
              value={formData.customMessage}
              onChange={(e) => setFormData({
                ...formData,
                customMessage: e.target.value
              })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notification Methods
            </label>
            <div className="space-y-2">
              {['web', 'whatsapp', 'email'].map((channel) => (
                <label key={channel} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.notificationChannels.includes(channel)}
                    onChange={(e) => {
                      const channels = e.target.checked
                        ? [...formData.notificationChannels, channel]
                        : formData.notificationChannels.filter(c => c !== channel);
                      setFormData({ ...formData, notificationChannels: channels });
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700 capitalize">{channel}</span>
                </label>
              ))}
            </div>
            {errors.notificationChannels && (
              <p className="mt-1 text-sm text-red-500">{errors.notificationChannels}</p>
            )}
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({
                  ...formData,
                  isActive: e.target.checked
                })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">Active</span>
            </label>
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}