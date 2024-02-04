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
const newEventButtonElement = document.querySelector('.trip-main__event-add-btn');
newEventButtonElement.addEventListener('click', handleNewEventButtonClick);

const presenterMain = new PresenterMain({
  presenterTripMain: siteTripMainContainer,
  filtersContainer: siteFiltersContainer,
  presenterContainer: siteTripEventsContainer,
  pointsModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose
});

function handleNewPointFormClose() {
  newEventButtonElement.disabled = false;
}

function handleNewEventButtonClick() {
  presenterMain.createPoint();
  newEventButtonElement.disabled = true;
}

presenterMain.init();

