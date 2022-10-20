import axios from "axios";
// import { getEnvVariables } from "../helpers/getEnvVariables";

// const { VITE_API_URL } = getEnvVariables();

const blogApi = axios.create({
    baseURL: 'http://localhost:8080/api'
});

blogApi.interceptors.request.use( config => {
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('x-token')
    }

    return config;
})

export default blogApi;