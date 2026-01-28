import axios from 'axios';
import { setupMocks } from './mockData';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Activate the mock setup for this specific instance
setupMocks(api);

export default api;
