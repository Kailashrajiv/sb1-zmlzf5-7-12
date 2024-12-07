import React from 'react';
import { Mail, RefreshCw } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function EmailVerification() {
  const { user, sendVerificationEmail } = useAuth();

  if (!user || user.emailVerified) return null;

  return (
    <div className="fixed top-4 right-4 max-w-md bg-yellow-50 p-4 rounded-lg shadow-lg border border-yellow-200 z-50">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-yellow-100 rounded-full">
          <Mail className="w-5 h-5 text-yellow-600" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-yellow-800">
            Verify your email
          </h3>
          <p className="mt-1 text-sm text-yellow-700">
            Please check your inbox and verify your email address to access all features.
          </p>
          <button
            onClick={sendVerificationEmail}
            className="mt-3 flex items-center gap-2 text-sm font-medium text-yellow-800 hover:text-yellow-900"
          >
            <RefreshCw className="w-4 h-4" />
            Resend verification email
          </button>
        </div>
      </div>
    </div>
  );
}