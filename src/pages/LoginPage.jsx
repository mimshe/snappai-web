import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OtpForm from '../components/OtpForm';
import { sendOtp } from '../api/otp';
import LoadingSpinner from '../components/LoadingSpinner';

const LoginPage = () => {
  const [step, setStep] = useState(1); // 1: mobile, 2: OTP
  const [mobileNumber, setMobileNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleMobileSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate mobile number
    if (mobileNumber.length !== 11 || !mobileNumber.startsWith('09')) {
      setError('لطفا شماره موبایل معتبر وارد کنید (مثال: 09123456789)');
      return;
    }

    setIsLoading(true);

    try {
      const result = await sendOtp(mobileNumber);

      if (result.success) {
        // OTP sent successfully, move to step 2
        setStep(2);
      } else {
        // Show error message
        setError(result.message || 'خطا در ارسال کد تایید');
      }
    } catch (error) {
      setError('خطای غیرمنتظره رخ داد. لطفا دوباره تلاش کنید.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setStep(1);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">SnappFood AI</h1>
          <p className="text-gray-600">دستیار خرید اسنپ فود با هوش مصنوعی</p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleMobileSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                شماره موبایل اسنپ خود را وارد کنید
              </label>
              <input
                type="tel"
                id="mobile"
                value={mobileNumber}
                onChange={(e) => {
                  setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 11));
                  setError(''); // Clear error when user types
                }}
                placeholder="09123456789"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-center text-lg ${
                  error ? 'border-red-500' : 'border-gray-300'
                }`}
                dir="ltr"
                required
                disabled={isLoading}
              />
              {error && (
                <p className="mt-2 text-sm text-red-600 text-center">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity font-medium disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[48px]"
            >
              {isLoading && <LoadingSpinner size="sm" color="white" />}
              <span>{isLoading ? 'در حال ارسال...' : 'ارسال کد'}</span>
            </button>
          </form>
        ) : (
          <OtpForm
            mobileNumber={mobileNumber}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
};

export default LoginPage;

