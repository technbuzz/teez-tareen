export const router = {
  goTo: (url) => {
    const main = document.querySelector('main');
    const dialog = document.querySelector('app-summary');
    dialog && document.body.removeChild(dialog)
    main.innerHTML = '';
    let page;

    switch (url) {
      case '/':
        page = document.createElement('app-start')
        break;

      case '/summary':
        page = document.createElement('app-summary')
        document.body.appendChild(page)
        return;

      default:
        break;
    }

    main.appendChild(page)

  }
}
