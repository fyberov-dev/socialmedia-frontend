<template>
  <div class="w-full h-screen flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-sm">
      <header class="border-b p-6">
        <h1 class="text-xl font-medium">Register</h1>
      </header>
      <main class="p-6 flex flex-col gap-y-3">
        <form action="#" class="flex flex-col gap-y-3" @submit.prevent="register">
          <input-component title="Username" v-model="form.username">
            <user-svg></user-svg>
          </input-component>
          <input-component type="email" title="Email" v-model="form.email">
            <email-svg></email-svg>
          </input-component>
          <input-component type="password" title="Password" v-model="form.password">
            <key-svg></key-svg>
          </input-component>
          <input-component title="Name" v-model="form.name">
            <user-svg></user-svg>
          </input-component>
          <input-component title="Surname" v-model="form.surname">
            <user-svg></user-svg>
          </input-component>
          <ButtonComponent class="btn-error">Register</ButtonComponent>
        </form>
        <p class="text-sm">Already have an account? <router-link to="/auth/login" class="text-primary">Log in</router-link></p>
      </main>
    </div>
    <div class="absolute right-6 bottom-6 flex flex-col gap-y-3 overflow-hidden">
      <alert-component type="error" :message="error" v-for="error in errors"></alert-component>
    </div>
  </div>
</template>

<script>
import InputComponent from "@/components/InputComponent.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import EmailSvg from "@/components/svg/EmailSvg.vue";
import KeySvg from "@/components/svg/KeySvg.vue";
import UserSvg from "@/components/svg/UserSvg.vue";
import {mapStores} from "pinia";
import {useAuthStore} from "@/store/modules/auth.js";
import AlertComponent from "@/components/AlertComponent.vue";
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
      email: "",
      password: "",
      name: "",
      surname: ""
    },
    errors: []
  }),

  methods: {
    register() {
      this.authStore.register(this.form)
          .then(data => {
            this.$router.push("/auth/login");
          })
          .catch(error => {
            if (typeof error === 'string') {
              this.errors.push(error);
            } else {
              this.errors.push(error[0]);
            }
          });

      setTimeout(() => {
        this.errors.shift();
      }, 3500);
    }
  }
}
</script>