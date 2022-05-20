<template>
  <div :class="['text-field-wrap', classes]">
    <atoms-base-label v-if="label" :for-html="id">{{ label }}</atoms-base-label>
    <div :class="[classes, 'text-field']">
      <atoms-base-input
        :id="id"
        v-model="text"
        :maxlength="maxlength"
        placeholder="ID"
        @input="$emit('input', $event)"
      />
      <atoms-base-typorgraphy
        v-if="units === 'count'"
        component="span"
        class="body020"
      >
        {{ value.length }}/{{ maxlength }}
      </atoms-base-typorgraphy>
      <atoms-base-typorgraphy
        v-if="units.unit"
        component="span"
        class="body020"
      >
        {{ units.unit }}
      </atoms-base-typorgraphy>
    </div>
    <atoms-base-typorgraphy
      v-if="isError"
      component="div"
      class="text-error body020"
    >
      에러 메세지
    </atoms-base-typorgraphy>
  </div>
</template>

<script>
export default {
  name: 'TextField',
  props: {
    id: [String, Number],
    label: [String, Number],
    value: {
      type: [String, Number],
      required: true,
    },
    maxlength: [String, Number],
    units: {
      type: String,
      default: 'none', // none, count, unit
    },
    getterBottom: {
      type: Boolean,
      default: false,
    },
    isError: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      text: '',
    }
  },
  computed: {
    classes() {
      const prefix = 'text-field-wrap'

      return [
        this.getterBottom && `${prefix}--getter-bottom`,
        this.isError && `${prefix}--error`,
      ]
    },
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.text-field-wrap {
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
.text-error {
  margin-top: 4px;
}
</style>
