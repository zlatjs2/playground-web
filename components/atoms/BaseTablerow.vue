<template>
  <tr :class="['base-tablerow', classes]">
    <slot></slot>
  </tr>
</template>

<script>
export default {
  name: 'BaseTablerow',
  props: {
    hovered: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      const prefix = 'base-tablerow'

      return [this.hovered && `${prefix}--isHovered`]
    },
  },
}
</script>

<style lang="scss" scoped>
.base-tablerow {
  &--isHovered {
    &:hover {
      background-color: $grey010;
    }
  }
}
</style>
