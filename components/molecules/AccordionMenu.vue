<template>
  <div>
    <div v-for="(item, idx) in items" :key="idx" class="accordion-menu">
      <nuxt-link v-if="item.link" :to="item.link" class="accordion-menu__item">
        {{ item.text }}
        <atoms-base-icon name="arrowRight" color="secondary" size="12" />
      </nuxt-link>
      <atoms-base-button
        v-else
        color="white"
        is-full-width
        class="accordion-menu__item"
      >
        {{ item.text }}
        <atoms-base-icon name="arrowDown" color="secondary" size="12" />
      </atoms-base-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccordionMenu',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.accordion-menu {
  a {
    padding: 0 $spacing;
    height: 42px;
  }
  &__item {
    @include font(body2);
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
