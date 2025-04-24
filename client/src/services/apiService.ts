import axios from 'axios';

const api = axios.create({
  baseURL: 'https://staging.duxsoftware.com.ar/api/',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
