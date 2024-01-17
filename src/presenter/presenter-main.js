import { render } from '../framework/render.js';
import Sorting from '../view/sorting.js';
import EventsList from '../view/events-list.js';
import NoEvents from '../view/no-events.js';
import PresenterPoint from './presenter-point.js';
import { updatePoint } from '../utils/common.js';

export default class PresenterMain {
  #presenterContainer = null;
  #destinationModel = null;
  #offersModel = null;
  #pointsModel = null;
  #points = null;
  #sortingComponent = new Sorting(); //сортировка
  #eventsListComponent = new EventsList(); //список ul
  #noEventsComponent = new NoEvents();
  #presentersPoint = new Map();

  constructor ({presenterContainer, destinationModel, offersModel, pointsModel}) {
    this.#presenterContainer = presenterContainer;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#renderMain();
  }

  #renderSort() {
    render(this.#sortingComponent, this.#presenterContainer); //сортировка
  }

  #renderList() {
    render(this.#eventsListComponent, this.#presenterContainer); //список ul
  }

  #renderNoPoints() {
    render(this.#noEventsComponent, this.#presenterContainer); //нет точек маршрута
  }

  #handlePointChange = (updatedPoint) => {
    this.#points = updatePoint(this.#points, updatedPoint);
    this.#presentersPoint.get(updatedPoint.id).init(updatedPoint);
  };

  #renderPoint(point) {
    const presenterPoint = new PresenterPoint({
      destinationModel: this.#destinationModel,
      offersModel: this.#offersModel,
      eventsListComponent: this.#eventsListComponent, //список ul
    });

    presenterPoint.init(point);
    this.#presentersPoint.set(point.id, presenterPoint);
  }

  #clearPointList() {
    this.#presentersPoint.forEach((presenter) => presenter.destroy());
    this.#presentersPoint.clear();
  }

  #renderMain() {
    if (this.#points.length < 1) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderList();

    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint(this.#points[i]);
    }
  }
}
