import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, Bell, TrendingUp } from 'lucide-react';
import type { Commodity } from '../types';

interface Props {
  commodities: Commodity[];
  view: 'grid' | 'list';
  onSetAlert: (commodityId: string) => void;
}

export default function CommodityGrid({ commodities, view, onSetAlert }: Props) {
  if (view === 'list') {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commodity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day Range</th>
              <th className="px-6 py-3 relative"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {commodities.map((commodity) => (
              <tr key={commodity.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{commodity.name}</div>
                    <div className="text-sm text-gray-500">{commodity.exchange}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    ${commodity.currentPrice.toFixed(2)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`flex items-center text-sm ${
                    commodity.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {commodity.change >= 0 ? (
                      <ArrowUpCircle className="w-4 h-4 mr-1" />
                    ) : (
                      <ArrowDownCircle className="w-4 h-4 mr-1" />
                    )}
                    {Math.abs(commodity.change).toFixed(2)}%
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {commodity.volume.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${commodity.dayLow.toFixed(2)} - ${commodity.dayHigh.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onSetAlert(commodity.id)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Set Alert
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {commodities.map((commodity) => (
        <div
          key={commodity.id}
          className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{commodity.name}</h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {commodity.exchange}
              </span>
            </div>
            <button
              onClick={() => onSetAlert(commodity.id)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="Set Alert"
            >
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                ${commodity.currentPrice.toFixed(2)}
              </div>
              <div className={`flex items-center gap-1 ${
                commodity.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {commodity.change >= 0 ? (
                  <ArrowUpCircle className="w-4 h-4" />
                ) : (
                  <ArrowDownCircle className="w-4 h-4" />
                )}
                <span className="font-medium">
                  {Math.abs(commodity.change).toFixed(2)}%
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Volume</div>
              <div className="font-medium text-gray-700">
                {commodity.volume.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Day Range</span>
              <span className="text-gray-900">
                ${commodity.dayLow.toFixed(2)} - ${commodity.dayHigh.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Previous Close</span>
              <span className="text-gray-900">${commodity.previousClose.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
            <span>Last updated: {new Date(commodity.lastUpdated).toLocaleString()}</span>
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
      ))}
    </div>
  );
}