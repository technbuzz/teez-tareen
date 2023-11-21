export const router = {
  goTo: (url) => {
    let page
    switch (url) {
      case '/':
        page = document.createElement('app-start')
        break;

      default:
        break;
    }

    const main = document.querySelector('main')
    main.appendChild(page)

  }
}
