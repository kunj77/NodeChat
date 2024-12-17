import axios from 'axios';

const authService = axios.create({
  baseURL: 'http://localhost:5001',
});

export default authService;