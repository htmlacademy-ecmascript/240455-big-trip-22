import { render } from '../framework/render.js';
import Sorting from '../view/sorting.js';
import EventsList from '../view/events-list.js';
import EventsListItem from '../view/events-list-item.js';
import Event from '../view/event.js';

export default class PresenterMain {
  #presenterContainer = null;
  #destinationModel = null;
  #offersModel = null;
  #pointsModel = null;
  #points = null;

  #sortingComponent = new Sorting(); //сортировка
  #eventsListComponent = new EventsList(); //список ul

  constructor ({presenterContainer, destinationModel, offersModel, pointsModel}) {
    this.#presenterContainer = presenterContainer;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];

    render(this.#sortingComponent, this.#presenterContainer); //сортировка
    render(this.#eventsListComponent, this.#presenterContainer); //список ul

    for (let i = 1; i < this.#points.length; i++) {
      this.#renderPoint(this.#points[i]);
    }
  }

  #renderPoint(point) {
    const destinationId = point.destination;
    const destination = this.#destinationModel.getById(destinationId);
    const type = point.type;
    const offers = this.#offersModel.getByType(type);
    render(new EventsListItem(), this.#eventsListComponent.element); //рендерим li
    render(new Event({point: point, offers, destination}), this.#eventsListComponent.element.lastElementChild); //рендерим point в li
  }
}
