<template>
  <component :is="component" :class="['base-typorgraphy', classes]">
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'BaseTyporgraphy',
  props: {
    component: {
      type: String, // h1 ~ h2, div, p, span, strong, em, b
      required: true,
    },
    variant: {
      type: String,
      default: 'body1', // title1 ~ title6, subtitle1~ subtitle2, body1 ~ body2, caption
    },
    color: {
      type: String,
      default: 'primary', // primary, secondary, error, disabled
    },
  },
  computed: {
    classes() {
      const prefix = 'base-typorgraphy'

      return [
        `${prefix}--${this.color}`,
        this.variant && `${prefix}--${this.variant}`,
      ]
    },
  },
}
</script>

<style lang="scss" scoped>
.base-typorgraphy {
  &--title1 {
    @include font(title1);
  }
  &--title2 {
    @include font(title2);
  }
  &--title3 {
    @include font(title3);
  }
  &--title4 {
    @include font(title4);
  }
  &--title5 {
    @include font(title5);
  }
  &--title6 {
    @include font(title6);
  }
  &--body1 {
    @include font(body1);
  }
  &--body2 {
    @include font(body2);
  }
  &--caption {
    @include font(caption);
  }

  &--primary {
    color: $text-primary;
  }
  &--secondary {
    color: $text-secondary;
  }
  &--disabled {
    color: $text-disabled;
  }
  &--error {
    color: $text-error;
  }
}
</style>
