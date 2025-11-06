import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

const OtpForm = ({ mobileNumber, onVerify, onBack }) => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      alert('لطفا کد ۶ رقمی را وارد کنید');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Mock verification - accept any 6 digit code
      onVerify('mock_token_' + Date.now());
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
          کد ارسال‌شده را وارد کنید
        </label>
        <input
          type="text"
          id="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
          placeholder="کد ۶ رقمی"
          maxLength={6}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-center text-lg tracking-widest"
          dir="ltr"
          required
          disabled={isLoading}
        />
        <p className="mt-2 text-sm text-gray-500 text-center">
          کد به شماره {mobileNumber} ارسال شد
        </p>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px]"
        >
          بازگشت
        </button>
        <button
          type="submit"
          disabled={isLoading || otp.length !== 6}
          className="flex-1 px-4 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity font-medium disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[48px]"
        >
          {isLoading && <LoadingSpinner size="sm" color="white" />}
          <span>{isLoading ? 'در حال تایید...' : 'تایید'}</span>
        </button>
      </div>
    </form>
  );
};

export default OtpForm;

