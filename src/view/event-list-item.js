import {createElement} from '../render.js';

function createEventListItem() {
  return '<li class="trip-events__item"></li>';
}

export default class EventItemList {
  getTemplate () {
    return createEventListItem();
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
