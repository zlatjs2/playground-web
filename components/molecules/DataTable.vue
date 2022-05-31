<template>
  <div :class="['data-table']">
    <atoms-base-table>
      <thead>
        <atoms-base-tablerow>
          <atoms-base-tablecell v-if="checked">
            {{ isChecked }}
            <atoms-base-checkbox v-model="isChecked" @change="checkAll" />
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
              v-model="checkItems"
              :check-value="row.id"
              @change="onChange"
            />
            {{ checkItems }}
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
      checkItems: [],
    }
  },
  methods: {
    checkAll() {
      if (this.isChecked) {
      } else {
      }
    },
    onChange(items) {
      console.log('### items: ', items)
      // this.checkItems = items
    },
  },
}
</script>

<style lang="scss" scoped>
.data-table {
}
</style>
