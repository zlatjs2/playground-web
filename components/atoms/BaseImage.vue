<template>
  <img
    :id="id"
    :name="name"
    :src="src"
    :width="width"
    :height="height"
    :alt="alt"
    :class="['base-image', classes]"
    @error="onError"
  />
</template>

<script>
const errorImageSrc = ''

export default {
  name: 'BaseImage',
  props: {
    id: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    src: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '100',
    },
    height: {
      type: String,
      default: 'auto',
    },
    alt: {
      type: String,
      default: '',
    },
    isRadius: {
      type: Boolean,
    },
  },
  data() {
    return {
      isError: false,
    }
  },
  computed: {
    classes() {
      const prefix = 'base-image'

      return [`${prefix}--${this.isRadius && 'isRadius'}`]
    },
  },
  methods: {
    onError(e) {
      e.target.src = errorImageSrc
    },
  },
}
</script>

<style lang="scss">
.base-image {
  &--isRadius {
    border-radius: 50%;
  }
}
</style>
