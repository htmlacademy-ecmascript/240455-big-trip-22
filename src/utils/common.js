//написание слова с прописной буквы
function ucFirst(str) {
  if (!str) {
    return str;
  }

  return str[0].toUpperCase() + str.slice(1);
}

//проверка нажатия клавиши Esc
const isEscapeKey = (evt) => evt.key === 'Escape';

function updatePoint(points, update) {
  return points.map((point) => point.id === update.id ? update : point);
}

//export { getRandomArrayElement, createIdGenerator, getRandomInteger, ucFirst, isEscapeKey, updatePoint };
export { ucFirst, isEscapeKey, updatePoint };
