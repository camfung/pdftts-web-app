
import axios from 'axios';

// Create an instance of axios and set the default configurations
const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true  // This will include credentials (like cookies) in all requests
});

export default instance;
