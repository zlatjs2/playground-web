<template>
  <section class="notice-list">
    <molecules-accordion-menu :items="items" />
  </section>
</template>

<script>
export default {
  name: 'NoticePage',
  async asyncData({ $fire }) {
    const notices = await $fire.firestore.collection('notices').get()

    return {
      items: notices.docs.map(doc => doc.data()),
    }
  },
  data() {
    return {
      items: null,
    }
  },
}
</script>

<style lang="scss" scoped>
.notice-list {
  padding: $spacing;
}
</style>
