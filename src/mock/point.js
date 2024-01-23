import { createIdGenerator, getRandomInteger, getRandomArrayElement } from '../utils/common.js';

const generatePointId = createIdGenerator();

const datesFrom = [
  new Date('2023-12-31, 16:00'),
  new Date('2024-01-05, 17:00'),
  new Date('2024-02-06, 18:00'),
];

const datesTo = [
  new Date('2024-02-06, 19:00'),
  new Date('2024-03-04, 20:00'),
  new Date('2024-04-17, 21:00'),
];

const generatePoint = (type, offersIds, destinationId) => ({
  id: generatePointId(),
  type: type,
  offers: offersIds,
  destination: destinationId,
  dateFrom: getRandomArrayElement(datesFrom),
  dateTo: getRandomArrayElement(datesTo),
  isFavorite: getRandomInteger(0, 1),
  price: getRandomInteger(20, 100),
});

export { generatePoint };
