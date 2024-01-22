import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../mock/const.js';
import { ucFirst } from '../utils/common.js';

function createSorting(sorting) {
  return(
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${Object.values(sorting).map((sortName) =>
      `<div class="trip-sort__item  trip-sort__item--${sortName}" data-sort-type="${sortName}">
        <input id="sort-${sortName}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortName}" ${sortName === 'event' || sortName === 'offers' ? 'disabled' : ''}${sortName === 'day' ? ' checked' : ''}>
        <label class="trip-sort__btn" for="sort-${sortName}">${ucFirst(sortName)}</label>
      </div>`).join('')}
    </form>`);
}

export default class Sorting extends AbstractView {
  #handleSortTypeChange = null;

  constructor({onSortTypeChange}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSorting(SortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.className !== 'trip-sort__item') {
      return;
    }

    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
