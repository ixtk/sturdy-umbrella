import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true
})

// export const axiosInterceptorsInstance = axios.create({
//   baseURL: "http://localhost:3000/sessions",
//   withCredentials: true
// })
