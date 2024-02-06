import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { ucFirst } from '../utils/common.js';
import { humanizeDate, DATE_FORMAT_FIRST } from '../utils/event.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

function createTypesList(types, type) {

  return types.map((typesItem) => `
          <div class="event__type-item">
            <input id="event-type-${typesItem}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typesItem}"${typesItem === type ? ' checked' : ''}>
            <label data-type="${typesItem}" class="event__type-label  event__type-label--${typesItem}" for="event-type-${typesItem}-1">${ucFirst(typesItem)}</label>
          </div>`).join('');
}

function createOffersTemplate(offersByType, pointsOffers) {
  return offersByType.length > 0 ?
    `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
        ${offersByType.map((offer) =>
    `<div class="event__offer-selector">
      <input data-event-offer-id="${offer.id}" class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}-1" type="checkbox" name="event-offer-${offer.id}"${pointsOffers.includes(offer.id) ? ' checked' : ''}>
      <label class="event__offer-label" for="event-offer-${offer.id}-1">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`).join('')}
      </div>
    </section>` : '';
}

function createDestinationsList(destinationsList, destinationName) {
  return `<input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationName !== undefined && destinationName !== '' ? destinationName : ''}" list="destination-list-1">
    <datalist id="destination-list-1">
    ${destinationsList.map((destination) =>
    `<option value="${destination.name}">${destination.name}</option>`).join('')}
    </datalist>`;
}

function createDestinationTemplate({ name, description, pictures }) {
  const photosTemplate = createPhotosTemplate(pictures);

  return `<section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${name}. ${description}</p>
            ${photosTemplate}
          </section>`;
}

function createPhotosTemplate(pictures) {
  return pictures.length > 0 ?
    `<div class="event__photos-container">
      <div class="event__photos-tape">
        ${pictures.map((photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`).join('')}
      </div>
    </div>` : '';
}

function createEditableEvent(point, offersByType, destinationsAll, destinationById) {

  const { id, type, dateFrom, dateTo, price } = point;
  const { name, description, pictures } = typeof destinationById !== 'undefined' && destinationById !== '' ? destinationById : '';
  const destinationTemplate = typeof destinationById !== 'undefined' && destinationById !== '' ? (createDestinationTemplate({ name, description, pictures })) : '';
  const destinationsListTemplate = createDestinationsList(destinationsAll, name);

  const dateFromHumanized = humanizeDate(dateFrom, DATE_FORMAT_FIRST);
  const dateToHumanized = humanizeDate(dateTo, DATE_FORMAT_FIRST);
  const TYPES = point.offersAll.map((offer) => offer.type).join(' ').split(' ');
  const typesList = createTypesList(TYPES, type);
  const offersTemplate = createOffersTemplate(offersByType, point.offers);

  const isSubmitDisabled = typeof name === 'undefined';

  const eventRollupBtn = point.id ? '<button class="event__rollup-btn" type="button"><span class="visually-hidden">Open event</span></button>' : '';

  return `<li class="trip-events__item">
            <form class="event event--edit" action="#" method="post">
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
                  ${destinationsListTemplate}
                </div>

                <div class="event__field-group  event__field-group--time">
                  <label class="visually-hidden" for="event-start-time-1">From</label>
                  <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFromHumanized}" required>
                  &mdash;
                  <label class="visually-hidden" for="event-end-time-1">To</label>
                  <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateToHumanized}" required>
                </div>

                <div class="event__field-group  event__field-group--price">
                  <label class="event__label" for="event-price-1">
                    <span class="visually-hidden">Price</span>
                    &euro; ${price}
                  </label>
                  <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="">
                </div>

                <button class="event__save-btn  btn  btn--blue" type="submit"${isSubmitDisabled ? ' disabled' : ''}>Save</button>
                <button class="event__reset-btn" type="reset">${point.id ? 'Delete' : 'Cancel'}</button>
                ${eventRollupBtn}
              </header>
              <section class="event__details">
                ${offersTemplate}
                ${destinationTemplate}
              </section>
            </form>
          </li>`;
}

export default class EditableEvent extends AbstractStatefulView {
  #handleClick = null;
  #handleFormSubmit = null;
  #handleDeleteClick = null;
  #datepicker = null;

  constructor ({point, onFormSubmit, onDeleteClick, onClick}) {
    super();
    this._setState(EditableEvent.parsePointToState(point));
    this.#handleClick = onClick;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;

    this._restoreHandlers();
  }

  get template () {
    return createEditableEvent(this._state, this._state.offersByType, this._state.destinationsAll, this._state.destinationById);
  }

  // Перегружаем метод родителя removeElement,
  // чтобы при удалении удалялся более не нужный календарь
  removeElement() {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  }

  reset(point) {
    this._setState(EditableEvent.parsePointToState(point));
    this.updateElement(this._setState);
  }

  #dateChangeHandlerFrom = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dateChangeHandlerTo = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  _restoreHandlers() {
    if (this._state.id) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
    }
    this.element.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelectorAll('.event__type-label').forEach((element) => {
      element.addEventListener('click', this.#eventTypeClickHandler);
    });
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelectorAll('.event__offer-checkbox').forEach((element) => {
      element.addEventListener('change', this.#eventOfferChangeHandler);
    });
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);

    this.#setDatepickerFrom();
    this.#setDatepickerTo();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditableEvent.parseStateToPoint(this._state));
  };

  #eventTypeClickHandler = (evt) => {
    evt.preventDefault();
    const type = evt.target.dataset.type;
    const offersByType = this._state.offersAll.find((offer) => offer.type === type);

    this.updateElement({
      type: type,
      offersByType: offersByType.offers,
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();

    const destinationOriginal = this._state.destinationById;
    const destination = this._state.destinationsAll.find((item) => item.name === evt.target.value);

    if (destination === undefined) {
      evt.target.value = destinationOriginal.name || '';
    } else {
      this.updateElement({
        destination: destination.id,
        destinationById: destination,
      });
    }
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();

    const priceOriginal = this._state.price;
    const price = Math.round(evt.target.value);

    if (price === undefined) {
      evt.target.value = priceOriginal;
    } else {
      this.updateElement({
        price: price,
      });
    }
  };

  #eventOfferChangeHandler = (evt) => {
    evt.preventDefault();

    const id = (parseInt(evt.target.dataset.eventOfferId, 10));

    if (!this._state.offers.includes(id)) {
      this.updateElement({
        offers: [...this._state.offers, id],
      });
    } else {
      this.updateElement({
        offers: [...this._state.offers.filter((offersId) => offersId !== id)],
      });
    }
  };

  #setDatepickerFrom() {
    this.#datepicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateFrom,
        enableTime: true,
        'time_24hr': true,
        onChange: this.#dateChangeHandlerFrom, // На событие flatpickr передаём наш колбэк
      },
    );
  }

  #setDatepickerTo() {
    this.#datepicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateTo,
        enableTime: true,
        'time_24hr': true,
        minDate: this._state.dateFrom,
        onChange: this.#dateChangeHandlerTo, // На событие flatpickr передаём наш колбэк
      },
    );
  }

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditableEvent.parseStateToPoint(this._state));
  };

  static parsePointToState(point) {
    return {...point };
  }

  static parseStateToPoint(state) {
    const point = {...state};
    return point;
  }
}
