import axios from "@/api"
import Cookies from "js-cookie";

const register = (credentials) => {
    return axios.post("/auth/register", credentials);
}

const login = (credentials) => {
    return axios.post("/auth/login", credentials);
}

const getUserProfile = (token) => {
    return axios.get("/user/me/profile", {
        headers: {
            Authorization: `Bearer ${Cookies.get("jwt")}`,
        },
    });
};


export default {
    register,
    login,
    getUserProfile
}