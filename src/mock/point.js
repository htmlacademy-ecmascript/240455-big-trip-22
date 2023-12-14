import { TYPES, NAMES, DESCRIPTIONS } from '../const';
import { getRandomArrayElement, createIdGenerator, getRandomInteger } from '../utils';

//const generateOfferId = createIdGenerator();
const generateDestinationId = createIdGenerator();
const generatePointId = createIdGenerator();

// const createOffer = () => ({
//   id: generateOfferId(),
//type: getRandomArrayElement(TYPES),
// title: getRandomArrayElement(OFFERS_TYPE),
//price: ,
// });

const createDescription = () => Array.from(
  { length: getRandomInteger (1, 5)},
  () => getRandomArrayElement(DESCRIPTIONS),
).join(' ');

function makePhoto() {
  return {
    description: getRandomArrayElement(DESCRIPTIONS),
    src: `https://loremflickr.com/248/152?random=${Math.random()}`
  };
}

const createDestination = () => ({
  id: generateDestinationId(),
  name: getRandomArrayElement(NAMES),
  description: createDescription(),
  photos: Array.from({length: getRandomInteger (0, 3)}, makePhoto),
});

// const createOffers = (point.type) => ({
//   OFFERS.type = point.type;
// });

const createPoint = () => ({
  id: generatePointId(),
  type: getRandomArrayElement(TYPES), //taxi
  //offers: OFFERS[];
  destination: createDestination(),
  dateFrom: '25/12/23 16:00',
  dateTo: '26/12/23 16:00',
  isFavorite: getRandomInteger(0, 1),
  price: getRandomInteger(20, 100),
});

export { createPoint };
