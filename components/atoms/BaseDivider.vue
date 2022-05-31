<template>
  <hr :class="['base-divider', classes]" />
</template>

<script>
export default {
  name: 'BaseDivider',
  props: {
    direction: {
      type: String,
      default: 'horizontal', // horizontal, vertical
    },
    variant: {
      type: String,
      default: 'solid', // solid, dotted, dashed
    },
  },
  computed: {
    classes() {
      const prefix = 'base-divider'

      return [`${prefix}--${this.variant}`, `${prefix}--${this.direction}`]
    },
  },
}
</script>

<style lang="scss" scoped>
.base-divider {
  margin: 0;
  border: 0 none;

  border-color: $divider;
  &--horizontal {
    width: 100%;
    border-top-width: 1px;
  }
  &--vertical {
    width: 1px;
    height: 100%;
    border-left-width: 1px;
  }
  &--solid {
    border-style: solid;
  }
  &--dotted {
    border-style: dotted;
  }
  &--dashed {
    border-style: dashed;
  }
}
</style>
