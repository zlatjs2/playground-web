<template>
  <select
    :id="id"
    :class="['base-select', classes]"
    :name="name"
    :value="value"
    :title="title"
    :disabled="isDisabled"
    @change="$emit('input', $event.target.value)"
  >
    <option value="" hidden>{{ defaultValue }}</option>
    <option v-for="(option, idx) in options" :key="idx">
      {{ option }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'BaseSelect',
  props: {
    id: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      required: true,
    },
    defaultValue: {
      type: String,
      default: '선택',
    },
    value: {
      type: String,
      required: true,
    },
    isError: {
      type: Boolean,
    },
    isDisabled: {
      type: Boolean,
    },
  },
  computed: {
    classes() {
      const prefix = 'base-select'

      return [
        this.isDisabled && `${prefix}--disabled`,
        this.isError && `${prefix}--error`,
      ]
    },
  },
}
</script>

<style lang="scss" scoped>
.base-select {
  background: none;
  &--disabled {
    cursor: not-allowed;
  }
  &--error {
    color: $text-error;
    border-color: $text-error;
  }
}
</style>
