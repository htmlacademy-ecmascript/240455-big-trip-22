import AbstractView from '../framework/view/abstract-view.js';

function createTripInfo() {
  return '<section class="trip-main__trip-info  trip-info"></section>';
}

export default class TripInfo extends AbstractView {
  get template () {
    return createTripInfo();
  }
}
