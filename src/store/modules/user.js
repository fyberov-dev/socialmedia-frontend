import {defineStore} from "pinia";
import UserApi from "@/api/user.js";


export const useUserStore = defineStore('user', {
    state: () => ({
       user: null,
    }),

    actions: {
        getProfile(userId) {
            return new Promise((resolve, reject) => {
                UserApi.get(userId)
                    .then(({data}) => {
                        this.user = data;
                        resolve(data)
                    })
                    .catch((error) => {
                        console.log(error);
                        reject(error)
                    })
            })
        }
    }
})