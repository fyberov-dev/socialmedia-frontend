<template>
  <li :class="disabled ? 'opacity-30' : ''">
    <router-link :to="to">
      <slot></slot>
      <span>{{ title }}</span>
    </router-link>
  </li>
</template>
<script>
export default {
  name: "MenuLinkComponent",

  props: {
    title: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>