import dayjs from 'dayjs';

const DATE_FORMAT_FIRST = 'D/MM/YY H:mm';
const DATE_FORMAT_SECOND = 'YYYY-MM-DD';
const DATE_FORMAT_THIRD = 'MMM D';
const DATE_FORMAT_FOURTH = 'YYYY-MM-DDTHH:mm'; //2019-03-18T10:30
const TIME_FORMAT = 'HH:mm';

//преобразование даты в указанный формат
function humanizeDate (date, dateFormat) {
  return date ? dayjs(date).format(dateFormat) : '';
}

function isEventExpired(date) {
  return date && dayjs().isAfter(date, 'D');
}

function isEventFuture(date) {
  return date && dayjs().isBefore(date, 'D');
}

function isEventToday(date) {
  return date && dayjs(date).isSame(dayjs(), 'D');
}

export {humanizeDate, isEventExpired, isEventFuture, isEventToday, DATE_FORMAT_FIRST, DATE_FORMAT_SECOND, DATE_FORMAT_THIRD, DATE_FORMAT_FOURTH, TIME_FORMAT };
