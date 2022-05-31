<template>
  <img
    :id="id"
    :name="name"
    :src="src"
    :width="width"
    :height="height"
    :alt="alt"
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
  },
  data() {
    return {
      isError: false,
    }
  },
  methods: {
    onError(e) {
      e.target.src = errorImageSrc
    },
  },
}
</script>

<style></style>
