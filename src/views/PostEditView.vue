<template>
  <div class="w-full h-screen flex flex-col gap-y-12 items-center">
    <navbar-component></navbar-component>
    <main class="relative w-full h-full flex justify-center items-center gap-x-3" v-if="post">
      <div class="w-3/4 flex gap-x-3">
        <div class="w-full flex flex-col gap-y-3">
          <div class="flex flex-col gap-y-3">
            <p>Current post:</p>
            <post-component :post="post"></post-component>
          </div>
          <div class="flex flex-col gap-y-3">
            <p>Updated Post preview:</p>
            <post-component :post="updatedPost"></post-component>
          </div>
        </div>
        <form class="w-full flex flex-col gap-3" @submit.prevent="editPost">
          <p>Update post:</p>
          <input-component class="w-full border-none h-1/6" title="Title" v-model="form.title"></input-component>
          <text-area-component class="bg-white border-none h-full" title="Content" v-model="form.content"></text-area-component>
          <button-component>Save</button-component>
        </form>
      </div>
    </main>
  </div>
</template>

<script>
import {mapStores} from "pinia";
import {usePostStore} from "@/store/modules/post.js";
import NavbarComponent from "@/components/navigation/NavbarComponent.vue";
import InputComponent from "@/components/InputComponent.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import PostComponent from "@/components/PostComponent.vue";
import TextAreaComponent from "@/components/TextAreaComponent.vue";
import {useAuthStore} from "@/store/modules/auth.js";

export default {
  name: "PostEditView",
  components: {TextAreaComponent, PostComponent, ButtonComponent, InputComponent, NavbarComponent},

  data: () => ({
    post: null,
    updatedPost: {
      id: "",
      title: "",
      content: "",
      author: "",
      createdAt: "",
    },
    form: {
      title: "",
      content: "",
    }
  }),

  watch: {
    'form.title': {
      handler(title) {
        if (!this.updatedPost) return;
        this.updatedPost.title = title;
      },
      immediate: true,
    },
    'form.content': {
      handler(content) {
        if (!this.updatedPost) return;
        this.updatedPost.content = content;
      },
      immediate: true,
    },
  },

  computed: {
    ...mapStores(usePostStore, useAuthStore)
  },

  mounted() {
    this.postStore.checkOwnership(this.$route.params.id)
        .then((data) => {
          this.post = data;
          this.form.title = data.title;
          this.form.content = data.content;
          this.updatedPost = { ...data };
        })
        .catch(() => {
          this.$router.push("/");
        });
  },

  methods: {
    editPost() {
      const request = {
        title: this.updatedPost.title,
        content: this.updatedPost.content
      }
      this.postStore.updatePost(this.post.id, request)
          .then(() => {
            this.$router.push(`/profile/${this.authStore.getSub()}`);
          });
    }
  }
}
</script>
