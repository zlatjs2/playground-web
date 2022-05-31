<template>
  <table :class="['base-table', classes]">
    <slot></slot>
  </table>
</template>

<script>
export default {
  name: 'BaseTable',
  props: {
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
      const prefix = 'base-table-cell'

      return [this.variant && `${prefix}--${this.variant}`]
    },
  },
}
</script>

<style lang="scss" scoped>
.base-table {
  border-collapse: collapse;
  width: 100%;
}
</style>
