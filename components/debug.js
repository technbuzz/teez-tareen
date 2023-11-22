export class Debug extends HTMLElement {
  static observedAttributes = ['text']

  el

  constructor() {
    super()
    this.el = document.createElement('article')
    this.el.popover = 'manual';
    this.el.classList.add('toast')
    this.el.classList.add('newest')
  }

  connectedCallback() {
    
    this.appendChild(this.el);
    this.el.showPopover()

    setTimeout(() => {
      // this.el.hidePopover()
      // this.el.remove()
      this.remove()
    }, 3000);
  }

  // update the property
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'text') {
      this.el.textContent = newValue
    }
  }

  disconnectedCallback() {
    console.log('debug removed')
  }

}

customElements.define('app-debug', Debug)
