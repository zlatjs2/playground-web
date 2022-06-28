<template>
  <div class="app-wrapper">
    <main class="app-container">
      <article class="member-content">
        <Nuxt />
      </article>
    </main>
  </div>
</template>

<script>
export default {
  name: 'MemberLayout',
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
}
.member-content {
  max-width: 320px;
  margin: 0 auto;
}
</style>
