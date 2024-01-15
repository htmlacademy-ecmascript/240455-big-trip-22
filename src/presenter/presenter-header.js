import { render, RenderPosition } from '../framework/render.js';
import Filters from '../view/filters.js';
import TripInfo from '../view/trip-info.js';
import TripInfoContent from '../view/trip-info-content.js';
import TripCost from '../view/trip-cost.js';
import { generateFilter } from '../mock/filter.js';

export default class PresenterHeader {
  #tripInfoComponent = new TripInfo();
  #tripInfoMainComponent = new TripInfoContent();
  #tripInfoCostComponent = new TripCost();
  #pointsModel = null;
  #points = null;
  #siteFiltersContainer = document.querySelector('.trip-controls__filters');
  #siteTripMainContainer = document.querySelector('.trip-main');

  constructor ({pointsModel}) {
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    const filters = generateFilter(this.#points);

    render(this.#tripInfoComponent, this.#siteTripMainContainer, RenderPosition.AFTERBEGIN); //инфо
    render(this.#tripInfoMainComponent, this.#tripInfoComponent.element); //основная инфо
    render(this.#tripInfoCostComponent, this.#tripInfoComponent.element); //цена
    render(new Filters({filters}), this.#siteFiltersContainer); //фильтры
  }
}
