import HeaderInfoView from '../view/header-info-view.js';
import { render, replace, remove, RenderPosition } from '../framework/render.js';
import { UpdateType } from '../const.js';

export default class PresenterHeaderInfo {
  #siteTripMainContainer = null;
  #pointsModel = null;
  #headerInfoComponent = null;

  constructor({ siteTripMainContainer, pointsModel }) {
    this.#siteTripMainContainer = siteTripMainContainer;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get dateFrom() {
    const points = this.#pointsModel.points;

    if (points.length === 0) {
      return '';
    }
    return points[0].dateFrom;
  }

  get dateTo() {
    const points = this.#pointsModel.points;
    if (points.length === 0) {
      return '';
    }

    return points[points.length - 1].dateTo;
  }

  get destinationName() {

    const points = this.#pointsModel.points;
    if (points.length === 0) {
      return '';
    }

    const sortedPoints = points.slice().sort((firstPoint, secondPoint) => new Date(firstPoint.dateFrom) - new Date(secondPoint.dateFrom));

    const destinations = sortedPoints.map((point) => {
      const destination = this.#pointsModel.getByDestinationId(point.destination);
      return destination ? destination.name : '';
    });

    if (destinations.length > 3) {
      return `${destinations[0]} — ... — ${destinations[destinations.length - 1]}`;
    } else {
      return destinations.join(' — ');
    }
  }

  get totalCost() {
    const points = this.#pointsModel.points;

    if (points.length === 0) {
      return '';
    }
    return this.#pointsModel.totalCost;
  }

  init() {
    const points = this.#pointsModel.points;

    if (points.length === 0) {
      if (this.#headerInfoComponent) {
        remove(this.#headerInfoComponent);
      }
      return;
    }

    const prevHeaderInfoComponent = this.#headerInfoComponent;

    points.sort((firstPoint, secondPoint) => new Date(firstPoint.dateFrom) - new Date(secondPoint.dateFrom));

    const dateFrom = this.dateFrom;
    const dateTo = this.dateTo;
    const destinationName = this.destinationName;
    const totalCost = this.totalCost;

    this.#headerInfoComponent = new HeaderInfoView({
      dateFrom,
      dateTo,
      destinationName,
      cost: totalCost,
    });

    if (prevHeaderInfoComponent === null) {
      render(this.#headerInfoComponent, this.#siteTripMainContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#headerInfoComponent, prevHeaderInfoComponent);
    remove(prevHeaderInfoComponent);
  }

  #handleModelEvent = (updateType) => {
    if (updateType !== UpdateType.ERROR) {
      this.init();
    }
  };
}

