
export class Summary extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    const template = document.getElementById('session-summary')
    const content = template.content.cloneNode(true)
    this.appendChild(content)


    this.querySelector('span.starttime').textContent = window.app.store.session.startTime
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
