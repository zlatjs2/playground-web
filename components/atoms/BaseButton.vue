<template>
  <button
    :id="id"
    :type="type"
    :name="name"
    :value="value"
    :disabled="isDisabled"
    :class="['base-button', classes]"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    id: {
      type: [String, Number],
      default: '',
    },
    type: {
      type: String,
      default: 'button',
    },
    name: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'medium', // small, medium, large
    },
    color: {
      type: String,
      default: 'grey', // white, grey, primary, secondary, success, info, warning, error
    },
    variant: {
      type: String,
      default: 'contained', // outlined, contained, text
    },
    getterBottom: {
      type: Boolean,
    },
    isDisabled: {
      type: Boolean,
    },
    isFullWidth: {
      type: Boolean,
    },
  },
  computed: {
    classes() {
      const prefix = 'base-button'

      return [
        `${prefix}--${this.size}`,
        `${prefix}--${this.color}`,
        `${prefix}--${this.variant}`,
        this.getterBottom && `${prefix}--getter-bottom`,
        this.isFullWidth && `${prefix}--fullwidth`,
        this.isDisabled && `${prefix}--disabled`,
      ]
    },
  },
}
</script>

<style lang="scss" scoped>
.base-button {
  border-radius: 4px;
  &--small {
    @include font(caption);
    min-width: 56px;
    height: 32px;
  }
  &--medium {
    @include font(body2);
    min-width: 80px;
    height: 42px;
  }
  &--large {
    @include font(body1);
    min-width: 100px;
    height: 56px;
  }

  &--outlined {
    border: 1px solid;
  }

  &--contained {
    border: 1px solid;
    color: $common-white;
  }

  &--white {
    border-color: $common-white;
    color: $text-primary;
    &.base-button--outlined {
      border-color: $text-primary;
    }
    &.base-button--contained {
      background-color: $common-white;
    }
  }

  &--grey {
    border-color: $grey060;

    &.base-button--outlined {
      color: $text-primary;
    }
    &.base-button--contained {
      background-color: $grey060;
    }
  }

  &--primary {
    border-color: $primary-main;
    &.base-button--text {
      color: $primary-main;
    }
    &.base-button--outlined {
      color: $primary-main;
    }
    &.base-button--contained {
      background-color: $primary-main;
    }
  }
  &--secondary {
    border-color: $secondary-main;
    &.base-button--text {
      color: $secondary-main;
    }
    &.base-button--outlined {
      color: $secondary-main;
    }
    &.base-button--contained {
      background-color: $secondary-main;
    }
  }

  &--warning {
    border-color: $warning-main;
    &.base-button--outlined {
      color: $warning-main;
    }
    &.base-button--contained {
      background-color: $warning-main;
    }
  }

  &--error {
    border-color: $error-main;
    &.base-button--outlined {
      color: $error-main;
    }
    &.base-button--contained {
      background-color: $error-main;
    }
  }

  &--text {
    min-width: 44px;
    line-height: 44px;
    &:hover {
      text-decoration: underline;
    }
  }

  &--fullwidth {
    width: 100%;
  }
  &--getter-bottom {
    margin-bottom: $spacing;
  }
  &--disabled {
    color: $text-disabled;
    background-color: $grey020;
  }

  &:hover {
    /* &.base-button--primary {
      background-color: $primary-dark;
    }
    &.base-button--secondary {
      background-color: $secondary-dark;
    }
    &.base-button--grey {
      background-color: $grey070;
    } */
  }
}
</style>
