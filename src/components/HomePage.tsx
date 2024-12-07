import React, { useState } from 'react';
import { ArrowRight, Bell, TrendingUp, Target, FileText } from 'lucide-react';
import SparkBackground from './SparkBackground';
import GradientWave from './GradientWave';
import StockGraph from './StockGraph';
import AuthForm from './AuthForm';

export default function HomePage() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <SparkBackground />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-6 animate-fade-in">
            <div className="relative mb-4">
              <h1 
                className="text-7xl md:text-8xl lg:text-9xl font-bold"
                style={{
                  background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 40px rgba(255, 107, 107, 0.3)',
                  fontFamily: "'Poppins', sans-serif",
                  letterSpacing: '-2px',
                  filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2))',
                  transform: 'translateZ(0)',
                }}
              >
                NOVEX PRO
              </h1>
            </div>

            <StockGraph />
            
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold max-w-4xl mx-auto leading-tight text-gray-200 -mt-12 mb-6"
              style={{
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
              }}
            >
              Empowering Metal Buyers with Real-Time Insights
            </h2>

            <div className="flex flex-col items-center space-y-3 text-xl text-gray-300 mb-8">
              <p className="flex items-center gap-2">
                <Bell className="w-6 h-6 text-blue-400" />
                Set custom alerts
              </p>
              <p className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-green-400" />
                Analyze global trends
              </p>
              <p className="flex items-center gap-2">
                <Target className="w-6 h-6 text-purple-400" />
                Optimize your metal procurement strategies
              </p>
              <p className="flex items-center gap-2">
                <FileText className="w-6 h-6 text-orange-400" />
                Get quotes and manage hedge positions
              </p>
            </div>

            <button
              onClick={() => setShowAuthModal(true)}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get Started
              <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {showAuthModal && (
        <AuthForm onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  );
}