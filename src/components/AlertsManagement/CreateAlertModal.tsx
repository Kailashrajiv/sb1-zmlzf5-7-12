import React, { useState } from 'react';
import { X, Bell, AlertTriangle } from 'lucide-react';
import type { PriceAlert } from '../../types/alerts';

interface CreateAlertModalProps {
  onClose: () => void;
  onCreate: (data: Omit<PriceAlert, 'id' | 'userId' | 'createdAt'>) => Promise<void>;
}

export default function CreateAlertModal({ onClose, onCreate }: CreateAlertModalProps) {
  const [formData, setFormData] = useState({
    targetPrice: '',
    customMessage: '',
    notificationChannels: ['web'],
    category: 'MCX' as const,
    isActive: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.targetPrice || parseFloat(formData.targetPrice) <= 0) {
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

    if (!validateForm() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onCreate({
        ...formData,
        targetPrice: parseFloat(formData.targetPrice)
      });
      onClose();
    } catch (error) {
      console.error('Failed to create alert:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="flex items-center gap-3 p-6 border-b">
          <div className="p-2 bg-blue-100 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold">Create Price Alert</h2>
          <button
            onClick={onClose}
            className="ml-auto p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Price (₹)
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.targetPrice}
              onChange={(e) => setFormData({
                ...formData,
                targetPrice: e.target.value
              })}
              className={`w-full px-3 py-2 border ${
                errors.targetPrice ? 'border-red-500' : 'border-gray-200'
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Enter target price"
            />
            {errors.targetPrice && (
              <p className="mt-1 text-sm text-red-500">{errors.targetPrice}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom Message (Optional)
            </label>
            <textarea
              value={formData.customMessage}
              onChange={(e) => setFormData({
                ...formData,
                customMessage: e.target.value
              })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Add a custom message for your alert"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notification Methods
            </label>
            <div className="space-y-2">
              {[
                { id: 'web', label: 'Web App', icon: Bell },
                { id: 'whatsapp', label: 'WhatsApp', icon: Bell },
                { id: 'email', label: 'Email', icon: Bell }
              ].map(({ id, label, icon: Icon }) => (
                <label key={id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.notificationChannels.includes(id)}
                    onChange={(e) => {
                      const channels = e.target.checked
                        ? [...formData.notificationChannels, id]
                        : formData.notificationChannels.filter(c => c !== id);
                      setFormData({ ...formData, notificationChannels: channels });
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">{label}</span>
                </label>
              ))}
            </div>
            {errors.notificationChannels && (
              <p className="mt-1 text-sm text-red-500">{errors.notificationChannels}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Create Alert
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}