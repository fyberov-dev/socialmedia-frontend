<template>
  <div class="w-full h-screen flex flex-col gap-y-12 items-center">
    <navbar-component></navbar-component>
    <main class="relative w-full flex justify-stretch gap-x-6 pb-6">
      <div class="w-1/2 flex items-start justify-end" v-if="authStore.isAuthenticated()">
        <side-menu-component></side-menu-component>
      </div>
      <div class="w-1/2" v-else></div>
      <div class="w-full h-full flex flex-col gap-y-3">
        <post-component :post="postStore.data[0]" v-if="postStore.data" :with-comments="false"></post-component>

        <div class="flex flex-col gap-y-3">
          <div class="bg-white rounded-lg p-3 shadow-sm flex flex-col gap-y-3" :key="i" v-for="(comment, i) in postStore.comments">
            <div class="flex gap-x-3">
              <router-link class="transition-all text-sm text-gray-800/60 hover:text-gray-800/80" :to="`/profile/${comment.user.username}`">{{ comment.user.name }} {{ comment.user.surname }}</router-link>
            </div>
            <p class="text-sm text-gray-800/80">{{ comment.content }}</p>
          </div>
        </div>

        <form action="#" class="w-full flex gap-x-3" @submit.prevent="postComment()">
          <input-component class="w-full border-none shadow-sm" title="Leave your comment.." v-model="form.content"></input-component>
          <button-component>Comment</button-component>
        </form>
      </div>
      <div class="w-1/2"></div>
    </main>
  </div>
</template>

<script>
import {mapStores} from "pinia";
import {usePostStore} from "@/store/modules/post.js";
import NavbarComponent from "@/components/navigation/NavbarComponent.vue";
import CreatePostFormComponent from "@/components/CreatePostFormComponent.vue";
import PostComponent from "@/components/PostComponent.vue";
import SideMenuComponent from "@/components/navigation/SideMenuComponent.vue";
import {useAuthStore} from "@/store/modules/auth.js";
import InputComponent from "@/components/InputComponent.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";

export default {
  name: "PostView",
  components: {
    ButtonComponent,
    InputComponent, SideMenuComponent, PostComponent, CreatePostFormComponent, NavbarComponent},

  data: () => ({
    form: {
      content: ""
    }
  }),

  computed: {
    ...mapStores(usePostStore, useAuthStore)
  },

  mounted() {
    this.postStore.getPostById(this.$route.params.id);
    this.postStore.getCommentsByPostId(this.$route.params.id);
  },

  methods: {
    postComment() {
      this.postStore.postComment(this.$route.params.id, this.form)
          .then(() => {
            this.form.content = "";
          });
    }
  }
}
</script>

<style scoped>

</style>