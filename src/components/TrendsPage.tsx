import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, SlidersHorizontal, Eye, EyeOff, RefreshCcw } from 'lucide-react';
import { format, subDays, subHours, subMinutes } from 'date-fns';

type TimeRange = 'live' | '1min' | '30min' | '1h' | '1d' | '1w' | '1m';
type PriceRange = 'all' | 'mcx' | 'lme' | 'lme-cash';

const generateMockData = (range: TimeRange, priceRange: PriceRange) => {
  const data = [];
  const now = new Date();
  const points = 100;

  // If LME Cash Settlement is selected, only show daily data points
  if (priceRange === 'lme-cash') {
    for (let i = points; i >= 0; i--) {
      const date = subDays(now, i);
      data.push({
        date: format(date, 'MMM dd'),
        'lme-cash': Math.random() * (2650 - 2630) + 2630,
      });
    }
    return data;
  }
  
  for (let i = points; i >= 0; i--) {
    let date;
    switch (range) {
      case '1min':
        date = subMinutes(now, i);
        break;
      case '30min':
        date = subMinutes(now, i * 30);
        break;
      case '1h':
        date = subHours(now, i);
        break;
      case '1d':
        date = subHours(now, i * 2);
        break;
      case '1w':
        date = subDays(now, i);
        break;
      case '1m':
        date = subDays(now, i * 2);
        break;
      default:
        date = new Date();
    }
    
    data.push({
      date: format(date, range === '1min' ? 'HH:mm:ss' : 'MMM dd HH:mm'),
      mcx: Math.random() * (240 - 230) + 230,
      lme: Math.random() * (235 - 225) + 225,
    });
  }
  return data;
};

export default function TrendsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('1d');
  const [priceRange, setPriceRange] = useState<PriceRange>('all');
  const [customDateRange, setCustomDateRange] = useState({ start: '', end: '' });
  const [showCustomRange, setShowCustomRange] = useState(false);
  const [yAxisInterval, setYAxisInterval] = useState(1);
  const [isLive, setIsLive] = useState(false);
  const [yAxisMin, setYAxisMin] = useState<number | 'auto'>('auto');
  const [yAxisMax, setYAxisMax] = useState<number | 'auto'>('auto');

  const timeRangeOptions: { value: TimeRange; label: string; disabled?: boolean }[] = [
    { value: 'live', label: 'Live', disabled: priceRange === 'lme-cash' },
    { value: '1min', label: '1 Min', disabled: priceRange === 'lme-cash' },
    { value: '30min', label: '30 Min', disabled: priceRange === 'lme-cash' },
    { value: '1h', label: '1 Hour', disabled: priceRange === 'lme-cash' },
    { value: '1d', label: '1 Day' },
    { value: '1w', label: '1 Week' },
    { value: '1m', label: '1 Month' },
  ];

  const priceRangeOptions = [
    { value: 'all', label: 'MCX & LME' },
    { value: 'mcx', label: 'MCX Only' },
    { value: 'lme', label: 'LME Only' },
    { value: 'lme-cash', label: 'LME Cash Settlement' },
  ];

  // Reset to daily view if LME Cash Settlement is selected
  React.useEffect(() => {
    if (priceRange === 'lme-cash' && ['live', '1min', '30min', '1h'].includes(timeRange)) {
      setTimeRange('1d');
    }
  }, [priceRange]);

  const data = generateMockData(timeRange, priceRange);

  // Auto-refresh for live data
  React.useEffect(() => {
    let intervalId: number;
    if (isLive && priceRange !== 'lme-cash') {
      intervalId = window.setInterval(() => {
        // Update data here
      }, 1000);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isLive, priceRange]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        {/* Controls */}
        <div className="flex flex-wrap gap-6 mb-8">
          {/* Time Range */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Time Range</label>
            <div className="flex flex-wrap gap-2">
              {timeRangeOptions.map((range) => (
                <button
                  key={range.value}
                  onClick={() => {
                    if (!range.disabled) {
                      setTimeRange(range.value);
                      setIsLive(range.value === 'live');
                    }
                  }}
                  disabled={range.disabled}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    timeRange === range.value
                      ? 'bg-blue-50 text-blue-600 border-2 border-blue-200'
                      : range.disabled
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-gray-100'
                  }`}
                >
                  {range.value === 'live' && (
                    <RefreshCcw className={`w-4 h-4 inline-block mr-1 ${isLive ? 'animate-spin' : ''}`} />
                  )}
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* Y-Axis Controls */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Y-Axis Scale</label>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={yAxisInterval}
                  onChange={(e) => setYAxisInterval(Number(e.target.value))}
                  className="w-20 px-2 py-1 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0.1"
                  step="0.1"
                />
                <span className="text-sm text-gray-600">₹ interval</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  onChange={(e) => setYAxisMin(e.target.value ? Number(e.target.value) : 'auto')}
                  className="w-20 px-2 py-1 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <span className="text-sm text-gray-600">to</span>
                <input
                  type="number"
                  placeholder="Max"
                  onChange={(e) => setYAxisMax(e.target.value ? Number(e.target.value) : 'auto')}
                  className="w-20 px-2 py-1 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Price Range</label>
            <div className="flex gap-2">
              {priceRangeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setPriceRange(option.value as PriceRange)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    priceRange === option.value
                      ? 'bg-blue-50 text-blue-600 border-2 border-blue-200'
                      : 'bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-gray-100'
                  }`}
                >
                  {option.value === 'all' ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                yAxisId="price"
                domain={[yAxisMin, yAxisMax]}
                tick={{ fontSize: 12 }}
                label={{ value: priceRange === 'lme-cash' ? 'Price (USD/MT)' : 'Price (₹/kg)', angle: -90, position: 'insideLeft' }}
                interval={0}
                ticks={
                  yAxisMin !== 'auto' && yAxisMax !== 'auto'
                    ? Array.from(
                        { length: Math.ceil((Number(yAxisMax) - Number(yAxisMin)) / yAxisInterval) + 1 },
                        (_, i) => Number(yAxisMin) + i * yAxisInterval
                      )
                    : undefined
                }
              />
              <Tooltip
                contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
              />
              <Legend />
              {(priceRange === 'all' || priceRange === 'mcx') && (
                <Line
                  yAxisId="price"
                  type="monotone"
                  dataKey="mcx"
                  name="MCX Price"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              )}
              {(priceRange === 'all' || priceRange === 'lme') && (
                <Line
                  yAxisId="price"
                  type="monotone"
                  dataKey="lme"
                  name="LME Price (INR)"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              )}
              {priceRange === 'lme-cash' && (
                <Line
                  yAxisId="price"
                  type="monotone"
                  dataKey="lme-cash"
                  name="LME Cash Settlement"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  dot={true}
                  activeDot={{ r: 6 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}