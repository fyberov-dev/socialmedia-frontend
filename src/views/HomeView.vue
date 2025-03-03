<template>
  <div class="w-full h-screen flex flex-col gap-y-12 items-center">
    <navbar-component></navbar-component>
    <main class="relative w-full flex justify-stretch gap-x-6 pb-6">
      <div class="w-1/2 flex items-start justify-end" v-if="authStore.isAuthenticated()">
        <side-menu-component></side-menu-component>
      </div>
      <div class="w-1/2" v-else></div>
      <div class="w-full h-full flex flex-col gap-y-3">
        <create-post-form-component v-if="authStore.isAuthenticated()"></create-post-form-component>
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
  </div>
</template>
<script>
import {mapStores} from "pinia";
import {usePostStore} from "@/store/modules/post.js";
import InputComponent from "@/components/InputComponent.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import PostComponent from "@/components/PostComponent.vue";
import SideMenuComponent from "@/components/navigation/SideMenuComponent.vue";
import NavbarComponent from "@/components/navigation/NavbarComponent.vue";
import CreatePostFormComponent from "@/components/CreatePostFormComponent.vue";
import {useAuthStore} from "@/store/modules/auth.js";
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";

export default {
  name: "HomeView",

  components: { ButtonComponent, InputComponent, PostComponent, SideMenuComponent, NavbarComponent, CreatePostFormComponent },

  computed: {
    ...mapStores(usePostStore, useAuthStore),
  },

  data: () => ({
    form: {
      title: "",
      content: "",
    },
    search: "",
    posts: null,
  }),

  mounted() {
    this.postStore.getPosts(0, 10);
  },

  methods: {
    changePage(i) {
      this.postStore.getPosts(i, 10)
    }
  }
}
</script>