<template>
  <div>
    <div v-if="items && items.length > 0">
      <h3>아이템 리스트</h3>
      <div v-for="(item, idx) in items" :key="idx">
        {{ item.name }}
      </div>

      <div>
        <h4>상세</h4>
        1123123
      </div>
    </div>
    <div v-else>아이템이 없습니다</div>
    {{ userInfo }}
    <!-- <molecules-data-table
      :columns="columns"
      :rows="rows"
      checked
      @all="checkedAll"
    /> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'IndexPage',
  middleware: ['auth'],
  computed: {
    ...mapState(['userInfo']),
  },
  // async asyncData({ $fire }) {
  //   const cities = $fire.firestore.collection('cities')
  //   let items = null

  //   try {
  //     const snapshot = await cities.get()
  //     console.log('### snapshot:', snapshot)

  //     snapshot.forEach(async doc => {
  //       console.log('### doc.id:', doc.id)

  //       items = snapshot.docs.map(doc => doc.data())

  //       const reviews = cities.doc(doc.id).collection('reviews')
  //       const subSnapshot = await reviews.get()
  //       const subItems = subSnapshot.docs.map(doc2 => doc2.data())
  //       console.log('### subItems:', subItems)
  //     })
  //   } catch (error) {
  //     console.log('### error:', error)
  //   }

  //   return {
  //     items,
  //   }
  // },
  data() {
    return {
      items: null,
      details: null,
      testItem: null,
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

      collections: {
        score: {},
        guide: {},
        people: {},
        reviews: {},
      },
    }
  },
  mounted() {
    console.log('### :', this.userInfo)
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
