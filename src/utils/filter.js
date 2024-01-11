import { FilterType } from '../mock/const.js';
import { isEventExpired, isEventFuture, isEventToday } from './event.js';

const filters = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isEventFuture(point.dateTo)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isEventToday(point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => isEventExpired(point.dateTo)),
};

export {filters};
