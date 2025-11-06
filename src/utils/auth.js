// Authentication utilities
export const getAuthToken = () => {
  return localStorage.getItem('snappfood_token');
};

export const setAuthToken = (token) => {
  localStorage.setItem('snappfood_token', token);
};

export const removeAuthToken = () => {
  localStorage.removeItem('snappfood_token');
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

