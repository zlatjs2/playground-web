<template>
  <div class="base-dimmed"></div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.base-dimmed {
  z-index: $zIndexDrawer;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
