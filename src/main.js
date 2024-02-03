import PresenterMain from './presenter/presenter-main.js';
import MockService from './service/mock-service.js';
import PointsModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';

const mockService = new MockService();
const pointsModel = new PointsModel(mockService);
const filterModel = new FilterModel();
const siteTripMainContainer = document.querySelector('.trip-main');
const siteFiltersContainer = document.querySelector('.trip-controls__filters');
const siteTripEventsContainer = document.querySelector('.trip-events');

const presenterMain = new PresenterMain({
  presenterTripMain: siteTripMainContainer,
  presenterFilters: siteFiltersContainer,
  presenterContainer: siteTripEventsContainer,
  pointsModel,
  filterModel
});

presenterMain.init();

