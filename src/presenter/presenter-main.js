import { render } from '../framework/render.js';
import Sorting from '../view/sorting.js';
import EventsList from '../view/events-list.js';
import NoEvents from '../view/no-events.js';
import PresenterPoint from './presenter-point.js';
import { SortType } from '../const.js';
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
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
  };

  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
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
