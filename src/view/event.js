import AbstractView from '../framework/view/abstract-view.js';
import { ucFirst } from '../utils/common.js';
import { humanizeDate, DATE_FORMAT_SECOND, DATE_FORMAT_THIRD, DATE_FORMAT_FOURTH, TIME_FORMAT, getEventDuration } from '../utils/event.js';

function createOffersTemplate(offers) {
  return offers.length > 0 ?
    `<h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
    ${offers.map((offer) =>
    `<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>`).join('')}
    </ul>` : '';
}

function createEvent(point, offers, destination) {
  const { type, dateFrom, dateTo, price, isFavorite } = point;
  const { name } = destination;
  const dateFromHumanized = humanizeDate(dateFrom, DATE_FORMAT_THIRD);
  const dateFromHumanizedAttr = humanizeDate(dateFrom, DATE_FORMAT_SECOND);
  const timeFromHumanized = humanizeDate(dateFrom, TIME_FORMAT);
  const timeToHumanized = humanizeDate(dateTo, TIME_FORMAT);
  const timeFromHumanizedAttr = humanizeDate(dateFrom, DATE_FORMAT_FOURTH);
  const timeToHumanizedAttr = humanizeDate(dateTo, DATE_FORMAT_FOURTH);
  const duration = getEventDuration(dateTo, dateFrom);
  const favorite = isFavorite ? ' event__favorite-btn--active' : '';
  const pointOffers = offers.filter((offer) => point.offers.includes(offer.id));
  const offersTemplate = createOffersTemplate(pointOffers);

  return `<li class="trip-events__item">
            <div class="event">
              <time class="event__date" datetime="${dateFromHumanizedAttr}">${dateFromHumanized}</time>
              <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="${type}">
              </div>
              <h3 class="event__title">${ucFirst(type)} ${name}</h3>
              <div class="event__schedule">
                <p class="event__time">
                  <time class="event__start-time" datetime="${timeFromHumanizedAttr}">${timeFromHumanized}</time>
                  &mdash;
                  <time class="event__end-time" datetime="${timeToHumanizedAttr}">${timeToHumanized}</time>
                </p>
                <p class="event__duration">${duration}M</p>
              </div>
              <p class="event__price">
                &euro;&nbsp;<span class="event__price-value">${price}</span>
              </p>
              ${offersTemplate}
              <button class="event__favorite-btn${favorite}" type="button">
                <span class="visually-hidden">Add to favorite</span>
                <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                  <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                </svg>
              </button>
              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
            </div>
          </li>`;
}

export default class Event extends AbstractView {
  #point;
  #offers;
  #destination;
  #handleClick = null;
  #handleFavoriteClick = null;

  constructor ({onClick, point, offers, destination, onFavoriteClick}) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destination = destination;
    this.#handleClick = onClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  get template () {
    return createEvent(this.#point, this.#offers, this.#destination);
  }

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
