<template>
  <label :for="forHtml" class="base-label">
    <slot></slot>
  </label>
</template>

<script>
export default {
  name: 'BaseLabel',
  props: {
    forHtml: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.base-label {
  @include font('body2');
}
</style>
