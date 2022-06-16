<template>
  <transition name="fade">
    <div v-if="isShow" :class="['app-modal-wrap', classes]" @click="onClose">
      <div class="app-modal">
        <div class="app-modal__header">
          <atoms-base-typorgraphy component="h2">
            {{ heading }}
          </atoms-base-typorgraphy>
        </div>
        <div class="app-modal__content">
          <slot name="content"></slot>
        </div>
        <div class="app-modal__footer">
          <atoms-base-button @click="() => $emit('cancel')">
            취소
          </atoms-base-button>
          <atoms-base-button @click="() => $emit('submit')">
            확인
          </atoms-base-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'AppModal',
  props: {
    size: {
      type: String,
      default: 'medium', // small, medium, large
    },
    heading: {
      type: String,
      default: '',
    },
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      const prefix = 'app-modal-wrap'

      return [`${prefix}--${this.size}`]
    },
  },
  methods: {
    onClose(e) {
      console.log('### 111:', 111)

      e.stopPropagation()
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss" scoped>
.app-modal-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  &--small {
    .app-modal {
      width: 120px;
    }
  }
  &--medium {
    .app-modal {
      width: 360px;
    }
  }
  &--large {
    .app-modal {
      width: 500px;
    }
  }
}
.app-modal {
  border: 1px solid $divider;
  background-color: $common-white;
  &__header {
    padding: $spacing;
  }
  &__content {
    padding: $spacing;
  }
  &__footer {
    padding: $spacing;
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
