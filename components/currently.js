export class Currently extends HTMLElement {
  locations = []

  constructor() {
    super()

    window.addEventListener('appstoppedtracking', (e) => {
      console.log('app stopped tracking')
      this.locations = []
    })
  }

  connectedCallback() {
    const marker = L.marker([51.5, -0.09]).addTo(window.app.map) 
    const renderPolyline = this.initPolyline()
    window.app.map.addLayer(marker)
    window.app.map.on('locationfound', (e) => {
      const location = e.target.getCenter() 
      this.locations.push(location)
      marker.setLatLng(location)

      renderPolyline(this.locations)
      window.app.store.session.locations = this.locations
    })
  }

  initPolyline() {
    const group = L.featureGroup().addTo(window.app.map)
    return (locations) => {
      group.clearLayers()
      const polyline = L.polyline(locations, {color: 'red'}).addTo(group)
    }
      
  }
  
}

customElements.define('app-currently', Currently)
