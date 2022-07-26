<template>
  <div class="app-wrapper">
    <main class="app-container">
      <article class="map-content">
        <Nuxt />
      </article>
    </main>
  </div>
</template>

<script>
export default {
  name: 'MapLayout',
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  display: flex;
  align-items: center;
  align-content: center;
  height: 100vh;
  background-color: $common-white;
}
.app-container {
  width: 100%;
  height: 100%;
}
.map-content {
}
</style>
