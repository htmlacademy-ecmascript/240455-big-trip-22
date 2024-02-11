import { render, remove } from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import { SortType, UpdateType, UserAction, FilterType, TimeLimit } from '../const.js';
import {filterBy} from '../utils/filterby.js';
import { sortEventsByTime, sortEventsByPrice, sortEventsByDate } from '../utils/event.js';

import PresenterNewPoint from './presenter-new-point.js';
import PresenterPoint from './presenter-point.js';
import PresenterFilter from './presenter-filter.js';
import PresenterHeaderInfo from './presenter-header-info.js';

import Sorting from '../view/sorting.js';
import EventsList from '../view/events-list.js';
import NoEvents from '../view/no-events.js';
import Loading from '../view/loading.js';
import FailedLoading from '../view/failed-loading.js';
import FilterModel from '../model/filter-model.js';

export default class PresenterMain {
  #filtersContainer = null;
  #presenterContainer = null;
  #newEventButtonContainer = null;

  #filterModel = new FilterModel();
  #pointsModel = null;

  #loadingComponent = new Loading();
  #failedLoadingComponent = new FailedLoading();
  #sortComponent = null;
  #eventsListComponent = new EventsList(); //список ul
  #noEventsComponent = null;
  #presentersPoint = new Map();
  #siteTripMainContainer = null;

  #newPointPresenter = null;

  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;

  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor ({siteTripMainContainer, filtersContainer, presenterContainer, pointsModel, onNewPointDestroy, newEventButtonContainer}) {
    this.#filtersContainer = filtersContainer;
    this.#presenterContainer = presenterContainer;
    this.#pointsModel = pointsModel;
    this.#newEventButtonContainer = newEventButtonContainer;
    this.#siteTripMainContainer = siteTripMainContainer;

    this.#newPointPresenter = new PresenterNewPoint({
      pointsModel: this.#pointsModel,
      eventsListContainer:  this.#eventsListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filterBy[this.#filterType](points);
    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortEventsByTime).reverse();
      case SortType.PRICE:
        return filteredPoints.sort(sortEventsByPrice).reverse();
    }
    return filteredPoints.sort(sortEventsByDate);
  }

  init() {
    this.#renderHeaderInfo();
    this.#renderFilters();
    this.#renderMain();
  }

  createNoPoints() {
    if (this.points.length < 1) {
      this.#renderNoPoints();
    }
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newEventButtonContainer.disabled = false;

    if (this.#noEventsComponent) {
      remove(this.#noEventsComponent);
      this.#renderList();
    }
    this.#newPointPresenter.init();

  }

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#presentersPoint.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#presentersPoint.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#presentersPoint.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#presentersPoint.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderMain();
        break;
      case UpdateType.ERROR:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#clearMain();
        this.#renderFailedLoading();
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

  #renderHeaderInfo() {
    const presenterHeaderInfo = new PresenterHeaderInfo({
      siteTripMainContainer: this.#siteTripMainContainer,
      pointsModel: this.#pointsModel
    });
    presenterHeaderInfo.init();
  }

  #renderFilters() {
    const filterPresenter = new PresenterFilter({
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

  #renderLoading() {
    remove(this.#sortComponent);
    this.#newEventButtonContainer.disabled = true;
    render(this.#loadingComponent, this.#presenterContainer); //нет точек маршрута
  }

  #renderFailedLoading() {
    this.#newEventButtonContainer.disabled = true;
    render(this.#failedLoadingComponent, this.#presenterContainer);
  }

  #renderNoPoints() {
    this.#noEventsComponent = new NoEvents({
      filterType: this.#filterType
    });
    this.#newEventButtonContainer.disabled = false;
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
    if (this.#isLoading) {
      this.#renderLoading();
    } else {

      if (this.points.length < 1) {
        this.#renderNoPoints();
        return;
      }
      this.#newEventButtonContainer.disabled = false;

      this.#renderSort();

      this.#renderList();

      this.points.forEach((point) => this.#renderPoint(point));
    }
  }

  #clearMain({resetSortType = false} = {}) {
    this.#newPointPresenter.destroy();
    this.#presentersPoint.forEach((presenter) => presenter.destroy());
    this.#presentersPoint.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);
    remove(this.#noEventsComponent);

    if (this.#noEventsComponent) {
      remove(this.#noEventsComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }
}
