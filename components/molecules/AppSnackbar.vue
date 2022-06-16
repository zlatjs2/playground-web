<template>
  <transition name="fade">
    <div v-if="isShow" class="app-snackbar">
      <div class="app-snackbar__icon">
        <atoms-base-icon />
      </div>
      <div class="app-snackbar__content">
        <atoms-base-typorgraphy component="p" variant="body2">
          {{ message }}
        </atoms-base-typorgraphy>
      </div>
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-content: center;
  align-items: center;
  border-radius: $spacing;
  background-color: $grey030;
  &__icon {
    padding: $spacing;
  }
  &__content {
    width: 100%;
    box-sizing: border-box;
    padding: $spacing;
  }

  &--info,
  &--error,
  &--warning,
  &--success {
    color: $common-white;
  }
  &--info {
    background-color: $info-main;
  }
  &--error {
    background-color: $error-main;
  }
  &--warning {
    background-color: $warning-main;
  }
  &--success {
    background-color: $success-main;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
