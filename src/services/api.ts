import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Reemplaza con la URL de tu backend
});

export default api;
