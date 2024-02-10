const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  ERROR: 'ERROR',
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const DateType = {
  DATE_FORMAT_FIRST: 'D/MM/YY H:mm',
  DATE_FORMAT_SECOND: 'YYYY-MM-DD',
  DATE_FORMAT_THIRD: 'MMM D',
  DATE_FORMAT_FOURTH: 'YYYY-MM-DDTHH:mm',
  TIME_FORMAT: 'HH:mm',
};

const DEFAULT_TYPE = 'flight';


const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export { FilterType, SortType, UserAction, UpdateType, TimeLimit, DateType, DEFAULT_TYPE, Mode };
