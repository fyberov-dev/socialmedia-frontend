import axios from "@/api";
import Cookies from "js-cookie";

const get = (pageNo, pageSize) => {
    return axios.get(`/posts?pageNo=${pageNo}&pageSize=${pageSize}`);
}

const post = (data) => {
    return axios.post("/posts", data, {
        headers: {
            Authorization: `Bearer ${Cookies.get("jwt")}`
        }
    });
}

const getByUser = (username, pageNo, pageSize) => {
    return axios.get(`/users/${username}?pageNo=${pageNo}&pageSize=${pageSize}`, {
        headers: {
            Authorization: `Bearer ${Cookies.get("jwt")}`
        }
    });
}

const getById = (id) => {
    return axios.get(`/posts/${id}`, {
        headers: {
            Authorization: `Bearer ${Cookies.get("jwt")}`
        }
    });
}

const deletePost = (id) => {
    return axios.delete(`/posts/${id}`, {
        headers: {
            Authorization: `Bearer ${Cookies.get("jwt")}`
        }
    });
}

const checkOwnership = (id) => {
    return axios.get(`/posts/${id}/edit`, {
        headers: {
            Authorization: `Bearer ${Cookies.get("jwt")}`
        }
    });
}

const updatePost = (id, payload) => {
    return axios.put(`/posts/${id}/edit`, payload, {
        headers: {
            Authorization: `Bearer ${Cookies.get("jwt")}`
        }
    });
}

const getComments = (id) => {
    return axios.get(`/comment/${id}`, {
        headers: {
            Authorization: `Bearer ${Cookies.get("jwt")}`
        }
    })
}

const postComment = (id, comment) => {
    return axios.post(`comment/${id}`, comment, {
        headers: {
            Authorization: `Bearer ${Cookies.get("jwt")}`
        }
    })
}

export default {
    get,
    post,
    getByUser,
    deletePost,
    checkOwnership,
    updatePost,
    getById,
    getComments,
    postComment
}
