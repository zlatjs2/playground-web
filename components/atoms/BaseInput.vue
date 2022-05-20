<template>
  <input
    :class="['base-input', classes]"
    :id="id"
    :type="type"
    :name="name"
    :value="value"
    :placeholder="placeholder"
    :maxlength="maxlength + 1"
    :readonly="isReadonly"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    id: [String, Number],
    type: {
      type: [String, Number],
      default: 'text',
    },
    name: [String, Number],
    value: {
      type: [String, Number],
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    maxlength: Number,
    isReadonly: {
      type: Boolean,
    },
    isFullWidth: {
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
      const prefix = 'base-input'

      return [
        this.isDisabled && `${prefix}--disabled`,
        // this.isError && `${prefix}--error`,
      ]
    },
  },
}
</script>

<style lang="scss" scoped>
.base-input {
  padding: 4px 8px;
  margin: 0;
  border: 0 none;
  width: 100%;
  box-sizing: border-box;
  background: none;
  &:read-only,
  &:disabled {
    &:hover {
      cursor: not-allowed;
    }
  }
}
</style>
