<template>
  <i :class="['base-icon']">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      :viewBox="`0 0 32 32`"
    ></svg>
  </i>
</template>

<script>
// import iconMixin from '@/mixins/iconMixin'

export default {
  name: 'BaseIcon',
  // mixin: [iconMixin],
  mounted() {
    // console.log('### iconMixin: ', iconMixin)
  },
}
</script>

<style lang="scss" scoped>
.base-icon {
}
</style>
