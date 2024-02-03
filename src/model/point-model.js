import Observable from '../framework/observable.js';

export default class PointsModel extends Observable {
  #service = null;
  #points = null;
  #destinations = null;
  #offers = null;

  constructor(service) {
    super();
    this.#service = service;
    this.#points = this.#service.points;
    this.#destinations = this.#service.destinations;
    this.#offers = this.#service.offers;
  }

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  getByDestinationId(id) {
    return this.#destinations
      .find((destination) => destination.id === id);
  }

  get offers() {
    return this.#offers;
  }

  getByOffersType(type) {
    return this.#offers
      .find((offer) => offer.type === type).offers;
  }

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
