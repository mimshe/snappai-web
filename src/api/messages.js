// Messages API endpoints
import apiClient from './client';

/**
 * Get messages for a specific chat with pagination
 * @param {number|string} chatId - Chat ID
 * @param {number} page - Page number (default: 1)
 * @param {number} perPage - Items per page (default: 15)
 * @returns {Promise<{success: boolean, data?: Array, pagination?: object, error?: string}>}
 */
export const getChatMessages = async (chatId, page = 1, perPage = 15) => {
  try {
    const response = await apiClient.get(`/chat/${chatId}/messages`, {
      params: {
        page,
        per_page: perPage,
      },
    });

    const data = response.data;

    return {
      success: true,
      data: data.data || [],
      pagination: {
        currentPage: data.current_page || 1,
        lastPage: data.last_page || 1,
        perPage: data.per_page || perPage,
        total: data.total || 0,
        hasMore: data.current_page < data.last_page,
      },
    };
  } catch (error) {
    // Handle axios errors
    if (error.response) {
      // Server responded with error status (4xx, 5xx)
      const status = error.response.status;
      const data = error.response.data || {};

      // Handle 401 Unauthorized
      if (status === 401) {
        return {
          success: false,
          error: 'unauthorized',
          message: 'دسترسی غیرمجاز',
        };
      }

      return {
        success: false,
        message: data.message || 'خطا در دریافت پیام‌ها',
        error: data.error || `خطای ${status}`,
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
 * Send a message to a chat
 * @param {number|string} chatId - Chat ID
 * @param {string} message - Message text
 * @returns {Promise<{success: boolean, data?: object, error?: string, message?: string}>}
 */
export const sendChatMessage = async (chatId, message) => {
  try {
    const response = await apiClient.post(`/chat/${chatId}/messages`, {
      message: message,
    });

    const data = response.data;

    return {
      success: true,
      data: data.data || {},
      message: data.message || 'پیام با موفقیت ارسال شد',
    };
  } catch (error) {
    // Handle axios errors
    if (error.response) {
      // Server responded with error status (4xx, 5xx)
      const status = error.response.status;
      const data = error.response.data || {};

      // Handle 401 Unauthorized
      if (status === 401) {
        return {
          success: false,
          error: 'unauthorized',
          message: 'دسترسی غیرمجاز',
        };
      }

      return {
        success: false,
        message: data.message || 'خطا در ارسال پیام',
        error: data.error || `خطای ${status}`,
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

