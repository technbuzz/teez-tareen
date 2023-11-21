
export class Summary extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    const template = document.getElementById('session-summary')
    const content = template.content.cloneNode(true)
    this.appendChild(content)


    const { startTime, endTime, locations } = window.app.store.session
    this.querySelector('span.totaltime').textContent = (endTime - startTime) / 1000
    const close = this.querySelector('button.close')
    close.addEventListener('click', event => {
      // goto /
      window.app.router.goTo('/')
    })
  }

  disconnectedCallback() {
    console.log('summary removed')
    
  }

}

customElements.define('app-summary', Summary)
