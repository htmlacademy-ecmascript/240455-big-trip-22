import { getRandomArrayElement, getRandomInteger } from '../utils/common.js';
import { POINTS_COUNT, TYPES, CITIES, OFFER_COUNT } from '../const.js';
import { generateDestination } from '../mock/destination.js';
import { generateOffer } from '../mock/offer.js';
import { generatePoint } from '../mock/point.js';

const destinationCount = getRandomInteger(1, CITIES.length);

export default class MockService {

  #destinations = [];
  #offers = [];
  #points = [];

  constructor() {
    this.#destinations = this.generateDestinations();
    this.#offers = this.generateOffers();
    this.#points = this.generatePoints();
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  get points() {
    return this.#points;
  }

  generateDestinations() {
    return Array.from({ length: destinationCount }, () => generateDestination());
  }

  generateOffers() {
    return TYPES.map((type) => ({
      type,
      offers: Array.from({ length: getRandomInteger(1, getRandomInteger(0, OFFER_COUNT)) }, () => generateOffer()),
    }));
  }

  generatePoints() {
    return Array.from({ length: POINTS_COUNT }, () => {
      const type = getRandomArrayElement(TYPES);

      const destination = getRandomArrayElement(this.#destinations);
      const hasOffers = getRandomInteger(0, 1);
      const offersByType = this.#offers
        .find((offerByType) => offerByType.type === type);

      const offers = (hasOffers)
        ? offersByType.offers
          .slice(0, getRandomInteger(0, OFFER_COUNT))
          .map((offer) => offer.id)
        : [];

      return generatePoint(type, offers, destination.id);
    });
  }
}
