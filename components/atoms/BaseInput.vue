<template>
  <input
    :id="id"
    class="base-input"
    :type="type"
    :name="name"
    :value="value"
    :placeholder="placeholder"
    :maxlength="maxlength"
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
    maxlength: [String, Number],
    isReadonly: {
      type: Boolean,
      default: false,
    },
    isFullWidth: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  computed: {
    readonly() {
      return this.isReadonly
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
}
</style>
