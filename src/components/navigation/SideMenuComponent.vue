<template>
  <menu-component>
    <menu-link-component title="My profile" :to="`/profile/${authStore.getSub()}`">
      <HomeSvg></HomeSvg>
    </menu-link-component>
    <menu-link-component title="Feed" to="/">
      <NewsPaperSvg></NewsPaperSvg>
    </menu-link-component>
    <menu-link-component title="Messages" to="">
      <ChatBubbleSvg></ChatBubbleSvg>
    </menu-link-component>
    <menu-link-component title="Groups" to="" :disabled="true">
      <GroupSvg></GroupSvg>
    </menu-link-component>
  </menu-component>
</template>

<script>
import MenuLinkComponent from "@/components/navigation/MenuLinkComponent.vue";
import ChatBubbleSvg from "@/components/svg/ChatBubbleSvg.vue";
import HomeSvg from "@/components/svg/HomeSvg.vue";
import NewsPaperSvg from "@/components/svg/NewsPaperSvg.vue";
import MenuComponent from "@/components/navigation/MenuComponent.vue";
import GroupSvg from "@/components/svg/GroupSvg.vue";
import {mapStores} from "pinia";
import {useAuthStore} from "@/store/modules/auth.js";

export default {
  components: {
    MenuLinkComponent,
    ChatBubbleSvg,
    HomeSvg,
    NewsPaperSvg,
    MenuComponent,
    GroupSvg
  },

  computed: {
    ...mapStores(useAuthStore)
  }
}
</script>