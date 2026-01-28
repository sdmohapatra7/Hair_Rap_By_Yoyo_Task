import axios from 'axios';
// import './mockData'; 

const api = axios.create({
    baseURL: 'http://10.13.237.130:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
