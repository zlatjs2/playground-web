<template>
  <div>
    111
    <!-- <molecules-data-table
      :columns="columns"
      :rows="rows"
      checked
      @all="checkedAll"
    /> -->
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  middleware: ['auth'],

  data() {
    return {
      isOpen: false,
      columns: [
        '응시자명',
        '수험번호/사번',
        '직무/분야',
        '응시 상태',
        '응시완료일',
        '종합결과',
        '',
      ],

      rows: [
        {
          id: 'row-1',
          selected: false,
          cells: [
            {
              id: 'td1',
              value: 'td value 1',
            },
            {
              id: 'td1',
              value: 'td value 1',
            },
            {
              id: 'td1',
              value: 'td value 1',
            },
            {
              id: 'td1',
              value: 'td value 1',
            },
            {
              id: 'td1',
              value: 'td value 1',
            },
            {
              id: 'td1',
              value: 'td value 1',
            },
          ],
        },
        {
          id: 'row-2',
          selected: false,
          cells: [
            {
              id: 'td2',
              value: 'td value 2',
            },
            {
              id: 'td2',
              value: 'td value 2',
            },
            {
              id: 'td2',
              value: 'td value 2',
            },
            {
              id: 'td2',
              value: 'td value 2',
            },
            {
              id: 'td2',
              value: 'td value 2',
            },
            {
              id: 'td2',
              value: 'td value 2',
            },
          ],
        },
        {
          id: 'row-3',
          selected: false,
          cells: [
            {
              id: 'td3',
              value: 'td value 3',
            },
            {
              id: 'td3',
              value: 'td value 3',
            },
            {
              id: 'td3',
              value: 'td value 3',
            },
            {
              id: 'td3',
              value: 'td value 3',
            },
            {
              id: 'td3',
              value: 'td value 3',
            },
            {
              id: 'td3',
              value: 'td value 3',
            },
          ],
        },
      ],
    }
  },

  methods: {
    closeModal() {
      this.isOpen = false
    },
    checkedAll(val) {
      this.rows.forEach(row => (row.selected = val))
    },
    submit() {
      console.log('### submit!: ')
    },
  },
}
</script>

<style lang="scss">
body {
  color: $common-black;
}
</style>
