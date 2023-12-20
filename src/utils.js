import dayjs from 'dayjs';

const DATE_FORMAT_FIRST = 'D/MM/YY H:mm';
const DATE_FORMAT_SECOND = 'YYYY-MM-DD';
const DATE_FORMAT_THIRD = 'MMM D';
const TIME_FORMAT = 'HH:mm';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

//создание счетчика
const createIdGenerator = () => {
  let lastGenerateId = 0;

  return () => {
    lastGenerateId += 1;
    return lastGenerateId;
  };
};

//получение случайного числа из диапазона
function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

//преобразование даты в указанный формат
function humanizeDate (date, dateFormat) {
  return date ? dayjs(date).format(dateFormat) : '';
}

//написание слова с прописной буквы
function ucFirst(str) {
  if (!str) {
    return str;
  }

  return str[0].toUpperCase() + str.slice(1);
}

export { getRandomArrayElement, createIdGenerator, getRandomInteger, humanizeDate, ucFirst, DATE_FORMAT_FIRST, DATE_FORMAT_SECOND, DATE_FORMAT_THIRD, TIME_FORMAT };
