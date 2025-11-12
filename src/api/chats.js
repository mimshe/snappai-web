// Chats API endpoints
import apiClient from './client';

/**
 * Get list of chats with pagination
 * @param {number} page - Page number (default: 1)
 * @param {number} perPage - Items per page (default: 15)
 * @returns {Promise<{success: boolean, data?: Array, pagination?: object, error?: string}>}
 */
export const getChats = async (page = 1, perPage = 15) => {
  try {
    const response = await apiClient.get('/chats', {
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
        message: data.message || 'خطا در دریافت لیست چت‌ها',
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
 * Create a new chat (start new order)
 * @param {string} message - Initial message for the new chat
 * @returns {Promise<{success: boolean, message?: string, action?: string, errors?: object, error?: string}>}
 */
export const createChat = async (message) => {
  try {
    const response = await apiClient.post('/chats', {
      message,
    });

    const data = response.data || {};

    return {
      success: true,
      message: data.message || '',
      action: data.action || '',
      payload: data.payload || null,
      chatId: data.chat_id || data.id || (data.chat ? data.chat.id : null) || null,
      chatTitle: data.chat_title || (data.chat ? data.chat.title : '') || '',
      chat: data.chat || null,
    };
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data || {};

      if (status === 401) {
        return {
          success: false,
          error: 'unauthorized',
          message: 'دسترسی غیرمجاز',
        };
      }

      let validationMessage = data.message || 'خطا در ایجاد سفارش';
      const validationErrors = data.error;
      if (validationErrors?.message && Array.isArray(validationErrors.message)) {
        validationMessage = validationErrors.message.join('، ');
      }

      return {
        success: false,
        message: validationMessage,
        errors: validationErrors,
      };
    } else if (error.request) {
      return {
        success: false,
        message: 'خطا در اتصال به سرور',
        error: 'سرور پاسخ نمی‌دهد',
      };
    }

    return {
      success: false,
      message: 'خطای غیرمنتظره رخ داد',
      error: error.message || 'خطای نامشخص',
    };
  }
};


