import React, { useState } from 'react';
import { Bell, MessageCircle, Mail, Sparkles } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

type Supplier = 'NALCO' | 'HINDALCO' | 'Vedanta';

export default function PriceAlert() {
  const { user } = useAuth();
  const [category, setCategory] = useState<'MCX' | 'LME' | 'Suppliers'>('MCX');
  const [selectedSuppliers, setSelectedSuppliers] = useState<Supplier[]>([]);
  const [alertType, setAlertType] = useState<'Price' | 'Percentage'>('Price');
  const [percentageType, setPercentageType] = useState<'gain' | 'loss' | 'gainloss'>('gain');
  const [alertFrequency, setAlertFrequency] = useState<'one-time' | 'recurring'>('one-time');
  const [notificationMethods, setNotificationMethods] = useState({
    webApp: false,
    whatsApp: false,
    email: false
  });
  const [isSmartAlertEnabled, setIsSmartAlertEnabled] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [targetPercentage, setTargetPercentage] = useState('');

  const suppliers: Supplier[] = ['NALCO', 'HINDALCO', 'Vedanta'];

  const handleSupplierToggle = (supplier: Supplier) => {
    setSelectedSuppliers(prev => 
      prev.includes(supplier)
        ? prev.filter(s => s !== supplier)
        : [...prev, supplier]
    );
  };

  const handleCreateAlert = async () => {
    if (!user) {
      toast.error('Please sign in to create alerts');
      return;
    }

    try {
      const alertData = {
        userId: user.id,
        category,
        suppliers: category === 'Suppliers' ? selectedSuppliers : [],
        type: alertType,
        targetPrice: alertType === 'Price' ? parseFloat(targetPrice) : null,
        targetPercentage: alertType === 'Percentage' ? parseFloat(targetPercentage) : null,
        percentageType: alertType === 'Percentage' ? percentageType : null,
        frequency: alertFrequency,
        notificationChannels: Object.entries(notificationMethods)
          .filter(([_, enabled]) => enabled)
          .map(([channel]) => channel),
        customMessage,
        isActive: true,
        createdAt: new Date().toISOString()
      };

      await addDoc(collection(db, 'alerts'), alertData);
      toast.success('Alert created successfully!');

      // Reset form
      setTargetPrice('');
      setTargetPercentage('');
      setCustomMessage('');
      setNotificationMethods({
        webApp: false,
        whatsApp: false,
        email: false
      });
      setSelectedSuppliers([]);
    } catch (error) {
      console.error('Error creating alert:', error);
      toast.error('Failed to create alert. Please try again.');
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50/90 via-purple-50/90 to-pink-50/90 backdrop-blur-sm rounded-xl p-6 
      border border-white/50 shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.1)] 
      transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Bell className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Price Alert
          </h2>
        </div>
        <button
          onClick={() => setIsSmartAlertEnabled(!isSmartAlertEnabled)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 
            text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 
            shadow-md hover:shadow-lg"
        >
          <Sparkles className="w-4 h-4" />
          AluminumGenie
        </button>
      </div>

      {isSmartAlertEnabled && (
        <div className="mb-6">
          <textarea
            placeholder="Ask me to create personalized alerts based on any market conditions..."
            className="w-full p-3 border border-gray-200 rounded-lg h-24 resize-none focus:ring-2 
              focus:ring-blue-500 focus:border-transparent bg-white/50"
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
          />
        </div>
      )}

      <div className="space-y-6">
        {/* Category Selection */}
        <div>
          <label className="block text-gray-700 text-lg mb-2">Category</label>
          <div className="flex rounded-lg overflow-hidden border border-gray-200">
            {['MCX', 'LME', 'Suppliers'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat as 'MCX' | 'LME' | 'Suppliers')}
                className={`flex-1 py-2 px-4 text-center transition-all duration-300 ${
                  category === cat
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-white/50 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Alert Type */}
        {category !== 'Suppliers' && (
          <div>
            <label className="block text-gray-700 text-lg mb-2">Alert Type</label>
            <div className="grid grid-cols-2 gap-2">
              {['Price', 'Percentage'].map((type) => (
                <button
                  key={type}
                  onClick={() => setAlertType(type as 'Price' | 'Percentage')}
                  className={`py-2 px-4 rounded-lg text-center transition-colors ${
                    alertType === type
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-white/50 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Target Price/Percentage Input */}
        {alertType === 'Price' ? (
          <div>
            <label className="block text-gray-700 text-lg mb-2">
              Target Price ({category === 'LME' ? 'USD' : '₹'})
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                {category === 'LME' ? '$' : '₹'}
              </span>
              <input
                type="number"
                step="0.01"
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value)}
                className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 
                  focus:ring-blue-500 focus:border-transparent bg-white/50"
                placeholder="Enter target price"
              />
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-gray-700 text-lg mb-2">
              Percentage Change
            </label>
            <div className="flex gap-2">
              <select
                value={percentageType}
                onChange={(e) => setPercentageType(e.target.value as 'gain' | 'loss' | 'gainloss')}
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 
                  focus:ring-blue-500 focus:border-transparent bg-white/50"
              >
                <option value="gain">Gain</option>
                <option value="loss">Loss</option>
                <option value="gainloss">Gain/Loss</option>
              </select>
              <input
                type="number"
                step="0.01"
                value={targetPercentage}
                onChange={(e) => setTargetPercentage(e.target.value)}
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 
                  focus:ring-blue-500 focus:border-transparent bg-white/50"
                placeholder="Enter percentage"
              />
            </div>
          </div>
        )}

        {/* Notification Methods */}
        <div>
          <label className="block text-gray-700 text-lg mb-2">
            Notification Method
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setNotificationMethods(prev => ({ ...prev, webApp: !prev.webApp }))}
              className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors ${
                notificationMethods.webApp
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-white/50 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>Web App</span>
            </button>
            <button
              onClick={() => setNotificationMethods(prev => ({ ...prev, whatsApp: !prev.whatsApp }))}
              className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors ${
                notificationMethods.whatsApp
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-white/50 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </button>
            <button
              onClick={() => setNotificationMethods(prev => ({ ...prev, email: !prev.email }))}
              className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors ${
                notificationMethods.email
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-white/50 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </button>
          </div>
        </div>

        {/* Custom Message */}
        <div>
          <label className="block text-gray-700 text-lg mb-2">
            Custom Message (Optional)
          </label>
          <textarea
            placeholder="Add a custom message for your alert"
            className="w-full p-3 border border-gray-200 rounded-lg h-24 resize-none focus:ring-2 
              focus:ring-blue-500 focus:border-transparent bg-white/50"
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
          />
          <p className="mt-2 text-sm text-gray-500">
            Available variables: {'{price}'}, {'{change}'}, {'{percentage}'}
          </p>
        </div>

        {/* Create Alert Button */}
        <button
          onClick={handleCreateAlert}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg 
            hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center 
            justify-center gap-2 shadow-md hover:shadow-lg"
        >
          <Bell className="w-5 h-5" />
          Create Alert
        </button>
      </div>
    </div>
  );
}