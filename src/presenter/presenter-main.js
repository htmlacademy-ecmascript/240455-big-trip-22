import { render, remove } from '../framework/render.js';
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
    // В зависимости от типа изменений решаем, что делать:
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить точку (избранное)
        this.#presentersPoint.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearMain();
        this.#renderMain();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении сортировки/фильтра)
        this.#clearMain({resetSortType: true});
        this.#renderMain();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearMain();
    this.#renderMain();
  };

  #handleModeChange = () => {
    this.#presentersPoint.forEach((presenter) => presenter.resetView());
  };

  #renderSort() {
    this.#sortComponent = new Sorting({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#presenterContainer); //сортировка
  }

  #renderNoPoints() {
    remove(this.#sortComponent);
    render(this.#noEventsComponent, this.#presenterContainer); //нет точек маршрута
  }

  #renderList() {
    render(this.#eventsListComponent, this.#presenterContainer); //список ul
  }

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

  #renderMain() {
    if (this.points.length < 1) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();

    this.#renderList();

    for (let i = 0; i < this.points.length; i++) {
      this.#renderPoint(this.points[i]);
    }
  }

  #clearMain({resetSortType = false} = {}) {
    this.#presentersPoint.forEach((presenter) => presenter.destroy());
    this.#presentersPoint.clear();

    remove(this.#sortComponent);
    remove(this.#noEventsComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }
}
