import AbstractView from '../framework/view/abstract-view.js';

function createEventsList() {
  return '<ul class="trip-events__list"></ul>';
}

export default class EventsList extends AbstractView {
  get template() {
    return createEventsList();
  }
}
