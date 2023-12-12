import {createElement} from '../render.js';

function createTripInfoContent() {
  return `<div class="trip-info__main">
            <h1 class="trip-info__title">Amsterdam — Chamonix — Geneva</h1>
            <p class="trip-info__dates">18&nbsp;—&nbsp;20 Mar</p>
          </div>`;
}

export default class TripInfoContent {
  getTemplate () {
    return createTripInfoContent();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
