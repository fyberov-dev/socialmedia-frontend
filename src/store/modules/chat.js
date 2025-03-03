import { defineStore } from "pinia";
import ChatApi from "@/api/chat.js";

export const useChatStore = defineStore("chat", {
    state: () => ({
        chats: [],
    }),

    actions: {
        /**
         * Fetch all chats.
         */
        async getChats() {
            try {
                const {data} = await ChatApi.getChats();
                this.chats = data;
                return data;
            } catch (error) {
                console.error("Error fetching chats:", error);
                throw error;
            }
        },

        /**
         * Create a new chat.
         * @param {Object} chat - Chat object containing `name`.
         */
        async createChat(chat) {
            try {
                const {data} = await ChatApi.createChat(chat);
                this.chats.push(data);
                return data;
            } catch (error) {
                console.error("Error creating chat:", error);
                throw error;
            }
        },

        /**
         * Add a member to a chat.
         * @param {number} chatId - ID of the chat.
         * @param {Object} member - Member object containing `username`.
         */
        async addMember(chatId, member) {
            try {
                const {data} = await ChatApi.addMember(chatId, member);
                const chatIndex = this.chats.findIndex(chat => chat.id === chatId);
                if (chatIndex !== -1) {
                    this.chats[chatIndex].members.push(member);
                }
                return data;
            } catch (error) {
                console.error("Error adding member:", error);
                throw error;
            }
        },
    },
});
