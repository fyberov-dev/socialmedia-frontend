import {defineStore} from "pinia";
import PostApi from "@/api/post.js";
import Post from "@/api/post.js";

export const usePostStore = defineStore('post', {
    state: () => ({
        data: [],
        comments: [],
    }),

    actions: {
        getPosts(pageNo, pageSize) {
            this.data = [];
            return new Promise((resolve, reject) => {
                PostApi
                    .get(pageNo, pageSize)
                    .then(({data}) => {
                        this.data = data;
                        resolve(data);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },

        getPostsByUser(username, pageNo, pageSize) {
            this.data = [];
            return new Promise((resolve, reject) => {
                PostApi
                    .getByUser(username, pageNo, pageSize)
                    .then(({data}) => {
                        this.data = data;
                        resolve(data);
                    })
                    .catch((error) => {
                        console.log(error);
                        reject(error);
                    })
            })
        },

        createPost(data) {
            return new Promise((resolve, reject) => {
                PostApi
                    .post(data)
                    .then(({data}) => {
                        this.data.posts.unshift(data);
                        resolve(data);
                    })
                    .catch((error) => {
                        reject(error);
                    })
            })
        },

        deletePost(id) {
            return new Promise((resolve,  reject) => {
                PostApi
                    .deletePost(id)
                    .then(() => {
                        this.data.posts = this.data.posts.filter((a) => a.id !== id);
                        resolve();
                    })
                    .catch((error) => {
                        reject(error);
                    })
            })
        },

        checkOwnership(id) {
            return new Promise((resolve, reject) => {
                PostApi
                    .checkOwnership(id)
                    .then(({data}) => {
                        resolve(data);
                    })
                    .catch(() => {
                        reject();
                    })
            })
        },

        updatePost(id, payload) {
            return new Promise((resolve, reject) => {
                PostApi
                    .updatePost(id, payload)
                    .then(({data}) => {
                        resolve(data);
                    })
                    .catch((error) => {
                        reject(error);
                    })
            })
        },

        getPostById(id) {
            this.data = [];
            return new Promise((resolve, reject) => {
                PostApi
                    .getById(id)
                    .then(({data}) => {
                        this.data = [data];
                        resolve(data);
                    })
                    .catch((error) => {
                        reject(error);
                    })
            })
        },

        getCommentsByPostId(id) {
            this.comments = [];
            return new Promise((resolve, reject) => {
                PostApi
                    .getComments(id)
                    .then(({data}) => {
                        this.comments = data;
                        resolve(data)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },

        postComment(id, comment) {
            return new Promise((resolve, reject) => {
                PostApi
                    .postComment(id, comment)
                    .then(({data}) => {
                        this.comments.push(data);
                        resolve(data);
                    })
                    .catch((error) => {
                        reject(error);
                        console.log(error);
                    })
            })
        }
    }
})