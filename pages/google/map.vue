<template>
  <section>
    <div class="hospital-search">
      <div id="findhospital">Find hospital in:</div>

      <div id="locationField">
        <input id="autocomplete" placeholder="Enter a city" type="text" />
      </div>

      <div id="controls">
        <atoms-base-select
          id="country"
          v-model="selection"
          :options="options"
          :default-value="options[0]"
          @change="setAutocompleteCountry"
        />
      </div>
    </div>

    <div id="map" :style="{ width: '100%', height: '60vh' }"></div>

    <div id="listing">
      <table id="resultsTable">
        <tbody id="results"></tbody>
      </table>
    </div>

    <div style="display: none">
      <div id="info-content">
        <table>
          <tr id="iw-url-row" class="iw_table_row">
            <td id="iw-icon" class="iw_table_icon"></td>
            <td id="iw-url"></td>
          </tr>
          <tr id="iw-address-row" class="iw_table_row">
            <td class="iw_attribute_name">Address:</td>
            <td id="iw-address"></td>
          </tr>
          <tr id="iw-phone-row" class="iw_table_row">
            <td class="iw_attribute_name">Telephone:</td>
            <td id="iw-phone"></td>
          </tr>
          <tr id="iw-rating-row" class="iw_table_row">
            <td class="iw_attribute_name">Rating:</td>
            <td id="iw-rating"></td>
          </tr>
          <tr id="iw-website-row" class="iw_table_row">
            <td class="iw_attribute_name">Website:</td>
            <td id="iw-website"></td>
          </tr>
        </table>
      </div>
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
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      const countryRestrict = { country: 'kr' }

      this.map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: this.countries.kr.zoom,
        center: this.countries.kr.center,
        mapTypeControl: true,
        panControl: true,
        zoomControl: true,
        streetViewControl: true,
      })

      this.infoWindow = new window.google.maps.InfoWindow({
        content: document.getElementById('info-content'),
      })
      this.autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById('autocomplete'),
        {
          types: ['(cities)'],
          componentRestrictions: countryRestrict,
        },
      )
      this.places = new window.google.maps.places.PlacesService(this.map)
      this.autocomplete.addListener('place_changed', this.onPlaceChanged)
    },
    setAutocompleteCountry() {
      if (this.selection === 'all') {
        this.autocomplete.setComponentRestrictions({ country: [] })
        this.map.setCenter({ lat: 15, lng: 0 })
        this.map.setZoom(2)
      } else {
        this.autocomplete.setComponentRestrictions({ country: this.selection })
        this.map.setCenter(this.countries[this.selection].center)
        this.map.setZoom(this.countries[this.selection].zoom)
      }
      this.clearResults()
      this.clearMarkers()
    },

    onPlaceChanged() {
      const place = this.autocomplete.getPlace()

      if (place.geometry && place.geometry.location) {
        this.map.panTo(place.geometry.location)
        this.map.setZoom(15)
        this.search()
      } else {
        document.getElementById('autocomplete').placeholder = 'Enter a city'
      }
    },
    clearMarkers() {
      for (let i = 0; i < this.markers.length; i++) {
        if (this.markers[i]) {
          this.markers[i].setMap(null)
        }
      }
      this.markers = []
    },
    dropMarker(i) {
      this.markers[i].setMap(this.map)
    },
    addResult(result, i) {
      const MARKER_PATH =
        'https://developers.google.com/maps/documentation/javascript/images/marker_green'
      const results = document.getElementById('results')
      const markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26))
      const markerIcon = MARKER_PATH + markerLetter + '.png'
      const tr = document.createElement('tr')
      const { markers } = this
      tr.style.backgroundColor = i % 2 === 0 ? '#F0F0F0' : '#FFFFFF'

      tr.onclick = function () {
        window.google.maps.event.trigger(markers[i], 'click')
      }

      const iconTd = document.createElement('td')
      const nameTd = document.createElement('td')
      const icon = document.createElement('img')
      icon.src = markerIcon
      icon.setAttribute('class', 'placeIcon')
      icon.setAttribute('className', 'placeIcon')
      const name = document.createTextNode(result.name)
      iconTd.appendChild(icon)
      nameTd.appendChild(name)
      tr.appendChild(iconTd)
      tr.appendChild(nameTd)
      results.appendChild(tr)
    },
    clearResults() {
      const results = document.getElementById('results')

      while (results.childNodes[0]) {
        results.removeChild(results.childNodes[0])
      }
    },
    showInfoWindow(marker) {
      this.places.getDetails(
        { placeId: marker.placeResult.place_id },
        (place, status) => {
          if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
            return
          }
          this.infoWindow.open(this.map, marker)
          this.buildIWContent(place)
        },
      )
    },
    buildIWContent(place) {
      document.getElementById('iw-icon').innerHTML =
        '<img class="hospitalIcon" ' + 'src="' + place.icon + '"/>'
      document.getElementById('iw-url').innerHTML =
        '<b><a href="' + place.url + '">' + place.name + '</a></b>'
      document.getElementById('iw-address').textContent = place.vicinity

      if (place.formatted_phone_number) {
        document.getElementById('iw-phone-row').style.display = ''
        document.getElementById('iw-phone').textContent =
          place.formatted_phone_number
      } else {
        document.getElementById('iw-phone-row').style.display = 'none'
      }

      if (place.rating) {
        let ratingHtml = ''

        for (let i = 0; i < 5; i++) {
          if (place.rating < i + 0.5) {
            ratingHtml += '&#10025;'
          } else {
            ratingHtml += '&#10029;'
          }
          document.getElementById('iw-rating-row').style.display = ''
          document.getElementById('iw-rating').innerHTML = ratingHtml
        }
      } else {
        document.getElementById('iw-rating-row').style.display = 'none'
      }

      if (place.website) {
        const hostnameRegexp = new RegExp('^https?://.+?/')

        let fullUrl = place.website
        let website = String(hostnameRegexp.exec(place.website))

        if (!website) {
          website = 'http://' + place.website + '/'
          fullUrl = website

          console.log('### fullUrl: ', fullUrl)
        }
        document.getElementById('iw-website-row').style.display = ''
        document.getElementById('iw-website').textContent = website
      } else {
        document.getElementById('iw-website-row').style.display = 'none'
      }
    },
    search() {
      const search = {
        bounds: this.map.getBounds(),
        types: ['veterinary_care'],
      }
      const { maps } = window.google
      const MARKER_PATH =
        'https://developers.google.com/maps/documentation/javascript/images/marker_green'

      this.places.nearbySearch(search, (results, status, pagination) => {
        if (status === maps.places.PlacesServiceStatus.OK && results) {
          this.clearResults()
          this.clearMarkers()

          for (let i = 0; i < results.length; i++) {
            const markerLetter = String.fromCharCode(
              'A'.charCodeAt(0) + (i % 26),
            )
            const markerIcon = MARKER_PATH + markerLetter + '.png'

            this.markers[i] = new maps.Marker({
              position: results[i].geometry.location,
              animation: maps.Animation.DROP,
              icon: markerIcon,
            })

            this.markers[i].placeResult = results[i]
            maps.event.addListener(
              this.markers[i],
              'click',
              this.showInfoWindow(this.markers[i]),
            )
            setTimeout(this.dropMarker(i), i * 100)
            this.addResult(results[i], i)
          }
        }
      })
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
