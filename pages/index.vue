<template>
  <div>
    ### : {{ isOpen }}
    <button type="button" @click="isOpen = !isOpen">버튼</button>

    <molecules-app-snackbar
      :is-show="isOpen"
      message="111111111"
      icon="success"
      @close="closeModal"
    />

    <!-- <molecules-app-modal
      heading="타이틀"
      :is-show="isOpen"
      @close="closeModal"
      @cancel="closeModal"
      @submit="submit"
    >
      <template #content> 123123123123 </template>
    </molecules-app-modal> -->
    <!-- <atoms-base-icon />

    <molecules-data-table :columns="columns" :rows="rows" checked /> -->
  </div>
</template>

<script>
export default {
  name: 'IndexPage',

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
