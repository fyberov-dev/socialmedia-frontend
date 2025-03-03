<template>
  <label class="input input-bordered bg-white flex items-center gap-2 cursor-text">
    <slot></slot>
    <input :type="type" class="grow" :id="title.toLocaleLowerCase()" :placeholder="title" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
  </label>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: false,
      default: "text"
    }
  }
}
</script>