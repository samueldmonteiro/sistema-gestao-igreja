import axios from 'axios';
import { getAdminToken } from '../services/admin';

console.log(import.meta.env.VITE_API_URL)
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
    
    const token = getAdminToken();

    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;

}, (error) => {
    return Promise.reject(error);
});

export default api;