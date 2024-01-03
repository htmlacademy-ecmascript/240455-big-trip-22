import AbstractView from '../framework/view/abstract-view.js';

function createEventListItem() {
  return '<li class="trip-events__item"></li>';
}

export default class EventsListItem extends AbstractView {
  get template () {
    return createEventListItem();
  }
}
