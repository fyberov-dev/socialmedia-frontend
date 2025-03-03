<template>
  <div class="flex flex-col w-full bg-white rounded-lg gap-y-6 shadow-sm" v-if="post">
    <div class="flex gap-x-3 justify-between items-center pt-6 px-6">
      <div class="flex gap-x-3 items-center">
        <div class="avatar" v-if="withAvatar">
          <div class="w-10 rounded-full bg-gray-100"></div>
        </div>
        <router-link :to="`/profile/${post.author.username}`">{{ post.author.name }} {{ post.author.surname }}</router-link>
        <p class="text-sm text-gray-900/60">{{ getCreatedAt(post.createdAt) }}</p>
      </div>

      <div class="dropdown">
        <div tabindex="0" role="button">
          <ellipsis-horizontal-svg></ellipsis-horizontal-svg>
        </div>
        <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          <li><button @click="copyLinkToPost(post.id)">Copy link</button></li>
          <template v-if="authStore.getSub() === post.author.username">
            <li><router-link :to="`/post/${post.id}/edit`">Edit</router-link></li>
            <li><button @click="deletePost(post.id)">Delete</button></li>
          </template>
        </ul>
      </div>
    </div>
    <div class="flex flex-col gap-y-3 px-6" :class="withComments ? '' : 'pb-6'">
      <h5 class="text-lg text-black/80">{{ post.title }}</h5>
      <p class="text-sm text-black/60 break-words" v-if="post.content">{{ post.content }}</p>
    </div>
    <router-link
        class="transition-all w-full bg-gray-100 py-2 px-6 rounded-b-lg hover:bg-gray-200"
        :to="`/post/${post.id}`"
        v-if="withComments">
      <p class="text-sm">Check comments</p>
    </router-link>
  </div>
</template>

<script>
import EllipsisHorizontalSvg from "@/components/svg/EllipsisHorizontalSvg.vue";
import {mapStores} from "pinia";
import {useAuthStore} from "@/store/modules/auth.js";
import {usePostStore} from "@/store/modules/post.js";

export default {

  name: "PostComponent",

  components: {EllipsisHorizontalSvg},

  props: {
    withAvatar: {
      type: Boolean,
      required: false,
      default: true
    },
    withComments: {
      type: Boolean,
      required: false,
      default: true
    },
    post: {
      id: Number,
      author: {
        name: String,
        surname: String,
      },
      title: String,
      content: String,
      createdAt: String
    }
  },

  computed: {
    ...mapStores(useAuthStore, usePostStore)
  },

  methods: {
    getCreatedAt(dateString) {
      const date = new Date(dateString);
      return `${this.formatDate(date.getDate())}.${this.formatDate(date.getMonth() + 1)} ${this.formatDate(date.getHours())}:${this.formatDate(date.getMinutes())}`;
    },

    formatDate(time) {
      if (time < 10) {
        return "0" + time;
      }
      return time;
    },

    deletePost(id) {
      this.postStore.deletePost(id)
    },

    copyLinkToPost(id) {
      navigator.clipboard.writeText(`${window.location.origin}/post/${id}`)
    }
  }
}
</script>