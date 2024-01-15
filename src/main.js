import PresenterHeader from './presenter/presenter-header.js';
import PresenterMain from './presenter/presenter-main.js';
import MockService from './service/mock-service.js';
import OffersModel from './model/offers-model.js';
import PointsModel from './model/points-model.js';
import DestinationsModel from './model/destinations-model.js';

const mockService = new MockService();
const destinationModel = new DestinationsModel(mockService);
const offersModel = new OffersModel(mockService);
const pointsModel = new PointsModel(mockService);
const siteTripEventsContainer = document.querySelector('.trip-events');

const presenterHeader = new PresenterHeader({pointsModel});
const presenterMain = new PresenterMain({
  presenterContainer: siteTripEventsContainer,
  destinationModel,
  offersModel,
  pointsModel
});

presenterHeader.init();
presenterMain.init();

