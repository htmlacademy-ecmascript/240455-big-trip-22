import { CITIES, DESCRIPTIONS, PHOTOS_COUNT } from './const.js';
import { getRandomArrayElement, createIdGenerator, getRandomInteger } from '../utils/utils.js';

const generateDestinationId = createIdGenerator();

function generateDestination() {
  const createDescription = () => Array.from(
    { length: getRandomInteger (1, DESCRIPTIONS.length)},
    () => getRandomArrayElement(DESCRIPTIONS),
  ).join(' ');

  const description = createDescription();

  function makePhoto() {
    return {
      description: description,
      src: `https://loremflickr.com/248/152?random=${Math.random()}`
    };
  }

  return {
    id: generateDestinationId(),
    name: getRandomArrayElement(CITIES),
    description: description,
    photos: Array.from({length: getRandomInteger (0, PHOTOS_COUNT)}, makePhoto),
  };
}

export { generateDestination };

