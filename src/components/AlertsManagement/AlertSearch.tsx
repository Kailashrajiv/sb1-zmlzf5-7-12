import React from 'react';
import { Search } from 'lucide-react';

interface AlertSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function AlertSearch({ value, onChange }: AlertSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search alerts by message or price..."
        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
}