export default class PointsModel {
  #service = null;
  #points = null;
  #destinations = null;
  #offers = null;

  constructor(service) {
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
}