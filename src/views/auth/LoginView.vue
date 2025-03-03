<template>
  <div class="w-full h-screen flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-sm">
      <header class="border-b p-6">
        <h1 class="text-xl font-medium">Login</h1>
      </header>
      <main class="p-6 flex flex-col gap-y-3">
        <form action="#" class="flex flex-col gap-y-3" @submit.prevent="login">
          <input-component title="Username" v-model="form.username">
            <user-svg></user-svg>
          </input-component>
          <input-component type="password" title="Password" v-model="form.password">
            <key-svg></key-svg>
          </input-component>
          <ButtonComponent class="btn-error">Login</ButtonComponent>
        </form>
        <p class="text-sm">Don't have an account? <router-link to="/auth/register" class="text-primary">Register</router-link></p>
      </main>
    </div>
    <div class="absolute right-6 bottom-6 flex flex-col gap-y-3 overflow-hidden">
      <alert-component type="error" :message="error" v-for="error in errors"></alert-component>
    </div>
  </div>
</template>

<script>
import UserSvg from "@/components/svg/UserSvg.vue";
import InputComponent from "@/components/InputComponent.vue";
import AlertComponent from "@/components/AlertComponent.vue";
import EmailSvg from "@/components/svg/EmailSvg.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import KeySvg from "@/components/svg/KeySvg.vue";
import {mapStores} from "pinia";
import {useAuthStore} from "@/store/modules/auth.js";

export default {
  components: {
    AlertComponent,
    InputComponent,
    ButtonComponent,
    EmailSvg,
    KeySvg,
    UserSvg
  },

  computed: {
    ...mapStores(useAuthStore)
  },

  data: () => ({
    form: {
      username: "",
      password: "",
    },
    errors: []
  }),

  methods: {
    login() {
      this.authStore.login(this.form)
          .then(() => {
            this.$router.push("/");
          });
    }
  }
}
</script>