import { Debug } from "./debug.js"

export class Currently extends HTMLElement {
  locations = []

  marker = L.marker([51.5, -0.09]).addTo(window.app.map)
  polyline = null
  constructor() {
    super()

    window.addEventListener('appstoppedtracking', (e) => {
      console.log('app stopped tracking')
      window.app.store.session.latLngs = this.polyline.getLatLngs()
      this.locations = []
    })
  }

  connectedCallback() {
    const renderPolyline = this.initPolyline()
    window.app.map.addLayer(this.marker)
    // window.app.map.on('locationfound', (e) => {
    window.addEventListener('apppostionchange', (e) => {
      // const location = e.target.getCenter() 
      // const location = e.latlng
      const { latitude: lat, longitude: lng } = e.detail.coords
      const location = [lat, lng]
      window.app.map.setView(location)
      this.locations.push(location)
      this.marker.setLatLng(location)

      if (this.supportsPopover()) {
        const debug = document.createElement('app-debug')
        debug.setAttribute('text', JSON.stringify(location))
        document.body.appendChild(debug)
      }


      renderPolyline(this.locations)
      window.app.store.session.locations = this.locations
    })
  }

  disconnectedCallback() {
    console.log('currently removed')
    window.app.map.removeLayer(this.marker)
  }

  initPolyline() {
    const group = L.featureGroup().addTo(window.app.map)
    return (locations) => {
      group.clearLayers()
      this.polyline = L.polyline(locations, { color: 'red' }).addTo(group)
    }

  }

  supportsPopover() {
    return HTMLElement.prototype.hasOwnProperty('popover')
  }

}

customElements.define('app-currently', Currently)
