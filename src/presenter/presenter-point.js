import { render, replace, remove } from '../framework/render.js';
import { isEscapeKey } from '../utils/common.js';
import EventsListItem from '../view/events-list-item.js';
import EditablePoint from '../view/editable-point.js';
import Event from '../view/event.js';

export default class PresenterPoint {
  #destinationModel = null;
  #offersModel = null;
  #eventsListComponent = null;
  #offers = null;
  #destination = null;

  #listItem = new EventsListItem();

  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;

  constructor({destinationModel, offersModel, eventsListComponent}) {
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
    this.#eventsListComponent = eventsListComponent;
  }

  #renderListItem() {
    render(this.#listItem, this.#eventsListComponent.element);
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#offers = this.#offersModel.getByType(this.#point.type);
    this.#destination = this.#destinationModel.getById(this.#point.destination);


    this.#pointComponent = new Event({
      point: this.#point,
      offers: this.#offers,
      destination: this.#destination,
      onClick: this.#handleEditClick,
    });

    this.#pointEditComponent = new EditablePoint({
      point: this.#point,
      offers: this.#offers,
      destination:  this.#destination,
      onClick: this.#handleFormClose,
      onFormSubmit: this.#handleFormSubmit,
    });

    this.#renderListItem(); //рендерим li

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#listItem.element); //рендерим точку в li
      return;
    }

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    if (this.#eventsListComponent.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#eventsListComponent.contains(prevPointEditComponent.element)) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }


  #replaceFormToEvent() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceEventToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#replaceFormToEvent();
    }
  };

  #handleEditClick = () => {
    this.#replaceEventToForm();
  };

  #handleFormClose = () => { //закрываем форму без сохранения
    this.#replaceFormToEvent();
  };

  #handleFormSubmit = () => { //сохраняем форму
    this.#replaceFormToEvent();
  };
}
