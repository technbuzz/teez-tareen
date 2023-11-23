export class Start extends HTMLElement {
  startEl= null
  stopEl = null
  watchId = null
  constructor() {
    super()
  }

  connectedCallback() {
    const template = document.getElementById('ignition')
    const content = template.content.cloneNode(true)
    this.appendChild(content)

    this.startEl = this.querySelector("button.start");
    this.stopEl = this.querySelector("button.stop");

    this.startEl.addEventListener("click", event => {
      console.log('started locating')
      window.dispatchEvent(new CustomEvent('appstartedtracking'))
      window.app.store.session.startTime = new Date()
      this.watchId = navigator.geolocation.watchPosition((e) => {
        window.dispatchEvent(new CustomEvent('apppostionchange', { detail: e }))
        console.log(e)
      }, (e) => {
        console.error(e)
      }, { enableHighAccuracy: true, })
      // window.app.map.locate({ watch: true, setView: true, maxZoom: 16, enableHighAccuracy: false })

      this.toggleControls()
    })

    this.stopEl.addEventListener("click", event => {
      console.log('stopped locating')
      // window.app.map.stopLocate()
      navigator.geolocation.clearWatch(this.watchId)
      window.app.store.session.endTime = new Date()
      window.dispatchEvent(new CustomEvent('appstoppedtracking'))
      window.app.router.goTo('/summary')
      this.toggleControls()
    })
  }

  toggleControls() {
      this.startEl.hidden = !this.startEl.hidden
      this.stopEl.hidden = !this.stopEl.hidden
  }
}

customElements.define('app-start', Start)
