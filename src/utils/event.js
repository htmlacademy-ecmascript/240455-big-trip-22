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

export {humanizeDate, isEventExpired, isEventFuture, isEventPresent, DATE_FORMAT_FIRST, DATE_FORMAT_SECOND, DATE_FORMAT_THIRD, DATE_FORMAT_FOURTH, TIME_FORMAT, sortEventsByTime, sortEventsByPrice, getEventDuration, sortEventsByDate };
