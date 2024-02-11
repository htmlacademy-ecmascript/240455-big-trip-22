import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

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

//длина маршрута
function getEventDuration(dateTo, dateFrom) {
  let minutes = dayjs(dateTo).diff(dayjs(dateFrom), 'minute');

  if (minutes < 60) {
    return minutes < 10 ? `0${minutes}M` : `${minutes}M`;
  } else {
    if (minutes < 1440) {
      let hours = Math.floor(minutes / 60);
      minutes = minutes % 60;
      minutes = minutes < 10 ? `0${minutes}M` : `${minutes}M`;
      hours = hours < 10 ? `0${hours}H` : `${hours}H`;
      return `${hours} ${minutes}`;
    } else {
      let hours = Math.floor(minutes / 60);
      minutes = minutes % 60;
      let days = Math.floor(hours / 24);
      hours = hours % 24;
      minutes = minutes < 10 ? `0${minutes}M` : `${minutes}M`;
      hours = hours < 10 ? `0${hours}H` : `${hours}H`;
      days = days < 10 ? `0${days}D` : `${days}D`;
      return `${days} ${hours} ${minutes}`;
    }
  }
}

//сортировка дат по возрастанию
function sortEventsByDate(eventA, eventB) {
  return dayjs(eventA.dateFrom).diff(dayjs(eventB.dateFrom));
}

//сортировка времени по убыванию
function sortEventsByTime(eventA, eventB) {
  return dayjs(eventA.dateTo).diff(dayjs(eventA.dateFrom)) - dayjs(eventB.dateTo).diff(dayjs(eventB.dateFrom));
}

//сортировка цен по убыванию
function sortEventsByPrice(eventA, eventB) {
  return eventA.price - eventB.price;
}

//сравнение дат
function isDatesEqual(dateA, dateB) {
  return dayjs(dateA).isSame(dateB);
}

//сравнение цен
function isPriceEqual(priceA, priceB) {
  return dayjs(priceA).isSame(priceB);
}

export { humanizeDate, isEventExpired, isEventFuture, isEventPresent, sortEventsByTime, sortEventsByPrice, getEventDuration, sortEventsByDate, isDatesEqual, isPriceEqual };
