import {remove, render, RenderPosition} from '../framework/render.js';
import EditableEvent from '../view/editable-event.js';
// import { generatePointId } from '../mock/point.js';
import {UserAction, UpdateType} from '../const.js';
import { isEscapeKey } from '../utils/common.js';

export default class NewPointPresenter {
  #pointsModel = null;
  #eventsListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #point = null;
  #eventEditComponent = null;

  constructor({pointsModel, eventsListContainer, onDataChange, onDestroy}) {
    this.#pointsModel = pointsModel;
    this.#eventsListContainer = eventsListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#point = {
      type: 'flight',
      offers: [],
      destination: '',
      dateFrom: '',
      dateTo: '',
      price: 0,
      destinationById: '',
    };
  }

  init() {
    this.#point = {...this.#point,
      offersAll: this.#pointsModel.offers,
      destinationsAll: this.#pointsModel.destinations,
      offersByType: this.#pointsModel.getByOffersType('flight'),
    };

    if (this.#eventEditComponent !== null) {
      return;
    }

    this.#eventEditComponent = new EditableEvent({
      point: this.#point,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick
    });

    render(this.#eventEditComponent, this.#eventsListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#eventEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#eventEditComponent);
    this.#eventEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      // Пока у нас нет сервера, который бы после сохранения
      // выдывал честный id задачи, нам нужно позаботиться об этом самим
      {id: generatePointId(), ...point},
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  };
}
