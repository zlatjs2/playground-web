<template>
  <div class="app-wrapper">
    <main class="app-container">
      <article class="member-content">
        <Nuxt />
      </article>
    </main>
    <atoms-base-dimmed v-if="pending" />
  </div>
</template>

<script>
export default {
  name: 'MemberLayout',
  computed: {
    pending() {
      return this.$store.state.common.isPending
    },
  },
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
