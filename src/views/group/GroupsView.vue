<template>
  <div class="w-full h-screen flex flex-col gap-y-12 items-center">
    <navbar-component></navbar-component>
    <main class="relative w-full h-full flex justify-stretch gap-x-6">
      <div class="w-1/2 flex items-start justify-end">
        <side-menu-component></side-menu-component>
      </div>
      <div class="w-full h-full flex flex-col gap-y-3">
        <p>Groups are not available yet</p>
      </div>
      <div class="w-1/2"></div>
    </main>
  </div>
</template>

<script>
import NavbarComponent from "@/components/navigation/NavbarComponent.vue";
import SideMenuComponent from "@/components/navigation/SideMenuComponent.vue";
import {mapStores} from "pinia";
import {useAuthStore} from "@/store/modules/auth.js";

export default {
  name: "GroupsView",

  components: {SideMenuComponent, NavbarComponent},

  computed: {
    ...mapStores(useAuthStore)
  }
}
</script>

<style scoped>

</style>