import fetchApi from "@/api"; // Your HTTP client wrapper, such as a `fetch` implementation
import Cookies from "js-cookie";

const authHeader = () => ({
    Authorization: `Bearer ${Cookies.get("jwt")}`,
});

/**
 * Get all chats with pagination.
 * @param {number} pageNo - Page number for pagination.
 * @param {number} pageSize - Number of items per page.
 * @returns {Promise}
 */
const getChats = (pageNo = 0, pageSize = 10) => {
    return fetchApi.get(`/chat?pageNo=${pageNo}&pageSize=${pageSize}`, {
        headers: authHeader(),
    });
};

/**
 * Get a specific chat by ID.
 * @param {number} chatId - Chat ID.
 * @returns {Promise}
 */
const getChatById = (chatId) => {
    return fetchApi.get(`/chats/${chatId}`, {
        headers: authHeader(),
    });
};

/**
 * Get chats created by a specific user with pagination.
 * @param {string} username - Username of the creator.
 * @param {number} pageNo - Page number for pagination.
 * @param {number} pageSize - Number of items per page.
 * @returns {Promise}
 */
const getChatsByUser = (username, pageNo = 0, pageSize = 10) => {
    return fetchApi.get(`/users/${username}/chats?pageNo=${pageNo}&pageSize=${pageSize}`, {
        headers: authHeader(),
    });
};

/**
 * Create a new chat.
 * @param {Object} chat - Chat data containing `name` and optional members.
 * @returns {Promise}
 */
const createChat = (chat) => {
    return fetchApi.post("/chat", chat, {
        headers: {
            ...authHeader(),
            "Content-Type": "application/json",
        },
    });
};

/**
 * Delete a chat by ID.
 * @param {number} chatId - Chat ID.
 * @returns {Promise}
 */
const deleteChat = (chatId) => {
    return fetchApi.delete(`/chat/${chatId}`, {
        headers: authHeader(),
    });
};

/**
 * Add a user to a chat.
 * @param {number} chatId - Chat ID.
 * @param {Object} userRequest - Object containing `userId` (ControlUserToChatRequest).
 * @returns {Promise}
 */
const addUserToChat = (chatId, userRequest) => {
    return fetchApi.post(`/chat/${chatId}/members`, userRequest, {
        headers: {
            ...authHeader(),
            "Content-Type": "application/json",
        },
    });
};

/**
 * Remove a user from a chat.
 * @param {number} chatId - Chat ID.
 * @param {Object} userRequest - Object containing `userId` (ControlUserToChatRequest).
 * @returns {Promise}
 */
const removeUserFromChat = (chatId, userRequest) => {
    return fetchApi.post(`/chat/${chatId}/members/kick`, userRequest, {
        headers: {
            ...authHeader(),
            "Content-Type": "application/json",
        },
    });
};

/**
 * Update the name of a chat.
 * @param {number} chatId - Chat ID.
 * @param {Object} nameRequest - Object containing `name` (UpdateChatNameRequest).
 * @returns {Promise}
 */
const updateChatName = (chatId, nameRequest) => {
    return fetchApi.put(`/chat/${chatId}`, nameRequest, {
        headers: {
            ...authHeader(),
            "Content-Type": "application/json",
        },
    });
};

export default {
    getChats,
    getChatById,
    getChatsByUser,
    createChat,
    deleteChat,
    addUserToChat,
    removeUserFromChat,
    updateChatName,
};
