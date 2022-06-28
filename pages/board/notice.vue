<template>
  <section class="notice-list">
    <molecules-accordion-menu :items="items" />
  </section>
</template>

<script>
export default {
  name: 'NoticePage',
  data() {
    return {
      items: [
        {
          text: '공지사항1공지사항1공지사항1공지사항1공지사항1공지사항1공지사항1공지사항1공지사항1',
          content: '1111111',
        },
        {
          text: '공지사항1',
          content: '22222',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.notice-list {
  padding: $spacing;
}
</style>
