import { OFFERS } from './const.js';
import { getRandomArrayElement, createIdGenerator, getRandomInteger } from '../utils.js';


function generateOffer() {
  const generateOfferId = createIdGenerator();

  return {
    id: generateOfferId(),
    title: getRandomArrayElement(OFFERS),
    price: getRandomInteger(20, 100),
  };
}

export { generateOffer };

