import axios from "axios";

export const axiosConfig = axios.create({
    baseURL: "https://money-manager-api-8igv.onrender.com/api/v1",
    timeout: 30000, 
    headers: {
        "Content-Type" : "application/json",
        Accept: "application/json"
    }
})

const excludeEndpoints = ["/login", "/register", "/status", "/activate", "/health"]

// interceptor
axiosConfig.interceptors.request.use( (config) => {

    const shouldSkipToken = excludeEndpoints.some( endpoint => config.url?.includes(endpoint) )

    if(!shouldSkipToken){
        const token = localStorage.getItem("token")
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
    }
    return config;
    
}, (error) => {
    return Promise.reject(error)
})

