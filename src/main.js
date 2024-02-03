import PresenterHeader from './presenter/presenter-header.js';
import PresenterMain from './presenter/presenter-main.js';
import MockService from './service/mock-service.js';
import PointsModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';

const mockService = new MockService();
const pointsModel = new PointsModel(mockService);
const filterModel = new FilterModel();
const siteTripEventsContainer = document.querySelector('.trip-events');

const presenterHeader = new PresenterHeader({pointsModel});
const presenterMain = new PresenterMain({
  presenterContainer: siteTripEventsContainer,
  pointsModel
});

presenterHeader.init();
presenterMain.init();

