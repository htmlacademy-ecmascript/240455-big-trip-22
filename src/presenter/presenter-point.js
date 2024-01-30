import { render, replace, remove } from '../framework/render.js';
import { isEscapeKey } from '../utils/common.js';
import EditablePoint from '../view/editable-point.js';
import Event from '../view/event.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PresenterPoint {
  #pointsModel = null;
  #eventsListComponent = null;
  #handleModeChange = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;
  #mode = Mode.DEFAULT;

  #handleDataChange = null;

  constructor({pointsModel, eventsListComponent, onDataChange, onModeChange}) {
    this.#pointsModel = pointsModel;
    this.#eventsListComponent = eventsListComponent;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#point = {...point,
      offersAll: this.#pointsModel.offers,
      offersByType: this.#pointsModel.getByOffersType(point.type),
      destinationsAll: this.#pointsModel.destinations,
      destinationById: this.#pointsModel.getByDestinationId(point.destination),
    };

    this.#pointComponent = new Event({
      point: this.#point,
      onClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#pointEditComponent = new EditablePoint({
      point: this.#point,
      onClick: this.#handleFormClose,
      onFormSubmit: this.#handleFormSubmit,
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#eventsListComponent.element);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToEvent();
    }
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #replaceFormToEvent() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #replaceEventToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #escKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#handleFormClose();
    }
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #handleEditClick = () => {
    this.#replaceEventToForm();
  };

  #handleFormClose = () => { //закрываем форму без сохранения
    this.#pointEditComponent.reset(this.#point);
    this.#replaceFormToEvent();
  };

  #handleFormSubmit = (point) => { //сохраняем форму
    this.#handleDataChange(point);
    this.#replaceFormToEvent();
  };
}
