import axios from 'axios';

const AUTH_URL = `${process.env.REACT_APP_API_URL}/auth`;

export const login = async (username: string, password: string) => {
  const response = await axios.post(`${AUTH_URL}/login`, { username, password });
  return response.data;
};

export const register = async (username: string, password: string) => {
  console.log('AUTH_URL', AUTH_URL);
  const response = await axios.post(`${AUTH_URL}/register`, { username, password });
  return response.data;
};

export const logout = async () => {
  await axios.post(`${AUTH_URL}/logout`);
};
