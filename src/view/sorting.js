import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';
import { ucFirst } from '../utils/common.js';

function createSorting(currentSortType, sorting) {
  return(
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${Object.values(sorting).map((sortName) =>
      `<div class="trip-sort__item  trip-sort__item--${sortName}">
        <input id="sort-${sortName}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortName}" ${sortName === 'event' || sortName === 'offers' ? 'disabled' : ''}${currentSortType === sortName ? ' checked' : ''}>
        <label data-sort-type="${sortName}" class="trip-sort__btn" for="sort-${sortName}">${ucFirst(sortName)}</label>
      </div>`).join('')}
    </form>`);
}

export default class Sorting extends AbstractView {
  #handleSortTypeChange = null;
  #currentSortType = null;

  constructor({currentSortType, onSortTypeChange}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.#currentSortType = currentSortType;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSorting(this.#currentSortType, SortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.className !== 'trip-sort__btn' || evt.target.dataset.sortType === 'event' || evt.target.dataset.sortType === 'offers') {
      return;
    }

    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
