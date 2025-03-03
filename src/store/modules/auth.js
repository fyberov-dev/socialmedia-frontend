import {defineStore} from "pinia";
import AuthApi from "@/api/auth";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";


export const useAuthStore = defineStore('auth', {
    state: () => ({
        username: null,
    }),
    actions: {
        register(credentials) {
            return new Promise((resolve, reject) => {
                AuthApi
                    .register(credentials)
                    .then(({ data }) => {
                        resolve(data);
                    })
                    .catch(({ response }) => {
                        reject(response.data);
                    });
            });
        },

        login(credentials) {
            return new Promise((resolve, reject) => {
                AuthApi
                    .login(credentials)
                    .then(({ data }) => {
                        const token = data.accessToken;
                        Cookies.set("jwt", token, { expires: 7, path: "/" });
                        AuthApi.getUserProfile(token)
                            .then(({ data }) => {
                                this.username = data.username;
                                resolve();
                            })
                            .catch((error) => {
                                console.error("Failed to fetch user profile:", error);
                                reject(error);
                            });
                    })
                    .catch((error) => {
                        console.error("Login failed:", error);
                        reject(error);
                    });
            });
        },

        exit() {
            return new Promise((resolve) => {
                Cookies.remove("jwt");
                this.username = null;
                resolve();
            });
        },

        isAuthenticated() {
            return !!Cookies.get("jwt")
        },

        getSub(name) {
            return jwtDecode(Cookies.get("jwt")).sub;
        },
    },
});