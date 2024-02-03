import { render } from '../framework/render.js';
import Sorting from '../view/sorting.js';
import EventsList from '../view/events-list.js';
import NoEvents from '../view/no-events.js';
import PresenterPoint from './presenter-point.js';
import { SortType, UpdateType, UserAction } from '../const.js';
import { sortEventsByTime, sortEventsByPrice, sortEventsByDate } from '../utils/event.js';

export default class PresenterMain {
  #presenterContainer = null;
  #pointsModel = null;
  #sortComponent = null;
  #eventsListComponent = new EventsList(); //список ul
  #noEventsComponent = new NoEvents();
  #presentersPoint = new Map();
  #currentSortType = SortType.DAY;

  constructor ({presenterContainer, pointsModel}) {
    this.#presenterContainer = presenterContainer;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.TIME:
        return [...this.#pointsModel.points].sort(sortEventsByTime).reverse();
      case SortType.PRICE:
        return [...this.#pointsModel.points].sort(sortEventsByPrice).reverse();
    }
    return [...this.#pointsModel.points].sort(sortEventsByDate);
  }

  init() {
    this.#renderSort();
    this.#renderMain();
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить точку (например, когда поменялся пункт назначения, офферсы, избранное, событие, дата, цены)
        this.#presentersPoint.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра, сортировки)
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
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
      pointsModel: this.#pointsModel,
      eventsListComponent: this.#eventsListComponent,
      onDataChange: this.#handleViewAction,
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
    if (this.points.length < 1) {
      this.#renderNoPoints();
      return;
    }

    this.#renderList();

    for (let i = 0; i < this.points.length; i++) {
      this.#renderPoint(this.points[i]);
    }
  }
}
