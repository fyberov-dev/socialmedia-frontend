import axios from 'axios';
import router from "@/router";
import Cookies from "js-cookie";

axios.defaults.baseURL = "/api"

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            Cookies.remove("jwt");
            router.push("/auth/register");
        }
        return Promise.reject(error);
    }
)

export default axios;