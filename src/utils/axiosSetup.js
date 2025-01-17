import axios from 'axios';

// Instance for your user API's
const userApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Instance for a Admin API's 
const adminApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export { userApi, adminApi };