<template>
  <div class="flex flex-col gap-y-3 bg-white p-3 rounded-lg shadow-sm">
    <form class="flex flex-col gap-y-3 w-full" action="#" @submit.prevent="createPost">
      <input-component class="w-full border-none" title="What are your thoughts?" v-model="form.title"></input-component>
      <input-component class="w-full border-none bg-gray-50" title="Add more.." v-model="form.content" v-if="form.title"></input-component>
      <button-component class="btn-secondary" v-if="form.title && form.content">Post</button-component>
    </form>
  </div>
</template>

<script>
import ButtonComponent from "@/components/ButtonComponent.vue";
import InputComponent from "@/components/InputComponent.vue";
import {mapStores} from "pinia";
import {usePostStore} from "@/store/modules/post.js";

export default {
  name: "CreatePostFormComponent",

  components: {InputComponent, ButtonComponent},

  computed: {
    ...mapStores(usePostStore),
  },

  data: () => ({
    form: {
      title: "",
      content: "",
    },
  }),

  methods: {
    createPost() {
      this.postStore.createPost(this.form).then(ignored => {
        this.form.title = "";
        this.form.content = "";
      })
    },
  }
}
</script>

<style scoped>

</style>