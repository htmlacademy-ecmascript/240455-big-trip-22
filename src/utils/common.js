//написание слова с прописной буквы
function ucFirst(str) {
  if (!str) {
    return str;
  }

  return str[0].toUpperCase() + str.slice(1);
}

//проверка нажатия клавиши Esc
const isEscapeKey = (evt) => evt.key === 'Escape';

export { ucFirst, isEscapeKey };
