import React from 'react';
import { ArrowUpDown } from 'lucide-react';

interface AlertFiltersProps {
  filters: {
    type: string;
    status: string;
    sortBy: string;
  };
  onChange: (filters: any) => void;
}

export default function AlertFilters({ filters, onChange }: AlertFiltersProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Alert Type
        </label>
        <select
          value={filters.type}
          onChange={(e) => onChange({ ...filters, type: e.target.value })}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Types</option>
          <option value="mcx">MCX</option>
          <option value="lme">LME</option>
          <option value="nalco">NALCO</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Status
        </label>
        <select
          value={filters.status}
          onChange={(e) => onChange({ ...filters, status: e.target.value })}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sort By
        </label>
        <div className="flex items-center gap-2">
          <select
            value={filters.sortBy}
            onChange={(e) => onChange({ ...filters, sortBy: e.target.value })}
            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="date">Date Created</option>
            <option value="price">Target Price</option>
            <option value="type">Alert Type</option>
          </select>
          <button
            onClick={() => onChange({
              ...filters,
              sortBy: filters.sortBy.startsWith('-')
                ? filters.sortBy.substring(1)
                : `-${filters.sortBy}`
            })}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowUpDown className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}