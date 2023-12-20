import dayjs from 'dayjs';

const DATE_FORMAT = 'D/MM/YY H:mm';

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
function humanizeDate (date) {
  return date ? dayjs(date).format(DATE_FORMAT) : '';
}

//написание слова с прописной буквы
function ucFirst(str) {
  if (!str) {
    return str;
  }

  return str[0].toUpperCase() + str.slice(1);
}

export { getRandomArrayElement, createIdGenerator, getRandomInteger, humanizeDate, ucFirst };
