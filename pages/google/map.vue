<template>
  <section>
    <molecules-text-field
      id="autocomplete"
      v-model="keyword"
      :placeholder="placeholder"
      size="100"
    />
    <div id="map" :style="{ width: '100%', height: '96vh' }"></div>

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
import markerIcon from '@/assets/images/common/icon__location-marker.png'
export default {
  name: 'GoogleMap',
  layout: 'mapLayout',
  data() {
    return {
      map: null,
      places: null,
      infoWindow: null,
      currentPlace: null,
      marker: null,
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
      placeholder: '검색어를 입력해주세요.',
      keyword: '',
      latitude: '',
      longitude: '',
    }
  },

  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.locationSuccess,
        this.locationError,
        {
          enableHighAccuracy: true,
          maximumAge: 30000,
          timeout: 27000,
        },
      )
    } else {
      console.log('지오 로케이션 없음')
    }
  },
  methods: {
    locationSuccess(p) {
      this.latitude = p.coords.latitude
      this.longitude = p.coords.longitude
      console.log('### 1:', this.latitude, this.longitude)
      this.initMap()
    },

    locationError(error) {
      const errorTypes = {
        0: '무슨 에러냥~',
        1: '허용 안눌렀음',
        2: '위치가 안잡힘',
        3: '응답시간 지남',
      }
      const errorMsg = errorTypes[error.code]
      console.log('### errorMsg:', errorMsg)
    },

    initMap() {
      const myLatLng = new window.google.maps.LatLng(
        this.latitude,
        this.longitude,
      )

      console.log('### 2:', this.latitude, this.longitude)

      this.map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: this.countries.kr.zoom,
        // center: this.countries.kr.center,
        center: myLatLng,
        mapTypeControl: true,
        panControl: true,
        zoomControl: true,
        streetViewControl: true,
      })

      this.places = new window.google.maps.places.PlacesService(this.map)
      this.infoWindow = new window.google.maps.InfoWindow({
        content: document.getElementById('info-content'),
      })
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

        this.marker = new window.google.maps.Marker({
          position: place.geometry.location,
          animation: window.google.maps.Animation.DROP,
          icon: markerIcon,
        })
        this.marker.placeResult = place
        this.currentPlace = place

        window.google.maps.event.addListener(
          this.marker,
          'click',
          this.showInfoWindow,
        )

        setTimeout(this.marker.setMap(this.map), 0 * 100)
      } else {
        this.placeholder = '검색어를 입력해주세요.'
      }
    },
    reset() {
      if (this.marker) {
        this.marker.setMap(null)
        this.marker = null
      }
    },
    showInfoWindow() {
      this.infoWindow.open({
        anchor: this.marker,
        map: this.map,
        shouldFocus: false,
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
