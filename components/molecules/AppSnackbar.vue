<template>
  <transition name="fade">
    <div v-if="isShow" class="app-snackbar">
      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  name: 'AppSnackbar',
  props: {
    message: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '', // success, warning, error, info
    },
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      const prefix = 'app-snackbar'
      return [`${prefix}--${this.icon}`]
    },
  },
  watch: {
    isShow(newState, prevState) {
      console.log('### prevState / newState: ', prevState, newState)
      if (!newState) {
        this.$emit('close')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.app-snackbar {
  padding: $spacing;
  border-radius: $spacing;
  background-color: $grey030;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
