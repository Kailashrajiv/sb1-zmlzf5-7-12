import React, { useState } from 'react';
import { Calculator, Send, X, Plus } from 'lucide-react';
import PriceCalculator from './PriceCalculator';
import { useLMEHistory } from '../hooks/useLMEHistory';
import LMEHistoryBlock from './MarketDashboard/LMEHistoryBlock';

interface Supplier {
  id: string;
  name: string;
  phone: string;
  email: string;
}

interface Product {
  id: string;
  name: string;
}

export default function GetQuotePage() {
  const [showAddSupplier, setShowAddSupplier] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const { data, loading, error } = useLMEHistory();

  const [suppliers] = useState<Supplier[]>([
    { id: '1', name: 'Supplier A', phone: '+91 9876543210', email: 'suppliera@example.com' },
    { id: '2', name: 'Supplier B', phone: '+91 9876543211', email: 'supplierb@example.com' },
  ]);

  const products: Product[] = [
    { id: '1', name: 'Aluminium Ingots' },
    { id: '2', name: 'Aluminium Wire Rods' },
    { id: '3', name: 'Aluminium Billets' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      supplier: selectedSupplier,
      product: selectedProduct,
      quantity,
      deliveryLocation
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* LME Cash Settlement Section */}
      <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 
        shadow-[0_4px_12px_rgba(0,0,0,0.05)] p-6 mb-8">
        <div className="flex justify-between items-baseline mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            LME Cash Settlement
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Source: Westmetals</p>
        </div>
        
        <LMEHistoryBlock
          data={data}
          loading={loading}
          error={error}
        />
      </section>

      <div className="grid grid-cols-12 gap-8">
        {/* Price Calculators */}
        <div className="col-span-12 lg:col-span-8">
          <PriceCalculator />
        </div>

        {/* Request Quote Form */}
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 
            shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.1)] 
            transition-all duration-300 p-6 pb-8">
            <div className="flex items-center gap-2 mb-8">
              <div className="p-2 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                <Send className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Request Quote
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Supplier Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Supplier
                </label>
                <div className="flex gap-2">
                  <select
                    value={selectedSupplier}
                    onChange={(e) => setSelectedSupplier(e.target.value)}
                    className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Choose a supplier</option>
                    {suppliers.map((supplier) => (
                      <option key={supplier.id} value={supplier.id}>
                        {supplier.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => setShowAddSupplier(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    Add
                  </button>
                </div>
              </div>

              {/* Product Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Product
                </label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Choose a product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity and Delivery Location side by side */}
              <div className="grid grid-cols-2 gap-4">
                {/* Quantity Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity (MT)
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="Enter quantity"
                    required
                  />
                </div>

                {/* Delivery Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Location
                  </label>
                  <input
                    type="text"
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter location"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                >
                  <Send className="w-5 h-5" />
                  Send RFQ
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}