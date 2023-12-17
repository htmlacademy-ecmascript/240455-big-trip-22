import { CITIES, DESCRIPTIONS, PHOTOS_COUNT } from '../const';
import { getRandomArrayElement, createIdGenerator, getRandomInteger } from '../utils';


function generateDestination() {
  const generateDestinationId = createIdGenerator();

  const createDescription = () => Array.from(
    { length: getRandomInteger (1, 5)},
    () => getRandomArrayElement(DESCRIPTIONS),
  ).join(' ');

  const description = createDescription().trim();

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

