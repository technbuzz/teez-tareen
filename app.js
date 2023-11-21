import { Currently } from "./components/currently.js";
import { Start } from "./components/start.js";
import { router } from "./services/Router.js";
import store from "./services/Store.js";

window.app = {}
window.app.router = router
window.app.store = store

document.addEventListener('DOMContentLoaded', () => {
  const map = L.map('map').setView([51.505, -0.09], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  window.app.map = map;

  router.goTo('/')

})

// Load our component
// (function() {
// })()
