import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { ucFirst } from '../utils/common.js';
import { humanizeDate, DATE_FORMAT_FIRST } from '../utils/event.js';
import { TYPES } from '../const.js';

const BLANK_POINT = {
  id: 1,
  type: 'Flight',
  offersIds: [],
  destinationId: '',
  dateFrom: '',
  dateTo: '',
  price: 0,
};

function createTypesList(types, type) {
  return types.map((typesItem) => `
          <div class="event__type-item">
            <input id="event-type-${typesItem}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typesItem}"${typesItem === type ? ' checked' : ''}>
            <label data-type="${typesItem}" class="event__type-label  event__type-label--${typesItem}" for="event-type-${typesItem}-1">${ucFirst(typesItem)}</label>
          </div>`).join('');
}

function createOffersTemplate(offers, pointsOffers) {
  return offers.length > 0 ?
    `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
        ${offers.map((offer) =>
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
  return `<input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationName}" list="destination-list-1">
    <datalist id="destination-list-1">
    ${destinationsList.map((destination) =>
    `<option value="${destination.name}">${destination.name}</option>`).join('')}
    </datalist>`;
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

function createEditablePoint(point, offers, destinationsAll, destination) {
  const { id, type, dateFrom, dateTo, price } = point;
  const { name, description, photos } = typeof destination !== 'undefined' ? destination : '';
  const destinationName = typeof name !== 'undefined' ? name : '';
  const destinationTemplate = typeof destination !== 'undefined' ? (createDestinationTemplate({ name, description, photos })) : '';
  const destinationsListTemplate = createDestinationsList(destinationsAll, destinationName);

  const dateFromHumanized = humanizeDate(dateFrom, DATE_FORMAT_FIRST);
  const dateToHumanized = humanizeDate(dateTo, DATE_FORMAT_FIRST);

  const typesList = createTypesList(TYPES, type);
  const offersTemplate = createOffersTemplate(offers, point.offersIds);

  const isSubmitDisabled = typeof destination === 'undefined';

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

                <button class="event__save-btn  btn  btn--blue" type="submit"${isSubmitDisabled ? ' disabled' : ''}>Save</button>
                <button class="event__reset-btn" type="reset">Delete</button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </header>
              <section class="event__details">
                ${offersTemplate}
                ${destinationTemplate}
              </section>
            </form>
          </li>`;
}

export default class EditablePoint extends AbstractStatefulView {
  #handleClick = null;
  #handleFormSubmit = null;

  constructor ({point = BLANK_POINT, offers, destinations, onClick, onFormSubmit}) {
    super();

    this._setState(EditablePoint.parsePointToState(point));
    this._setState(EditablePoint.parseOffersToState(offers, point.type));
    this._setState(EditablePoint.parseDestinationToState(destinations, point.destinationId));

    this.#handleClick = onClick;
    this.#handleFormSubmit = onFormSubmit;

    this._restoreHandlers();
  }

  get template () {
    return createEditablePoint(this._state, this._state.offersByType, this._state.destinationsAll, this._state.destination);
  }

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
    this.element.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelectorAll('.event__type-label').forEach((element) => {
      element.addEventListener('click', this.#eventTypeClickHandler);
    });
    this.element.querySelector('.event__input--destination').addEventListener('input', this.#destinationInputHandler);
    this.element.querySelectorAll('.event__offer-checkbox').forEach((element) => {
      element.addEventListener('change', this.#eventOfferChangeHandler);
    });
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditablePoint.parseStateToPoint(this._state));
  };

  #eventTypeClickHandler = (evt) => {
    evt.preventDefault();
    this._state.type = evt.target.dataset.type;
    this._state.offersByType = this._state.offers.find((offer) => offer.type === this._state.type);

    this.updateElement({
      type: this._state.type,
      offersByType: this._state.offersByType.offers,
      offersIds: [],
    });
  };

  #destinationInputHandler = (evt) => {
    evt.preventDefault();
    this._state.destination = this._state.destinationsAll.find((destination) => destination.name === evt.target.value);

    if (this._state.destination !== undefined) {
      this._state.destinationId = this._state.destination.id;
    }

    this.updateElement({
      destination: this._state.destination,
      destinationId: this._state.destinationId,
    });
  };

  #eventOfferChangeHandler = (evt) => {
    evt.preventDefault();

    const id = (parseInt(evt.target.dataset.eventOfferId, 10));

    if (!this._state.offersIds.includes(id)) {
      this.updateElement({
        offersIds: [...this._state.offersIds, id],
      });
    } else {
      const filteredoffersIds = this._state.offersIds.filter((offersId) => offersId !== id);
      this.updateElement({
        offersIds: filteredoffersIds,
      });
    }
  };


  static parsePointToState(point) {
    return {...point};
  }

  static parseOffersToState(offers, type) {
    const offersByType = offers.getByType(type);
    const offersAll = offers.offers;
    const offersNew = new Array();
    offersNew.offersByType = [...offersByType];
    offersNew.offers = [...offersAll];
    return offersNew;
  }

  static parseDestinationToState(destinations, id) {
    const destinationNew = new Object();
    const destinationsAll = destinations.destinations;
    destinationNew.destinationsAll = [...destinationsAll];
    const destination = destinations.getById(id);
    destinationNew.destination = {...destination};
    return destinationNew;
  }

  static parseStateToPoint(state) {
    const point = {...state};

    return point;
  }
}
