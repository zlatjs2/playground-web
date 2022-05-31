<template>
  <component
    :is="component"
    :class="['base-tablecell', classes]"
    :align="component !== 'th' && align"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'BaseTablecell',
  props: {
    component: {
      type: String, // th, td
      default: 'td',
    },
    align: {
      type: String,
      default: 'left', // left, center, right
    },
    // variant: {
    //   type: String,
    //   default: 'body1', // title1 ~ title6, subtitle1~ subtitle2, body1 ~ body2, caption
    // },
    // color: {
    //   type: String,
    //   default: 'primary', // primary, secondary, error, disabled
    // },
  },
  computed: {
    classes() {
      const prefix = 'base-tablecell'

      return [
        this.component === 'th' && `${prefix}--${this.align}`,
        this.variant && `${prefix}--${this.variant}`,
      ]
    },
  },
}
</script>

<style lang="scss" scoped>
th {
  text-align: left;
}
td {
}
.base-tablecell {
  padding: $spacing / 2 * 2 $spacing * 2;
  &--left {
    text-align: left;
  }
  &--center {
    text-align: center;
  }
  &--right {
    text-align: right;
  }
}
</style>
