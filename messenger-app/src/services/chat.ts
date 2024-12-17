import axios from 'axios';

const chatService = axios.create({
  baseURL: 'http://localhost:5002',
});

chatService.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default chatService;