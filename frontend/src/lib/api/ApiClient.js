import axios from "axios";
import { useActionState } from "react";
import useAuthStore from "../store/AuthStorage";

const API_URL = 'http://localhost:3000/api'

const Api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

// adding interptors axios 

Api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
})

export default Api