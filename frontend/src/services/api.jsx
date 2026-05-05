import axios from "axios";

const API = axios.create({
 baseURL: "https://saas-app-backend.onrender.com/api" 
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = token; // backend expects this
  }
  return req;
});

export default API;