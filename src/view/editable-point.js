import AbstractView from '../framework/view/abstract-view.js';
import { ucFirst } from '../utils/common.js';
import { humanizeDate, DATE_FORMAT_FIRST } from '../utils/event.js';
import { TYPES } from '../mock/const.js';

const BLANK_POINT = {
  id: 1,
  type: 'Flight',
  offers: [],
  destination: '',
  dateFrom: '',
  dateTo: '',
  price: 0,
};

function createTypesList(types, type) {
  return types.map((element) => `
          <div class="event__type-item">
            <input id="event-type-${element}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${element}"${element === type ? ' checked' : ''}>
            <label class="event__type-label  event__type-label--${element}" for="event-type-${element}-1">${ucFirst(element)}</label>
          </div>`).join('');
}

function createOffersTemplate(offers, pointsOffers) {
  return offers.length > 0 ?
    `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
        ${offers.map((offer) =>
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}-1" type="checkbox" name="event-offer-${offer.id}"${pointsOffers.includes(offer.id) ? ' checked' : ''}>
      <label class="event__offer-label" for="event-offer-${offer.id}-1">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`).join('')}
      </div>
    </section>` : '';
}

function createDestinationTemplate({ name, description, photos }) {
  const photosTemplate = createPhotosTemplate(photos);

  return `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${name}. ${description}</p>
    ${photosTemplate}
  </section>`;
}

function createPhotosTemplate(photos) {
  return photos.length > 0 ?
    `<div class="event__photos-container">
      <div class="event__photos-tape">
        ${photos.map((photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`).join('')}
      </div>
    </div>` : '';
}

function createEditablePoint(point, offers, destination) {
  const { id, type, dateFrom, dateTo, price } = point;
  const { name, description, photos } = typeof destination !== 'undefined' ? destination : '';
  const destinationName = typeof name !== 'undefined' ? name : '';
  const dateFromHumanized = humanizeDate(dateFrom, DATE_FORMAT_FIRST);
  const dateToHumanized = humanizeDate(dateTo, DATE_FORMAT_FIRST);
  const typesList = createTypesList(TYPES, type);
  const offersTemplate = createOffersTemplate(offers, point.offers);
  const destinationTemplate = typeof destination !== 'undefined' ? (createDestinationTemplate({ name, description, photos })) : '';

  return `<form class="event event--edit" action="#" method="post">
            <header class="event__header">
              <div class="event__type-wrapper">
                <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
                  <span class="visually-hidden">Choose event type</span>
                  <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="${type}">
                </label>
                <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

                <div class="event__type-list">
                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Event type</legend>
                    ${typesList}
                  </fieldset>
                </div>
              </div>

              <div class="event__field-group  event__field-group--destination">
                <label class="event__label  event__type-output" for="event-destination-1">
                  ${type}
                </label>
                <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationName}" list="destination-list-1">
                <datalist id="destination-list-1">
                  <option value="${destinationName}"></option>
                </datalist>
              </div>

              <div class="event__field-group  event__field-group--time">
                <label class="visually-hidden" for="event-start-time-1">From</label>
                <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFromHumanized}">
                &mdash;
                <label class="visually-hidden" for="event-end-time-1">To</label>
                <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateToHumanized}">
              </div>

              <div class="event__field-group  event__field-group--price">
                <label class="event__label" for="event-price-1">
                  <span class="visually-hidden">Price</span>
                  &euro; ${price}
                </label>
                <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
              </div>

              <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
              <button class="event__reset-btn" type="reset">Delete</button>
              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
            </header>
            <section class="event__details">
              ${offersTemplate}
              ${destinationTemplate}
            </section>
          </form>`;
}

export default class EditablePoint extends AbstractView {
  #point;
  #offers;
  #destination;
  #handleClick = null;
  #handleFormSubmit = null;

  constructor ({onClick, onFormSubmit, point = BLANK_POINT, offers, destination}) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destination = destination;
    this.#handleClick = onClick;
    this.#handleFormSubmit = onFormSubmit;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
    this.element.addEventListener('submit', this.#formSubmitHandler);
  }

  get template () {
    return createEditablePoint(this.#point, this.#offers, this.#destination);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(this.#point);
  };
}
