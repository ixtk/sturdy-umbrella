import axios from "axios"
import toast from "react-hot-toast"
import { getAuth } from "firebase/auth"

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000"
})

// List of endpoints that should not trigger toast on 401
const authEndpoints = ["/user/login", "/user/register", "/user/status"]

axiosInstance.interceptors.request.use(async (config) => {
  const auth = getAuth();
  const user = auth.currentUser;

  console.log("user", user);
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});


axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const isAuthEndpoint = authEndpoints.some(endpoint =>
      error.config.url.includes(endpoint)
    )

    if (error.response?.status === 401 && !isAuthEndpoint) {
      toast.error("Session expired. Please refresh the page")
    }
    return Promise.reject(error)
  }
)
