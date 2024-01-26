import { render } from '../framework/render.js';
import Sorting from '../view/sorting.js';
import EventsList from '../view/events-list.js';
import NoEvents from '../view/no-events.js';
import PresenterPoint from './presenter-point.js';
import { updatePoint } from '../utils/common.js';
import { SortType } from '../const.js';
import { sortEventsByTime, sortEventsByPrice, sortEventsByDate } from '../utils/event.js';

export default class PresenterMain {
  #presenterContainer = null;
  #destinationModel = null;
  #offersModel = null;
  #pointsModel = null;
  #points = null;
  #sortComponent = null;
  #eventsListComponent = new EventsList(); //список ul
  #noEventsComponent = new NoEvents();
  #presentersPoint = new Map();
  #currentSortType = SortType.DAY;
  #sourcedPoints = [];

  constructor ({presenterContainer, destinationModel, offersModel, pointsModel}) {
    this.#presenterContainer = presenterContainer;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points].sort(sortEventsByDate);
    this.#sourcedPoints = [...this.#pointsModel.points].sort(sortEventsByDate);
    this.#renderSort();
    this.#renderMain();
  }

  #handlePointChange = (updatedPoint) => {
    this.#points = updatePoint(this.#points, updatedPoint);
    this.#sourcedPoints = updatePoint(this.#sourcedPoints, updatedPoint);
    this.#presentersPoint.get(updatedPoint.id).init(updatedPoint);
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this.#points.sort(sortEventsByTime);
        this.#points.reverse();
        break;
      case SortType.PRICE:
        this.#points.sort(sortEventsByPrice);
        this.#points.reverse();
        break;
      default:
        this.#points = this.#sourcedPoints;
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderMain();
  };

  #renderSort() {
    this.#sortComponent = new Sorting({
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#presenterContainer); //сортировка
  }

  #renderList() {
    render(this.#eventsListComponent, this.#presenterContainer); //список ul
  }

  #renderNoPoints() {
    render(this.#noEventsComponent, this.#presenterContainer); //нет точек маршрута
  }

  #handleModeChange = () => {
    this.#presentersPoint.forEach((presenter) => presenter.resetView());
  };

  #renderPoint(point) {
    const presenterPoint = new PresenterPoint({
      destinationModel: this.#destinationModel,
      offersModel: this.#offersModel,
      eventsListComponent: this.#eventsListComponent,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
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

    this.#renderList();

    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint(this.#points[i]);
    }
  }
}
