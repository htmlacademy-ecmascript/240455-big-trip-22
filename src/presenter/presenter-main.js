import { render, remove, RenderPosition } from '../framework/render.js';
import TripInfo from '../view/trip-info.js';
import TripInfoContent from '../view/trip-info-content.js';
import TripCost from '../view/trip-cost.js';
import NewPointPresenter from './new-point-presenter.js';
import FilterPresenter from '../presenter/presenter-filter.js';
import Sorting from '../view/sorting.js';
import EventsList from '../view/events-list.js';
import NoEvents from '../view/no-events.js';
import PresenterPoint from './presenter-point.js';
import {filter} from '../utils/filter.js';
import { SortType, UpdateType, UserAction, FilterType } from '../const.js';
import { sortEventsByTime, sortEventsByPrice, sortEventsByDate } from '../utils/event.js';

export default class PresenterMain {
  #presenterTripMain = null;
  #filtersContainer = null;

  #tripInfoComponent = new TripInfo();
  #tripInfoMainComponent = new TripInfoContent();
  #tripInfoCostComponent = new TripCost();

  #filterModel = null;

  #presenterContainer = null;
  #pointsModel = null;
  #sortComponent = null;
  #eventsListComponent = new EventsList(); //список ul
  #noEventsComponent = null;
  #presentersPoint = new Map();
  #newPointPresenter = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;

  constructor ({presenterTripMain, filtersContainer, presenterContainer, pointsModel, filterModel, onNewPointDestroy}) {
    this.#presenterTripMain = presenterTripMain;
    this.#filtersContainer = filtersContainer;
    this.#presenterContainer = presenterContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#newPointPresenter = new NewPointPresenter({
      pointsModel: this.#pointsModel,
      eventsListContainer:  this.#eventsListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy
    });
  }


  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortEventsByTime).reverse();
      case SortType.PRICE:
        return filteredPoints.sort(sortEventsByPrice).reverse();
    }
    return filteredPoints.sort(sortEventsByDate);
  }

  init() {
    render(this.#tripInfoComponent, this.#presenterTripMain, RenderPosition.AFTERBEGIN); //инфо
    render(this.#tripInfoMainComponent, this.#tripInfoComponent.element); //основная инфо
    render(this.#tripInfoCostComponent, this.#tripInfoComponent.element); //цена
    this.#renderFilters();
    this.#renderMain();
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
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
        // - обновить всю доску (например, при переключении фильтра)
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
    this.#newPointPresenter.destroy();
    this.#presentersPoint.forEach((presenter) => presenter.resetView());
  };

  #renderFilters() {
    const filterPresenter = new FilterPresenter({
      filterContainer: this.#filtersContainer,
      filterModel: this.#filterModel,
      pointsModel: this.#pointsModel
    });
    filterPresenter.init();
  }

  #renderSort() {
    this.#sortComponent = new Sorting({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#presenterContainer); //сортировка
  }

  #renderNoPoints() {
    this.#noEventsComponent = new NoEvents({
      filterType: this.#filterType
    });
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
    this.#newPointPresenter.destroy();
    this.#presentersPoint.forEach((presenter) => presenter.destroy());
    this.#presentersPoint.clear();

    remove(this.#sortComponent);
    remove(this.#noEventsComponent);

    if (this.#noEventsComponent) {
      remove(this.#noEventsComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }
}
