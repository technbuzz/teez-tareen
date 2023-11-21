export class Start extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    const template = document.getElementById('ignition')
    const content = template.content.cloneNode(true)
    this.appendChild(content)

    this.querySelector("button.start").addEventListener("click", event => {
      event.preventDefault()
      console.log('started locating')
      window.app.store.session.startTime = new Date()
      window.app.map.locate({ watch: true, setView: true, maxZoom: 16 })

      this.querySelector("button.start").hidden = true
      this.querySelector("button.stop").hidden = false
    })

    this.querySelector("button.stop").addEventListener("click", event => {
      event.preventDefault()
      console.log('stopped locating')
      window.app.map.stopLocate()
      window.app.store.session.endTime = new Date()

      this.querySelector("button.start").hidden = false
      this.querySelector("button.stop").hidden = true
    })
  }
}

customElements.define('app-start', Start)
