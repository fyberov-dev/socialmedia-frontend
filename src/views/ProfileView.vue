<template>
  <div class="w-full h-screen flex flex-col gap-y-12 items-center">
    <navbar-component></navbar-component>
    <main class="relative w-full flex justify-stretch gap-x-6 pb-12" v-if="userStore.user">
      <div class="flex flex-col items-end justify-start w-1/2">
        <div class="flex flex-col gap-y-3">
          <div class="w-full bg-white py-4 px-5 rounded-lg shadow-sm flex flex-col gap-y-3">
            <div class="transition-all w-full h-0 pb-[100%] bg-gray-100 hover:bg-gray-200 rounded-lg"></div>
            <h3>{{ userStore.user.name }} {{userStore.user.surname }}</h3>
          </div>
          <div class="flex items-start justify-end" v-if="authStore.isAuthenticated()">
            <side-menu-component></side-menu-component>
          </div>
        </div>
      </div>
      <div class="w-full h-full flex flex-col gap-y-3">
        <create-post-form-component v-if="userStore.user.username === authStore.getSub()"></create-post-form-component>
        <template v-if="postStore.data">
          <PostComponent :post="post" v-for="post in postStore.data.posts" :key="post.id" :with-avatar="false"></PostComponent>
          <div class="join flex justify-center">
            <button
                class="join-item btn"
                :class="postStore.data.pageNo == (i - 1) ? 'btn-active' : ''"
                :key="i"
                v-for="i in postStore.data.pagesTotal"
                @click="changePage(i - 1)"
            >
              {{ i }}
            </button>
          </div>
        </template>
      </div>
      <div class="w-1/2"></div>
    </main>
    <main class="relative w-full h-full flex items-center justify-center" v-else>
      <h1 class="text-3xl text-gray-900/30">User not found</h1>
    </main>
  </div>
</template>

<script>
import { useUserStore } from "@/store/modules/user.js"
import {mapStores} from "pinia";
import PostComponent from "@/components/PostComponent.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import InputComponent from "@/components/InputComponent.vue";
import SideMenuComponent from "@/components/navigation/SideMenuComponent.vue";
import {useAuthStore} from "@/store/modules/auth.js";
import NavbarComponent from "@/components/navigation/NavbarComponent.vue";
import {usePostStore} from "@/store/modules/post.js";
import CreatePostFormComponent from "@/components/CreatePostFormComponent.vue";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

export default {
  name: "ProfileView",
  components: {
    CreatePostFormComponent,
    SideMenuComponent, InputComponent, ButtonComponent, PostComponent, NavbarComponent},

  computed: {
    ...mapStores(useUserStore, useAuthStore, usePostStore),
  },

  mounted() {
    const username = this.$route.params.id;
    this.userStore.getProfile(username)
        .then(() => {
          this.postStore.getPostsByUser(username, 0, 3)
        });
  },

  methods: {
    changePage(i) {
      this.postStore.getPostsByUser(this.$route.params.id, i, 3)
    }
  }
}
</script>

<style scoped>

</style>