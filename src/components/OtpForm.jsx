import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import { verifyOtp, sendOtp } from '../api/otp';
import { setCredentials } from '../store/slices/authSlice';

const OtpForm = ({ mobileNumber, onBack, onOtpSent }) => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const intervalRef = useRef(null);

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setCanResend(true);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResend = async () => {
    if (!canResend || isResending) return;

    setIsResending(true);
    setError('');

    try {
      const result = await sendOtp(mobileNumber);
      if (result.success) {
        setTimeLeft(120); // Reset timer
        setCanResend(false);
        setOtp(''); // Clear OTP input
      } else {
        setError(result.message || 'خطا در ارسال مجدد کد');
      }
    } catch (error) {
      setError('خطای غیرمنتظره رخ داد. لطفا دوباره تلاش کنید.');
    } finally {
      setIsResending(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (otp.length !== 5) {
      setError('لطفا کد ۵ رقمی را وارد کنید');
      return;
    }

    setIsLoading(true);

    try {
      const result = await verifyOtp(mobileNumber, otp);

      if (result.success && result.data) {
        // Save token and user to Redux
        dispatch(
          setCredentials({
            token: result.data.token,
            user: result.data.user || {},
          })
        );
        // Navigate to chats
        navigate('/chats');
      } else {
        setError(result.message || 'کد تایید نامعتبر است');
      }
    } catch (error) {
      setError('خطای غیرمنتظره رخ داد. لطفا دوباره تلاش کنید.');
    } finally {
      setIsLoading(false);
    }
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
          onChange={(e) => {
            setOtp(e.target.value.replace(/\D/g, '').slice(0, 5));
            setError(''); // Clear error when user types
          }}
          placeholder="کد ۵ رقمی"
          maxLength={5}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-center text-lg tracking-widest ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          dir="ltr"
          required
          disabled={isLoading}
        />
        <p className="mt-2 text-sm text-gray-500 text-center">
          کد به شماره {mobileNumber} ارسال شد
        </p>
        {error && (
          <p className="mt-2 text-sm text-red-600 text-center">{error}</p>
        )}
      </div>

      {/* Resend OTP section */}
      <div className="text-center">
        {!canResend ? (
          <p className="text-sm text-gray-600">
            ارسال مجدد کد در{' '}
            <span className="font-semibold text-primary">{formatTime(timeLeft)}</span>
          </p>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            disabled={isResending}
            className="text-sm text-primary hover:underline font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto"
          >
            {isResending && <LoadingSpinner size="sm" color="primary" />}
            <span>ارسال مجدد کد</span>
          </button>
        )}
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
          disabled={isLoading || otp.length !== 5}
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
