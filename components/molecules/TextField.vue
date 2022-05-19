<template>
  <div :class="[classes, 'text-field']">
    <atoms-base-input
      v-model="text"
      :maxlength="maxlength"
      placeholder="ID"
      @input="$emit('input', $event)"
    />
    <span v-if="units.count" class="body020">
      {{ value.length }}/{{ maxlength }}
    </span>
    <span v-if="units.unit" class="body020">
      {{ units.unit }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'TextField',
  props: {
    value: {
      type: [String, Number],
      required: true,
    },
    maxlength: [String, Number],
    units: {
      type: String,
      default: 'none', // none, count, unit
    },
  },
  data() {
    return {
      text: '',
      isError: false,
    }
  },
  computed: {
    classes() {
      return '------'
    },
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.text-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #eaeaea;
}
.body020 {
  margin-left: 8px;
}
</style>
