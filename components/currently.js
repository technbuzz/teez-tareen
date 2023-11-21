export class Currently extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    const marker = L.marker([51.5, -0.09]).addTo(window.app.map) 
    window.app.map.addLayer(marker)
    window.app.map.on('locationfound', (e) => {
      marker.setLatLng(e.target.getCenter())
    })
  }
  
}

customElements.define('app-currently', Currently)
