import { render, RenderPosition } from '../framework/render.js';
import Filters from '../view/filters.js';
import TripInfo from '../view/trip-info.js';
import TripInfoContent from '../view/trip-info-content.js';
import TripCost from '../view/trip-cost.js';

export default class PresenterHeader {
  filtersComponent = new Filters();
  tripInfoComponent = new TripInfo();
  tripInfoMainComponent = new TripInfoContent();
  tripInfoCostComponent = new TripCost();

  constructor ({presenterContainer}) {
    this.presenterContainer = presenterContainer;
  }

  siteFiltersContainer = document.querySelector('.trip-controls__filters');
  siteTripMainContainer = document.querySelector('.trip-main');

  init() {
    render(this.tripInfoComponent, this.siteTripMainContainer, RenderPosition.AFTERBEGIN); //инфо
    render(this.tripInfoMainComponent, this.tripInfoComponent.element); //основная инфо
    render(this.tripInfoCostComponent, this.tripInfoComponent.element); //цена
    render(this.filtersComponent, this.siteFiltersContainer); //фильтры
  }
}
