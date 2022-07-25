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
    <div id="map" style="width: 100%; height: 80vh"></div>

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
  async asyncData({ $fire }) {
    const cities = $fire.firestore.collection('cities')
    let items = null

    try {
      const snapshot = await cities.get()

      snapshot.forEach(async doc => {
        console.log('### doc.id:', doc.id)

        items = snapshot.docs.map(doc => doc.data())

        const reviews = cities.doc(doc.id).collection('reviews')
        const subSnapshot = await reviews.get()
        const subItems = subSnapshot.docs.map(doc2 => doc2.data())
        console.log('### subItems:', subItems)
      })
    } catch (error) {
      console.log('### error:', error)
    }

    return {
      items,
    }
  },
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

      map: null,
      mapCenter: { lat: 35.105696, lng: 129.042857 },
      bands: {
        lat: 35.106187,
        lng: 129.042943,
      },
      bands2: {
        lat: 35.105556,
        lng: 129.04393,
      },
    }
  },
  mounted() {
    this.initMap()
    this.setMarker(this.mapCenter, 'ce')
    this.setMarker(this.bands, '1')
    this.setMarker(this.bands2, '2')
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
    initMap() {
      this.map = new window.google.maps.Map(document.getElementById('map'), {
        // getElementById로 map id 속성의 요소를 가져온다.
        center: this.mapCenter, // center로 할 위도, 경도를 지정한다.
        zoom: 17, // zoom size를 지정.
        maxZoom: 20,
        minZoom: 3,
        streetViewControl: true,
        mapTypeControl: true,
        fuulscreenControl: true,
        zoomControl: true,
      })
    },
    setMarker(Points, Label) {
      // 지도에 마커를 찍는 함수.
      const markers = new window.google.maps.Marker({
        position: Points,
        map: this.map,
        label: {
          text: Label,
          color: '#FFF',
        },
      })

      console.log('### markers:', markers)
    },
  },
}
</script>

<style lang="scss">
body {
  color: $common-black;
}
</style>
