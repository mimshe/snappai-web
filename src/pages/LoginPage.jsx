import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OtpForm from '../components/OtpForm';
import { setAuthToken } from '../utils/auth';

const LoginPage = () => {
  const [step, setStep] = useState(1); // 1: mobile, 2: OTP
  const [mobileNumber, setMobileNumber] = useState('');
  const navigate = useNavigate();

  const handleMobileSubmit = (e) => {
    e.preventDefault();
    if (mobileNumber.length === 11 && mobileNumber.startsWith('09')) {
      setStep(2);
    } else {
      alert('لطفا شماره موبایل معتبر وارد کنید (مثال: 09123456789)');
    }
  };

  const handleOtpVerify = (token) => {
    setAuthToken(token);
    navigate('/chats');
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">SnappFood AI</h1>
          <p className="text-gray-600">سفارش هوشمند غذا با هوش مصنوعی</p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleMobileSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                شماره موبایل خود را وارد کنید
              </label>
              <input
                type="tel"
                id="mobile"
                value={mobileNumber}
                onChange={(e) =>
                  setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 11))
                }
                placeholder="09123456789"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-center text-lg"
                dir="ltr"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              ارسال کد
            </button>
          </form>
        ) : (
          <OtpForm
            mobileNumber={mobileNumber}
            onVerify={handleOtpVerify}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
};

export default LoginPage;

