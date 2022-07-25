<template>
  <div>
    <div v-for="(item, idx) in items" :key="idx" class="accordion-menu">
      <nuxt-link v-if="item.link" :to="item.link" class="accordion-menu__item">
        {{ item.text }}
        <atoms-base-icon name="arrowRight" color="secondary" size="12" />
      </nuxt-link>
      <atoms-base-button
        v-else
        :id="idx"
        color="white"
        class="accordion-menu__item"
        is-full-width
        @click="onSelect"
      >
        <atoms-base-typorgraphy component="div" variant="body2">
          {{ item.title }}
        </atoms-base-typorgraphy>
        <atoms-base-icon name="arrowDown" color="secondary" size="12" />
      </atoms-base-button>
      <div
        :class="[
          'accordion-menu__content',
          selectKey === String(idx)
            ? 'accordion-menu__content--isSelected'
            : '',
        ]"
      >
        {{ item.content }}
      </div>
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
  data() {
    return {
      // isSelected: false,
      selectKey: -1,
    }
  },
  // computed: {
  //   isSelected() {
  //     return this.selectKey ===
  //   },
  // },
  methods: {
    onSelect(e) {
      e.preventDefault()
      this.selectKey = e.target.id
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
    text-align: left;
    .base-typorgraphy {
      margin-right: $spacing;
      flex-grow: 1;
    }
  }
  &__content {
    @include font(body2);
    display: none;
    padding: $spacing;
    &--isSelected {
      display: block;
    }
  }
}
</style>
