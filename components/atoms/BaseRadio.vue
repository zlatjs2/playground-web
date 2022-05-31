<template>
  <input
    :id="id"
    type="radio"
    :class="['base-radio', classes]"
    :name="name"
    :value="radioValue"
    :title="title"
    :checked="isChecked"
    :disabled="isDisabled"
    @change="$emit('input', $event.target.value)"
  />
</template>

<script>
export default {
  name: 'BaseRadio',
  props: {
    id: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Boolean],
      required: true,
    },
    radioValue: {
      type: [String, Boolean],
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    isError: {
      type: Boolean,
    },
    isDisabled: {
      type: Boolean,
    },
  },
  data() {
    return {}
  },
  computed: {
    classes() {
      const prefix = 'base-radio'

      return [
        this.isDisabled && `${prefix}--disabled`,
        this.isError && `${prefix}--error`,
      ]
    },
    isChecked() {
      return this.value === this.radioValue
    },
  },
}
</script>

<style lang="scss" scoped>
.base-radio {
  width: 16px;
  height: 16px;
  border: 1px solid $divider;
  &--disabled {
    cursor: not-allowed;
  }
  &--error {
    border-color: $text-error;
  }
}
</style>
