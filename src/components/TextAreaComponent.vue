<template>
  <textarea class="textarea" :id="title.toLocaleLowerCase()" :placeholder="title" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"></textarea>
</template>

<script>
export default {
  name: "TextAreaComponent",

  props: {
    title: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      required: true
    },
  }
}
</script>

<style scoped>

</style>