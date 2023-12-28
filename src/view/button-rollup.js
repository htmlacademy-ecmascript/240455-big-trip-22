import AbstractView from '../framework/view/abstract-view.js';

function createButtonRollUp() {
  return `<button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>`;
}

export default class ButtonRollUp extends AbstractView {
  #handleClick = null;
  #form = null;
  #event = null;

  constructor ({onClick, form, event}) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#clickHandler);
    this.#form = form;
    this.#event = event;
  }

  get template () {
    return createButtonRollUp();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick(this.#form, this.#event);
  };
}
