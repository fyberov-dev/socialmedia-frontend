<template>
  <header class="w-full flex items-center justify-between p-6 gap-x-3 bg-white shadow-sm rounded-lg">
    <router-link to="/" class="text-xl font-semibold">SocialMedia</router-link>
    <input-component title="Search" v-model="search">
      <search-svg></search-svg>
    </input-component>
    <button-component v-if="authStore.isAuthenticated()" @click="exit">Exit</button-component>
    <div class="flex gap-x-3" v-else>
      <router-link class="btn btn-outline" to="/auth/register">Register</router-link>
      <router-link class="btn btn-outline" to="/auth/login">Login</router-link>
    </div>
  </header>
</template>

<script>
import SearchSvg from "@/components/svg/SearchSvg.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import InputComponent from "@/components/InputComponent.vue";
import {mapStores} from "pinia";
import {useAuthStore} from "@/store/modules/auth.js";

export default {
  name: "NavbarComponent",

  components: {
    SearchSvg, ButtonComponent, InputComponent
  },

  data: () => ({
    search: ""
  }),

  computed: {
    ...mapStores(useAuthStore),
  },

  methods: {
    exit() {
      this.authStore.exit().then(() => {
        window.location.reload();
      });
    },
  }
}
</script>

<style scoped>

</style>