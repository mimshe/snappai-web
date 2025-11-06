// OTP API endpoints
import apiClient from './client';

/**
 * Send OTP code to user's cellphone
 * @param {string} cellphone - User's cellphone number (e.g., "09120053069")
 * @returns {Promise<{success: boolean, message: string, error?: string}>}
 */
export const sendOtp = async (cellphone) => {
  try {
    const response = await apiClient.post('/otp/send', {
      cellphone: cellphone,
    });

    const data = response.data;

    // Handle API response
    if (data.success) {
      return {
        success: true,
        message: data.message || 'کد تایید با موفقیت ارسال شد',
      };
    } else {
      return {
        success: false,
        message: data.message || 'خطا در ارسال کد تایید',
        error: data.error || 'خطای نامشخص',
      };
    }
  } catch (error) {
    // Handle axios errors
    if (error.response) {
      // Server responded with error status (4xx, 5xx)
      const data = error.response.data || {};
      return {
        success: false,
        message: data.message || 'خطا در ارسال کد تایید',
        error: data.error || `خطای ${error.response.status}`,
      };
    } else if (error.request) {
      // Request was made but no response received
      return {
        success: false,
        message: 'خطا در اتصال به سرور',
        error: 'سرور پاسخ نمی‌دهد',
      };
    } else {
      // Something else happened
      return {
        success: false,
        message: 'خطای غیرمنتظره رخ داد',
        error: error.message || 'خطای نامشخص',
      };
    }
  }
};

/**
 * Verify OTP code
 * @param {string} cellphone - User's cellphone number (e.g., "09120053069")
 * @param {string} code - OTP code (5 digits)
 * @returns {Promise<{success: boolean, message: string, data?: {token: string, user: object}, error?: string}>}
 */
export const verifyOtp = async (cellphone, code) => {
  try {
    const response = await apiClient.post('/otp/verify', {
      cellphone: cellphone,
      code: code,
    });

    const data = response.data;

    // Handle API response
    if (data.success) {
      return {
        success: true,
        message: data.message || 'کد تایید با موفقیت تایید شد',
        data: data.data || {},
      };
    } else {
      return {
        success: false,
        message: data.message || 'خطا در تایید کد',
        error: data.error || 'خطای نامشخص',
      };
    }
  } catch (error) {
    // Handle axios errors
    if (error.response) {
      // Server responded with error status (4xx, 5xx)
      const data = error.response.data || {};
      return {
        success: false,
        message: data.message || 'خطا در تایید کد',
        error: data.error || `خطای ${error.response.status}`,
      };
    } else if (error.request) {
      // Request was made but no response received
      return {
        success: false,
        message: 'خطا در اتصال به سرور',
        error: 'سرور پاسخ نمی‌دهد',
      };
    } else {
      // Something else happened
      return {
        success: false,
        message: 'خطای غیرمنتظره رخ داد',
        error: error.message || 'خطای نامشخص',
      };
    }
  }
};

