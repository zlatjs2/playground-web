<template>
  <div :class="['data-table']">
    <atoms-base-table>
      <colgroup>
        <col :style="{ width: 100 + 'px' }" />
      </colgroup>

      <thead>
        <atoms-base-tablerow>
          <atoms-base-tablecell v-if="checked">
            <atoms-base-checkbox
              v-model="isChecked"
              :check-value="isChecked"
              @input="value => $emit('all', value)"
            />
            {{ isChecked }}
          </atoms-base-tablecell>
          <atoms-base-tablecell
            v-for="(column, mIdx) in columns"
            :key="mIdx"
            component="th"
          >
            {{ column }}
          </atoms-base-tablecell>
        </atoms-base-tablerow>
      </thead>

      <tbody>
        <atoms-base-tablerow
          v-for="(row, mIdx) in rows"
          :key="mIdx"
          :data-row-id="row.id"
          hovered
        >
          <atoms-base-tablecell v-if="checked">
            <atoms-base-checkbox
              v-model="row.selected"
              :check-value="row.selected"
              @input="onInput"
            />
            {{ row.selected }}
          </atoms-base-tablecell>
          <atoms-base-tablecell v-for="(cell, sIdx) in row.cells" :key="sIdx">
            {{ cell.value }}
          </atoms-base-tablecell>
        </atoms-base-tablerow>
      </tbody>
    </atoms-base-table>
  </div>
</template>

<script>
export default {
  name: 'DataTable',
  emit: ['input'],
  props: {
    columns: {
      type: Array,
      required: true,
    },
    rows: {
      type: Array,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isChecked: false,
    }
  },
  methods: {
    onInput() {
      const checkedRows = this.rows.filter(row => row.selected)

      this.isChecked = checkedRows.length === this.rows.length
    },
  },
}
</script>

<style lang="scss" scoped>
.data-table {
}
</style>
