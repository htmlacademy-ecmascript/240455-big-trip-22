import { FilterType } from '../mock/const.js';
import { isEventExpired, isEventFuture, isEventPresent } from './event.js';

const filters = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isEventFuture(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isEventPresent(point.dateFrom, point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => isEventExpired(point.dateTo)),
};

export {filters};
