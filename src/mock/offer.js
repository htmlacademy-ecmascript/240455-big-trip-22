import { OFFERS } from './const';
import { getRandomArrayElement, createIdGenerator, getRandomInteger } from '../utils';


function generateOffer() {
  const generateOfferId = createIdGenerator();

  return {
    id: generateOfferId(),
    title: getRandomArrayElement(OFFERS),
    price: getRandomInteger(20, 100),
  };
}

export { generateOffer };

