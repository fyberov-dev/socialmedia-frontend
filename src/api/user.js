import axios from "@/api";
import Cookies from "js-cookie";

const get = (userId) => {
    return axios.get(`/user/${userId}/profile`, {
        headers: {
            Authorization: `Bearer ${Cookies.get("jwt")}`,
        },
    })
}

export default {
    get
}