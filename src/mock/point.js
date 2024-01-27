import { createIdGenerator, getRandomInteger, getRandomArrayElement } from '../utils/common.js';

const generatePointId = createIdGenerator();

const datesFrom = [
  new Date('2024-12-24, 09:05'),
  new Date('2024-12-26, 01:03'),
];

const datesTo = [
  new Date('2024-12-31, 17:16'),
  new Date('2025-01-05, 12:31'),
];

const generatePoint = (type, offersIds, destinationId) => ({
  id: generatePointId(),
  type: type,
  offersIds: offersIds,
  destinationId: destinationId,
  dateFrom: getRandomArrayElement(datesFrom),
  dateTo: getRandomArrayElement(datesTo),
  isFavorite: getRandomInteger(0, 1),
  price: getRandomInteger(20, 100),
});

export { generatePoint };
