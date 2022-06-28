<template>
  <transition name="fade">
    <div
      v-if="isShow"
      :class="['app-drawer-wrap', classes]"
      @click.self="onClose"
    >
      <div class="app-drawer">
        <div class="app-drawer__header">
          <atoms-base-button variant="text" @click="onClose">
            <atoms-base-icon name="close" color="primary" size="20" />
          </atoms-base-button>
        </div>
        <div class="app-drawer__content">
          <slot name="content"></slot>
        </div>

        <div class="app-drawer__footer">
          <slot name="footer"></slot>
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
      required: true,
    },
  },
  computed: {
    classes() {
      const prefix = 'app-drawer-wrap'

      return [
        `${prefix}--${this.size}`,
        `${prefix}--${this.isShow && 'isShow'}`,
      ]
    },
  },
  methods: {
    onClose(e) {
      e.stopPropagation()
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss">
.app-drawer-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: rgba($common-black, 0.4);
  .app-drawer {
    transform: translate(80%, 0);
    height: 100%;
  }
  &--isShow {
    .app-drawer {
      transform: translate(0, 0);
    }
  }

  &--small {
    .app-drawer {
      width: 100px;
    }
  }
  &--medium {
    .app-drawer {
      width: 80%;
    }
  }
  &--large {
    .app-drawer {
      width: 500px;
    }
  }
}
.app-drawer {
  position: relative;
  background-color: $grey020;
  &__header {
    padding: $spacing;
    text-align: right;
    background-color: $common-white;
  }
  &__content {
    section {
      padding: $spacing;
      margin-top: $spacing;
      background-color: $common-white;
      &:first-child {
        margin-top: 0;
      }
    }
  }
  &__footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    padding: $spacing;
    text-align: center;
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
