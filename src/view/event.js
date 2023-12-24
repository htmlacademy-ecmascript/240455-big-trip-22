import AbstractView from '../framework/view/abstract-view.js';
import { humanizeDate, DATE_FORMAT_SECOND, DATE_FORMAT_THIRD, TIME_FORMAT, ucFirst } from '../utils.js';

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
  const favorite = isFavorite ? ' event__favorite-btn--active' : '';
  const pointOffers = offers.filter((offer) => point.offers.includes(offer.id));
  const offersTemplate = createOffersTemplate(pointOffers);

  return `<div class="event">
            <time class="event__date" datetime="${dateFromHumanizedAttr}">${dateFromHumanized}</time>
            <div class="event__type">
              <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="${type}">
            </div>
            <h3 class="event__title">${ucFirst(type)} ${name}</h3>
            <div class="event__schedule">
              <p class="event__time">
                <time class="event__start-time" datetime="2019-03-18T10:30">${timeFromHumanized}</time>
                &mdash;
                <time class="event__end-time" datetime="2019-03-18T11:00">${timeToHumanized}</time>
              </p>
              <p class="event__duration">30M</p>
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
          </div>`;
}

export default class Event extends AbstractView {
  #point;
  #offers;
  #destination;
  constructor ({point, offers, destination}) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destination = destination;
  }

  get template () {
    return createEvent(this.#point, this.#offers, this.#destination);
  }
}
