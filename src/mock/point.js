import { createIdGenerator, getRandomInteger } from '../utils.js';

const generatePointId = createIdGenerator();

const generatePoint = (type, offersIds, destinationId) => ({
  id: generatePointId(),
  type: type,
  offers: offersIds,
  destination: destinationId,
  dateFrom: '25/12/23 16:00',
  dateTo: '26/12/23 16:00',
  isFavorite: getRandomInteger(0, 1),
  price: getRandomInteger(20, 100),
});

export { generatePoint };