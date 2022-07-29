<template>
  <section>
    <!-- <molecules-text-field
      id="autocomplete"
      :placeholder="placeholder"
      :value="value"
      size="100"
    /> -->
    <input
      id="autocomplete"
      v-model="keyword"
      placeholder="placeholder"
      size="100"
    />
    <!-- 

    <atoms-base-select
      id="country"
      v-model="selection"
      :options="options"
      :default-value="options[0]"
    /> -->

    <div id="map" :style="{ width: '100%', height: '60vh' }"></div>

    <ul v-if="results">
      <li v-for="(result, idx) in results" :key="idx">
        <button type="button" @click="showInfoWindow(markers[idx])">
          <img :src="result.icon" alt="" />
          {{ result.name }}
        </button>
      </li>
    </ul>

    <div id="info-content">
      <ul v-if="currentPlace">
        <li>{{ currentPlace.url }}</li>
        <li>{{ currentPlace.name }}</li>
        <li>{{ currentPlace.vicinity }}</li>
        <li>{{ currentPlace.formatted_phone_number }}</li>

        <li v-if="currentPlace.rating">별점 : {{ currentPlace.rating }}</li>
        <li>
          <a :href="currentPlace.url" target="_blank"> 구글 링크 바로가기 </a>
        </li>
        <li v-if="currentPlace.website">
          <a :href="currentPlace.website" target="_blank">
            홈페이지 바로가기
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: 'GoogleMap',
  layout: 'mapLayout',
  data() {
    return {
      map: null,
      places: null,
      infoWindow: null,
      value: '',
      markers: [],
      autocomplete: null,
      countries: {
        au: {
          center: { lat: -25.3, lng: 133.8 },
          zoom: 4,
        },
        br: {
          center: { lat: -14.2, lng: -51.9 },
          zoom: 3,
        },
        ca: {
          center: { lat: 62, lng: -110.0 },
          zoom: 3,
        },
        fr: {
          center: { lat: 46.2, lng: 2.2 },
          zoom: 5,
        },
        de: {
          center: { lat: 51.2, lng: 10.4 },
          zoom: 5,
        },
        mx: {
          center: { lat: 23.6, lng: -102.5 },
          zoom: 4,
        },
        nz: {
          center: { lat: -40.9, lng: 174.9 },
          zoom: 5,
        },
        it: {
          center: { lat: 41.9, lng: 12.6 },
          zoom: 5,
        },
        za: {
          center: { lat: -30.6, lng: 22.9 },
          zoom: 5,
        },
        es: {
          center: { lat: 40.5, lng: -3.7 },
          zoom: 5,
        },
        pt: {
          center: { lat: 39.4, lng: -8.2 },
          zoom: 6,
        },
        us: {
          center: { lat: 37.1, lng: -95.7 },
          zoom: 3,
        },
        uk: {
          center: { lat: 54.8, lng: -4.6 },
          zoom: 5,
        },
        kr: {
          center: { lat: 37.5642135, lng: 127.0016985 },
          zoom: 16,
        },
      },
      options: ['kr', 'us'],
      selection: '',
      placeholder: '검색어를 입력해주세요.',
      results: null,
      currentPlace: null,
      keyword: '',
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      this.map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: this.countries.kr.zoom,
        center: this.countries.kr.center,
        mapTypeControl: true,
        panControl: true,
        zoomControl: true,
        streetViewControl: true,
      })

      this.places = new window.google.maps.places.PlacesService(this.map)
      this.infoWindow = new window.google.maps.InfoWindow({
        content: document.getElementById('info-content'),
      })
      this.autoComplete()
    },
    autoComplete() {
      const input = document.getElementById('autocomplete')
      const options = {
        // types: ['bakery', 'park', 'restaurant'],
        // types: ['(cities)'], // 반환 될 유형
        // componentRestrictions: { country: 'kr' }, // 제한 사항
      }
      this.autocomplete = new window.google.maps.places.Autocomplete(
        input,
        options,
      )
      this.autocomplete.addListener('place_changed', this.changedPlace)
    },
    changedPlace() {
      const place = this.autocomplete.getPlace()
      if (place.geometry && place.geometry.location) {
        this.map.panTo(place.geometry.location)
        this.map.setZoom(15)
        console.log('### place:', place)
        this.reset()
        // const markerLetter = String.fromCharCode(
        //     'A'.charCodeAt(0) + (idx % 26),
        //   )
        // const MARKER_PATH =
        //   'https://developers.google.com/maps/documentation/javascript/images/marker_green'
        // const icon = MARKER_PATH + markerLetter + '.png'
        const marker = new window.google.maps.Marker({
          position: place.geometry.location,
          animation: window.google.maps.Animation.DROP,
          icon: place.icon,
        })
        console.log('### marker:', marker)

        this.markers.push(marker)
        this.markers[0].placeResult = place

        window.google.maps.event.addListener(this.markers[0], 'click', () =>
          this.showInfoWindow(this.markers[0]),
        )
        //   console.log('### this.markers:', this.markers)

        setTimeout(this.markers[0].setMap(this.map), 0 * 100)
      } else {
        this.placeholder = '검색어를 입력해주세요.'
      }
    },
    searchQuery() {
      const options = {
        query: this.keyword,
        fields: ['name', 'geometry', 'place_id'],
      }

      this.places.findPlaceFromQuery(options, (results, status) => {
        if (status !== 'OK') return

        this.reset()
        this.results = results
        results.forEach((result, idx) => {
          console.log('### result: ', result)
          const markerLetter = String.fromCharCode(
            'A'.charCodeAt(0) + (idx % 26),
          )
          const MARKER_PATH =
            'https://developers.google.com/maps/documentation/javascript/images/marker_green'
          const icon = MARKER_PATH + markerLetter + '.png'
          const marker = new window.google.maps.Marker({
            position: results[idx].geometry.location,
            animation: window.google.maps.Animation.DROP,
            icon,
          })

          this.markers.push(marker)
          // this.markers[idx].placeResult = results[idx]

          window.google.maps.event.addListener(this.markers[idx], 'click', () =>
            this.showInfoWindow(this.markers[0]),
          )
          console.log('### this.markers:', this.markers)

          setTimeout(this.markers[idx].setMap(this.map), idx * 100)
        })
      })
    },
    search() {
      // const search = {
      //   bounds: this.map.getBounds(),
      //   // types: ['library'],
      //   // fields: ['opening_hours', 'utc_offset_minutes'],
      // }
      // const MARKER_PATH =
      //   'https://developers.google.com/maps/documentation/javascript/images/marker_green'

      const options = {
        query: this.keyword,
        fields: ['name', 'geometry'],
      }
      console.log('### options:', options)

      this.places.findPlaceFromQuery(options, (results, status) => {
        console.log('### results:', results)
        console.log('### status:', status)
      })
      // this.places.nearbySearch(search, (results, status, pagination) => {
      //   if (
      //     status === window.google.maps.places.PlacesServiceStatus.OK &&
      //     results
      //   ) {
      //     this.reset()
      //     this.results = results
      //     results.forEach((result, idx) => {
      //       console.log('### result: ', result)
      //       const markerLetter = String.fromCharCode(
      //         'A'.charCodeAt(0) + (idx % 26),
      //       )
      //       const icon = MARKER_PATH + markerLetter + '.png'
      //       const marker = new window.google.maps.Marker({
      //         position: results[idx].geometry.location,
      //         animation: window.google.maps.Animation.DROP,
      //         icon,
      //       })

      //       this.markers.push(marker)
      //       this.markers[idx].placeResult = results[idx]

      //       window.google.maps.event.addListener(
      //         this.markers[idx],
      //         'click',
      //         () => this.showInfoWindow(this.markers[idx]),
      //       )
      //       setTimeout(this.markers[idx].setMap(this.map), idx * 100)
      //     })
      //   }
      // })
    },
    reset() {
      // clear results
      this.results = null
      // clear markers
      this.markers.forEach(marker => {
        marker.setMap(null)
        this.markers = []
      })
    },
    showInfoWindow(marker) {
      const options = {
        placeId: marker.placeResult.place_id,
        // fields: ['opening_hours', 'utc_offset_minutes'],
      }

      this.places.getDetails(options, (place, status) => {
        if (status !== 'OK') return
        console.log('### place: ', place)
        this.currentPlace = place
        this.infoWindow.open({
          anchor: marker,
          map: this.map,
          shouldFocus: false,
        })
      })
    },

    setCountry() {
      if (this.selection === 'all') {
        this.autocomplete.setComponentRestrictions({ country: [] })
        this.map.setCenter({ lat: 15, lng: 0 })
        this.map.setZoom(2)
      } else {
        this.autocomplete.setComponentRestrictions({ country: this.selection })
        this.map.setCenter(this.countries[this.selection].center)
        this.map.setZoom(this.countries[this.selection].zoom)
      }
      this.reset()
    },
  },
}
</script>

<style lang="scss" scoped>
.map-content {
  width: 100%;
  height: 100%;
}
</style>
