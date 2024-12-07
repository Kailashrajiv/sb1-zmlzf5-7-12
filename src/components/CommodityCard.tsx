import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, Bell, Loader2 } from 'lucide-react';
import type { Commodity } from '../types';
import { useMCXPrice } from '../hooks/useMCXPrice';

interface Props {
  commodity: Commodity;
  onSetAlert: (commodityId: string) => void;
}

export function CommodityCard({ commodity, onSetAlert }: Props) {
  const { priceData, loading, error } = useMCXPrice('2024-11-29');
  const isPositiveChange = (priceData?.change ?? commodity.change) >= 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{commodity.name}</h3>
          <span className="text-sm text-gray-500">{commodity.exchange}</span>
        </div>
        <button
          onClick={() => onSetAlert(commodity.id)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          title="Set Alert"
        >
          <Bell className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          {loading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Loading...</span>
            </div>
          ) : error ? (
            <div className="text-red-600">Failed to load price</div>
          ) : (
            <>
              <div className="text-2xl font-bold text-gray-900">
                ₹{priceData?.currentPrice.toFixed(2) ?? commodity.currentPrice.toFixed(2)}
              </div>
              <div className={`flex items-center gap-1 ${
                isPositiveChange ? 'text-green-600' : 'text-red-600'
              }`}>
                {isPositiveChange ? (
                  <ArrowUpCircle className="w-4 h-4" />
                ) : (
                  <ArrowDownCircle className="w-4 h-4" />
                )}
                <span className="font-medium">
                  {Math.abs(priceData?.changePercent ?? commodity.change).toFixed(2)}%
                </span>
              </div>
            </>
          )}
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Volume</div>
          <div className="font-medium text-gray-700">
            {(priceData?.volume ?? commodity.volume).toLocaleString()}
          </div>
        </div>
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Day's Range</span>
          <span className="text-gray-900">
            ₹{(priceData?.dayLow ?? commodity.dayLow).toFixed(2)} - 
            ₹{(priceData?.dayHigh ?? commodity.dayHigh).toFixed(2)}
          </span>
        </div>
      </div>
      
      <div className="mt-4 text-xs text-gray-500">
        Last updated: {new Date(priceData?.lastUpdated ?? commodity.lastUpdated).toLocaleString()}
      </div>
    </div>
  );
}