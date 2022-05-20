<template>
  <input
    type="checkbox"
    :class="['base-checkbox', classes]"
    :id="id"
    :name="name"
    :value="value"
    :title="title"
    :disabled="isDisabled"
    @change="onChange"
  />
</template>

<script>
export default {
  name: 'BaseCheckbox',
  props: {
    id: [String, Number],
    type: {
      type: [String, Number],
      default: 'text',
    },
    name: [String, Number],
    value: {
      type: Boolean,
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
      const prefix = 'base-checkbox'

      return [
        this.isDisabled && `${prefix}--disabled`,
        this.isError && `${prefix}--error`,
      ]
    },
  },
  methods: {
    onChange(e) {
      const { checked } = e.target
      if (this.value && Array.isArray(this.value)) {
        const newItems = [...this.value]
        if (checked) {
          newItems.push(this.checkValue)
        } else {
          newItems.splice(newItems.indexOf(this.checkValue), 1)
        }

        this.$emit('input', newItems)
      } else {
        this.$emit('input', checked)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.base-checkbox {
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
