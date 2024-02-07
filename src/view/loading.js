import AbstractView from '../framework/view/abstract-view.js';

function createNoPointTemplate() {
  return (
    `<p class="trip-events__msg">
      Loading...
    </p>`
  );
}

export default class Loading extends AbstractView {
  get template() {
    return createNoPointTemplate();
  }
}
