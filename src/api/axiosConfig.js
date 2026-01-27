import axios from 'axios';
import './mockData'; // Import mock setup to activate it

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
