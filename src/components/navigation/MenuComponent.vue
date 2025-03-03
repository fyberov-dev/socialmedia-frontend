<template>
  <div class="menu bg-white rounded-box w-56 shadow-sm">
    <slot></slot>
  </div>
</template>

<script>
import GroupSvg from "@/components/svg/GroupSvg.vue";
import NewsPaperSvg from "@/components/svg/NewsPaperSvg.vue";
import HomeSvg from "@/components/svg/HomeSvg.vue";
import ChatBubbleSvg from "@/components/svg/ChatBubbleSvg.vue";

export default {
  name: "MenuComponent",

  components: {
    GroupSvg,
    NewsPaperSvg,
    HomeSvg,
    ChatBubbleSvg
  }
}
</script>