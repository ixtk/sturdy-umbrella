import axios from "axios"
import toast from "react-hot-toast"
import { getAuth } from "firebase/auth"

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

// List of endpoints that should not trigger toast on 401
const authEndpoints = ["/user/login", "/user/register", "/user/status"]

axiosInstance.interceptors.request.use(
  async config => {
    const auth = getAuth()
    const user = auth.currentUser

    if (user) {
      const token = await user.getIdToken()
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const isAuthEndpoint = authEndpoints.some(endpoint =>
      error.config.url.includes(endpoint)
    )

    // don't show error for auth endpoints
    if (!isAuthEndpoint) {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again."
      toast.error(errorMessage)
    }

    return Promise.reject(error)
  }
)
