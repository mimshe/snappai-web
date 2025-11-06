// Axios client configuration
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRF-TOKEN': '',
  },
});

// Request interceptor (optional - for adding auth tokens, etc.)
apiClient.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
    // const token = getAuthToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (optional - for handling common errors)
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors here if needed
    return Promise.reject(error);
  }
);

export default apiClient;

