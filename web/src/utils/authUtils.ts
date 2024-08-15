
import cookie from 'js-cookie';
import { LoginResponse } from 'src/types/LoginResponse';
import { User } from 'src/types/User';

// Check if localStorage is available
const isLocalStorageAvailable = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

// Set in cookie
export const setCookie = (key: string, value: string) => {
    cookie.set(key, value, {                
        expires: 1,
        secure: true,
        sameSite: 'None',
    });
};

// Remove from cookie
export const removeCookie = (key: string) => {
    cookie.remove(key);
};

export const getCookie = (key: string) => {
    return cookie.get(key);
};

// Set in localStorage
export const setLocalStorage = (key: string, value: any) => {
    if (isLocalStorageAvailable()) {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export const getLocalStorage = (key: string) => {
    if (isLocalStorageAvailable()) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }
    return null;
};

// Remove from localStorage
export const removeLocalStorage = (key: string) => {
    if (isLocalStorageAvailable()) {
        localStorage.removeItem(key);
    }
};

// Get token from cookie
export const getToken = () => {
    return getCookie('access_token');
};

// Check if user is authenticated
export const isAuth = () => {
    const token = getCookie('access_token');
    if (token && isLocalStorageAvailable()) {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : false;
    }
    return false;
};

// Initialize login data
export const initLoginData = (data: LoginResponse) => {
    setCookie('access_token', data.accessToken);
    setLocalStorage('user', data.user);
};

// Clear login data
export const clearLoginData = () => {
    removeCookie('access_token');
    removeLocalStorage('user');
};

// Get user data from localStorage
export const getUserData = (): User | null => {
    if (isLocalStorageAvailable()) {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          return JSON.parse(userData) as User;
        } catch (error) {
          console.error('Error parsing user data from localStorage:', error);
          return null;
        }
      }
    }
    return null;
};
