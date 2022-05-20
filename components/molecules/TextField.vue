<template>
  <div :class="['text-field-wrap', classes]">
    <atoms-base-label v-if="label" :for-html="id">
      {{ label }}
      <atoms-base-typorgraphy
        v-if="isRequired"
        component="span"
        variant="caption"
        color="secondary"
      >
        필수
      </atoms-base-typorgraphy>
    </atoms-base-label>
    <div class="text-field">
      <atoms-base-input
        :id="id"
        :type="type"
        :name="name"
        :value="value"
        :placeholder="placeholder"
        :maxlength="maxlength + 1"
        :readonly="isReadonly"
        :disabled="isDisabled"
        @input="onInput"
        v-model="text"
      />
      <atoms-base-typorgraphy
        v-if="units === 'count'"
        component="span"
        variant="caption"
      >
        {{ value.length }}/{{ maxlength }}
      </atoms-base-typorgraphy>
      <atoms-base-typorgraphy
        v-if="units.unit"
        component="span"
        variant="caption"
      >
        {{ units.unit }}
      </atoms-base-typorgraphy>
    </div>
    <atoms-base-typorgraphy
      v-if="isError"
      component="div"
      variant="body2"
      class="error-message"
    >
      error message
    </atoms-base-typorgraphy>
  </div>
</template>

<script>
export default {
  name: 'TextField',
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
    isRequired: {
      type: Boolean,
    },
    isError: {
      type: Boolean,
    },
    label: [String, Number],

    units: {
      type: String,
      default: 'none', // none, count, unit
    },
    getterBottom: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      text: '',
      error: false,
    }
  },
  computed: {
    classes() {
      const prefix = 'text-field-wrap'

      return [
        this.getterBottom && `${prefix}--getter-bottom`,
        this.isDisabled && `${prefix}--disabled`,
        (this.isError || this.error) && `${prefix}--error`,
      ]
    },
  },
  methods: {
    onInput(value) {
      this.$emit('input', value)

      if (value.length >= this.maxlength + 1) {
        this.error = true
      } else {
        this.error = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.text-field-wrap {
  &--error {
    .base-label,
    .base-input,
    .base-typorgraphy {
      color: $error-main;
    }
    .text-field {
      border-color: $error-main;
    }
  }
  &--disabled {
    .text-field {
      border-color: $text-disabled;
      background-color: $text-disabled;
    }
  }
  &--getter-bottom {
    margin-bottom: $spacing * 2;
  }
}
.base-label {
  display: block;
  margin-bottom: $spacing / 2;
}
.text-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $spacing;
  border-radius: 4px;
  border: 1px solid #eaeaea;
}
.base-typorgraphy {
  margin-top: 4px;
}
</style>
