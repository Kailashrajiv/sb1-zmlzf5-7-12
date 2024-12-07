import React, { useState } from 'react';
import { format } from 'date-fns';
import { Edit2, Trash2, Bell, MessageCircle, Mail, AlertCircle } from 'lucide-react';
import { PriceAlert } from '../../types/alerts';
import AlertEditModal from './AlertEditModal';
import ConfirmDialog from './ConfirmDialog';
import AlertPagination from './AlertPagination';

interface AlertsListProps {
  alerts: PriceAlert[];
  loading: boolean;
  onDelete: (id: string) => Promise<void>;
  onUpdate: (id: string, data: Partial<PriceAlert>) => Promise<void>;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function AlertsList({
  alerts,
  loading,
  onDelete,
  onUpdate,
  currentPage,
  totalPages,
  onPageChange
}: AlertsListProps) {
  const [editingAlert, setEditingAlert] = useState<PriceAlert | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!alerts || alerts.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-sm">
        <AlertCircle className="w-12 h-12 text-blue-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No alerts found</h3>
        <p className="text-gray-500">Create your first price alert to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {alerts.map(alert => (
        <div
          key={alert.id}
          className="bg-white rounded-xl shadow-sm p-6 transition-all hover:shadow-md"
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                  alert.isActive
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {alert.isActive ? 'Active' : 'Inactive'}
                </span>
                <span className="text-gray-500">•</span>
                <span className="text-sm text-gray-500">
                  Created {format(new Date(alert.createdAt), 'MMM d, yyyy HH:mm')}
                </span>
              </div>

              <h3 className="text-lg font-semibold mb-1">
                Target: ₹{alert.targetPrice.toFixed(2)}
              </h3>
              
              {alert.customMessage && (
                <p className="text-gray-600 mb-4">{alert.customMessage}</p>
              )}

              <div className="flex gap-2">
                {alert.notificationChannels?.includes('web') && (
                  <span className="flex items-center gap-1 text-sm text-gray-600">
                    <Bell className="w-4 h-4" />
                    Web
                  </span>
                )}
                {alert.notificationChannels?.includes('whatsapp') && (
                  <span className="flex items-center gap-1 text-sm text-gray-600">
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </span>
                )}
                {alert.notificationChannels?.includes('email') && (
                  <span className="flex items-center gap-1 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    Email
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setEditingAlert(alert)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Edit2 className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => setDeleteConfirm(alert.id)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5 text-red-600" />
              </button>
            </div>
          </div>
        </div>
      ))}

      {totalPages > 1 && (
        <AlertPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}

      {editingAlert && (
        <AlertEditModal
          alert={editingAlert}
          onClose={() => setEditingAlert(null)}
          onSave={async (data) => {
            await onUpdate(editingAlert.id, data);
            setEditingAlert(null);
          }}
        />
      )}

      <ConfirmDialog
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={async () => {
          if (deleteConfirm) {
            await onDelete(deleteConfirm);
            setDeleteConfirm(null);
          }
        }}
        title="Delete Alert"
        message="Are you sure you want to delete this alert? This action cannot be undone."
      />
    </div>
  );
}