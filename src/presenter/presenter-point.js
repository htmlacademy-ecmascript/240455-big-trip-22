import { render, replace } from '../framework/render.js';
import { isEscapeKey } from '../utils/common.js';
import EventsListItem from '../view/events-list-item.js';
import EditablePoint from '../view/editable-point.js';
import Event from '../view/event.js';
//Передайте в презентер точки маршрута колбэк, который нужно вызвать перед тем,
//как сменить точку на форму редактирования.
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
    this.#offers = this.#offersModel.getByType(this.#point.type);
    this.#destination = this.#destinationModel.getById(this.#point.destination);


    this.#pointComponent = new Event({
      point: this.#point,
      offers: this.#offers,
      destination:  this.#destination,
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

    render(this.#pointComponent, this.#listItem.element); //рендерим точку в li
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
