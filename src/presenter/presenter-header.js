import {render, RenderPosition} from '../render.js';
import FiltersView from '../view/filters-view.js';
import TripInfo from '../view/trip-info.js';
import TripInfoMain from '../view/trip-info-main.js';
import TripInfoCost from '../view/trip-info-cost.js';

export default class PresenterHeader {
  filtersComponent = new FiltersView();
  tripInfoComponent = new TripInfo();
  tripInfoMainComponent = new TripInfoMain();
  tripInfoCostComponent = new TripInfoCost();

  constructor ({presenterContainer}) {
    this.presenterContainer = presenterContainer;
  }

  siteFiltersContainer = document.querySelector('.trip-controls__filters');
  siteTripMainContainer = document.querySelector('.trip-main');

  init() {
    render(this.tripInfoComponent, this.siteTripMainContainer, RenderPosition.AFTERBEGIN); //инфо
    render(this.tripInfoMainComponent, this.tripInfoComponent.getElement()); //основная инфо
    render(this.tripInfoCostComponent, this.tripInfoComponent.getElement()); //цена
    render(this.filtersComponent, this.siteFiltersContainer); //фильтры
  }
}
