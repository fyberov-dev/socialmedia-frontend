<template>
  <div class="w-full h-screen flex flex-col gap-y-12 items-center">
    <header class="w-full flex items-center justify-between p-6 gap-x-3 bg-white shadow-sm rounded-lg">
      <h1 class="text-xl font-semibold">Chats</h1>
      <input-component title="Search Chats" v-model="search">
        <search-svg></search-svg>
      </input-component>
      <button-component v-if="authStore.isAuthenticated()" @click="exit">Exit</button-component>
      <div class="flex gap-x-3" v-else>
        <router-link class="btn btn-outline" to="/auth/register">Register</router-link>
        <router-link class="btn btn-outline" to="/auth/login">Login</router-link>
      </div>
    </header>

    <main class="relative w-full h-full flex justify-stretch gap-x-6">
      <div class="w-1/2 flex items-start justify-end" v-if="authStore.isAuthenticated()">
        <side-menu-component></side-menu-component>
      </div>

      <div class="w-full h-full flex flex-col gap-y-6">
        <div class="flex flex-col gap-y-3 bg-white p-3 rounded-lg shadow-sm" v-if="authStore.isAuthenticated()">
          <form class="flex gap-x-3 w-full" action="#" @submit.prevent="createChat">
            <input-component class="w-full border-none" title="Chat Name" v-model="form.chatName"></input-component>
            <button-component class="btn-secondary" :disabled="!this.form.chatName">Create Chat</button-component>
          </form>

          <div class="flex flex-col gap-y-3" v-if="chats">
            <div v-for="chat in chats" :key="chat.id" class="chat-item bg-gray-100 p-3 rounded-lg flex justify-between">
              <span>{{ chat.name }}</span>
              <button-component class="btn-primary" @click="selectChat(chat)">Add People</button-component>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-y-3 bg-white p-3 rounded-lg shadow-sm" v-if="selectedChat">
          <h2 class="text-lg font-semibold">Add People to {{ selectedChat.name }}</h2>
          <form class="flex gap-x-3 w-full" action="#" @submit.prevent="addPersonToChat">
            <input-component class="w-full border-none" title="Username" v-model="form.username"></input-component>
            <button-component class="btn-secondary" :disabled="!this.form.username">Add</button-component>
          </form>

          <ul class="mt-4">
            <li v-for="user in selectedChat.users" :key="user.id">{{ user.username }}</li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useChatStore } from "@/store/modules/chat.js";
import InputComponent from "@/components/InputComponent.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import SideMenuComponent from "@/components/navigation/SideMenuComponent.vue";
import SearchSvg from "@/components/svg/SearchSvg.vue";
import { useAuthStore } from "@/store/modules/auth.js";

export default {
  name: "ChatsView",

  components: { ButtonComponent, InputComponent, SideMenuComponent, SearchSvg },

  computed: {
    ...mapStores(useChatStore, useAuthStore),
  },

  data: () => ({
    form: {
      chatName: "",
      username: "",
    },
    search: "",
    chats: [],
    selectedChat: null,
  }),

  mounted() {
    if (this.authStore.isAuthenticated()) {
      this.chatStore.getChats().then(( data ) => {
        this.chats = data;
      });
    }
  },

  methods: {
    createChat() {
      this.chatStore.createChat({ name: this.form.chatName }).then(( data ) => {
        // this.chats.push(data);
        this.form.chatName = "";
      });
    },

    selectChat(chat) {
      this.selectedChat = chat;
    },

    addPersonToChat() {
      this.chatStore.addUserToChat(this.selectedChat.id, { username: this.form.username }).then(({ data }) => {
        this.selectedChat.users.push(data);
        this.form.username = "";
      });
    },

    exit() {
      this.authStore.exit().then(() => {
        window.location.reload();
      });
    },
  },
};
</script>
