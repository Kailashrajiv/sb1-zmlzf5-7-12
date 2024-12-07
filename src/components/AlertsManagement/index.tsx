import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal, Plus } from 'lucide-react';
import AlertsList from './AlertsList';
import AlertFilters from './AlertFilters';
import AlertSearch from './AlertSearch';
import CreateAlertModal from './CreateAlertModal';
import { useAlerts } from '../../hooks/useAlerts';
import { Toaster } from 'react-hot-toast';

export default function AlertsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    sortBy: 'createdAt'
  });
  const [showFilters, setShowFilters] = useState(false);

  const {
    alerts,
    loading,
    error,
    totalPages,
    createAlert,
    deleteAlert,
    updateAlert
  } = useAlerts({
    searchTerm,
    filters,
    page: currentPage
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Toaster position="top-right" />
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Manage Alerts
          </h1>
          <p className="text-gray-600 mt-2">
            Set up and manage your price alerts
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Create Alert
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Panel */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold">Filters</h2>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <SlidersHorizontal className="w-5 h-5" />
              </button>
            </div>

            <div className={`${showFilters ? 'block' : 'hidden lg:block'}`}>
              <AlertFilters
                filters={filters}
                onChange={setFilters}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          {/* Search Bar */}
          <div className="mb-6">
            <AlertSearch
              value={searchTerm}
              onChange={setSearchTerm}
            />
          </div>

          {/* Alerts List */}
          <AlertsList
            alerts={alerts}
            loading={loading}
            onDelete={deleteAlert}
            onUpdate={updateAlert}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* Create Alert Modal */}
      {showCreateModal && (
        <CreateAlertModal
          onClose={() => setShowCreateModal(false)}
          onCreate={createAlert}
        />
      )}
    </div>
  );
}