import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

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
  return dayjs().isAfter(dayjs(date));
}

function isEventFuture(date) {
  return dayjs().isBefore(dayjs(date));
}

function isEventPresent(dateFrom, dateTo) {
  return dayjs().isBetween(dateFrom, dateTo, 'day', '[]');
}

// Менее часа: минуты (например, 23M);
// Менее суток: часы минуты (например, 02H 44M или 12H 00M, если минуты равны нулю);
// Более суток: дни часы минуты (например, 51D 02H 30M или 07D 00H 00M, если часы и/или минуты равны нулю).

function getEventDuration(dateTo, dateFrom) {
  const minutes = dayjs(dateTo).diff(dayjs(dateFrom), 'minute');

  if (minutes < 60) {
    // return `${minutes}M`;
  } else {
    if (minutes < 1440) {
      // const remainingMinutes = minutes % 60;
      // return remainingMinutes;
      //const hours = Math. floor(minutes / 60);
      // return `${hours}H ${remainingMinutes}M`;
    }
  }
  //return minutes;
}

function sortEventsByDate(eventA, eventB) {
  return dayjs(eventA.dateFrom).diff(dayjs(eventB.dateFrom));
}

function sortEventsByTime(eventA, eventB) {
  return dayjs(eventA.dateTo).diff(dayjs(eventA.dateFrom)) - dayjs(eventB.dateTo).diff(dayjs(eventB.dateFrom));
}

function sortEventsByPrice(eventA, eventB) {
  return eventA.price - eventB.price;
}

export {humanizeDate, isEventExpired, isEventFuture, isEventPresent, DATE_FORMAT_FIRST, DATE_FORMAT_SECOND, DATE_FORMAT_THIRD, DATE_FORMAT_FOURTH, TIME_FORMAT, sortEventsByTime, sortEventsByPrice, getEventDuration, sortEventsByDate };
