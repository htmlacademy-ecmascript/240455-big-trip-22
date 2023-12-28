import { render, replace } from '../framework/render.js';
import Sorting from '../view/sorting.js';
import EventsList from '../view/events-list.js';
import EventsListItem from '../view/events-list-item.js';
import Event from '../view/event.js';
import EditablePoint from '../view/editable-point.js';
import ButtonRollUp from '../view/button-rollup.js';
import { isEscapeKey } from '../utils.js';

export default class PresenterMain {
  #presenterContainer = null;
  #destinationModel = null;
  #offersModel = null;
  #pointsModel = null;
  #points = null;
  #sortingComponent = new Sorting(); //сортировка
  #eventsListComponent = new EventsList(); //список ul
  #list = null;
  #listItem = null;
  #event = null;
  #form = null;
  #arrowShowingForm = null;
  #arrowClosingForm = null;
  #formHeader = null;
  #pairArray = null;

  constructor ({presenterContainer, formHeader, destinationModel, offersModel, pointsModel}) {
    this.#presenterContainer = presenterContainer;
    this.#formHeader = formHeader;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];

    render(this.#sortingComponent, this.#presenterContainer); //сортировка
    render(this.#eventsListComponent, this.#presenterContainer); //список ul

    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint(this.#points[i]);
    }
  }

  #renderPoint(point) {
    const destinationId = point.destination;
    const destination = this.#destinationModel.getById(destinationId);
    const type = point.type;
    const offers = this.#offersModel.getByType(type);

    this.#list = this.#eventsListComponent.element;
    this.#listItem = new EventsListItem();
    this.#event = new Event({point: point, offers, destination});
    this.#form = new EditablePoint({point: point, offers, destination});
    this.#formHeader = this.#form.element.querySelector('.event__header');
    this.#arrowShowingForm = new ButtonRollUp({onClick: this.#handleShowFormButtonClick, form: this.#form, event: this.#event});
    this.#arrowClosingForm = new ButtonRollUp({onClick: this.#handleCloseFormButtonClick, form: this.#form, event: this.#event});

    render(this.#listItem, this.#list); //рендерим li
    render(this.#event, this.#listItem.element); //рендерим точку в li
    render(this.#arrowShowingForm, this.#event.element); //рендерим стрелку в точке
    render(this.#arrowClosingForm, this.#formHeader); //рендерим стрелку в форме
  }

  #onDocumentKeydown = (evt, form, point) => {
    if (isEscapeKey(evt)) {
      this.#handleCloseFormButtonClick(form, point);
    }
  };

  #handleShowFormButtonClick = (form, point) => {
    if (this.#pairArray !== null) {
      replace(this.#pairArray[1], this.#pairArray[0]);
    }
    replace(form, point);

    this.#pairArray = Array.of(form, point);

    document.addEventListener('keydown', this.#onDocumentKeydown(form, point));
  };

  #handleCloseFormButtonClick = (form, point) => {
    if (this.#pairArray !== null) {
      this.#pairArray = null;
    }
    replace(point, form);

    document.removeEventListener('keydown', this.#onDocumentKeydown);
  };
}
