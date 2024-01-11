import { createIdGenerator, getRandomInteger } from '../utils/utils.js';

const generatePointId = createIdGenerator();

const generatePoint = (type, offersIds, destinationId) => ({
  id: generatePointId(),
  type: type,
  offers: offersIds,
  destination: destinationId,
  dateFrom: new Date('2024-12-25, 16:00'),
  dateTo: new Date('2024-12-27, 16:00'),
  isFavorite: getRandomInteger(0, 1),
  price: getRandomInteger(20, 100),
});

export { generatePoint };
