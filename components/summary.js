
export class Summary extends HTMLElement {
  constructor() {
    super()

  }

  connectedCallback() {
    const template = document.getElementById('session-summary')
    const content = template.content.cloneNode(true)
    this.appendChild(content)

    const { startTime, endTime, latLngs  } = window.app.store.session
    const dialog = this.querySelector('dialog')
    this.querySelector('span.totaltime').textContent = this.calculateRelativeTime(startTime, endTime)
    this.querySelector('span.distance').textContent = this.calculateDistance(latLngs)
    dialog.showModal()
    const close = this.querySelector('button.close')
    close.addEventListener('click', event => {
      dialog.close()
      // goto /
      window.app.router.goTo('/')
    })
  }

  calculateRelativeTime(startTime, endTime) {
    const diff = endTime - startTime
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)

    return `${minutes} : ${seconds}`
  }

  calculateDistance(markers) {
    const start = markers[0]
    const end = markers[markers.length - 1]
    const result = start.distanceTo(end)
    return (result / 1000).toFixed(2)
  }

  disconnectedCallback() {
    console.log('summary removed')
  }

}

customElements.define('app-summary', Summary)
