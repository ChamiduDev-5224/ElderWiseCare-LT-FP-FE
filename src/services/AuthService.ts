import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_BASE_URL;

export const login = async (data:any) => {
  const response = await axios.post(`${API_URL}/auth/login`, data);
  return response.data;
};

export const refreshToken = async (refreshToken:string) => {
  
  const response = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
  
  return response.data;
};

export const setTokens = (accessToken:string, refreshToken:string) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

export const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};