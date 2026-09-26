import { jwtDecode } from 'jwt-decode';

export const getAccessToken = () => localStorage.getItem('access_token');
export const getRefreshToken = () => localStorage.getItem('refresh_token');

export const setTokens = (access, refresh) => {
  localStorage.setItem('access_token', access);
  if (refresh) {
    localStorage.setItem('refresh_token', refresh);
  }
};

export const removeTokens = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

export const getUserContext = () => {
  const token = getAccessToken();
  if (!token) return null;
  
  try {
    const decoded = jwtDecode(token);
    return decoded; // Assuming token contains user info and role e.g., { user_id: 1, role: 'admin' }
  } catch (error) {
    removeTokens();
    return null;
  }
};

export const isAuthenticated = () => {
  const token = getAccessToken();
  if (!token) return false;
  
  try {
    const decoded = jwtDecode(token);
    // basic check for expiry
    if (decoded.exp * 1000 < Date.now()) {
      return false; // Though api.js intercepts and retries, we might want this check initially
    }
    return true;
  } catch (error) {
    return false;
  }
};
