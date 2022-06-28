<template>
  <nuxt-link :to="to" :class="['base-link', classes]">
    <slot></slot>
  </nuxt-link>
</template>

<script>
export default {
  name: 'BaseLink',
  props: {
    to: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: 'primary', // primary, secondary
    },
    isDisabled: {
      type: Boolean,
    },
  },
  computed: {
    classes() {
      const prefix = 'base-link'

      return [
        `${prefix}--${this.color}`,
        this.isDisabled && `${prefix}--disabled`,
      ]
    },
  },
}
</script>

<style lang="scss" scoped>
.base-link {
  @include font(body2);
  &--primary {
    color: $text-primary;
  }
  &--secondary {
    color: $text-secondary;
  }
  &--disabled {
    color: $text-disabled;
  }
}
</style>
