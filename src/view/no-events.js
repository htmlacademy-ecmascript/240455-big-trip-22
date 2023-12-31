import AbstractView from '../framework/view/abstract-view.js';

function createNoEvents() {
  return '<p class="trip-events__msg">Click New Event to create your first point</p>';
}

export default class NoEvents extends AbstractView {
  get template () {
    return createNoEvents();
  }
}
