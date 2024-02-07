import PresenterMain from './presenter/presenter-main.js';
import PointsModel from './model/points-model.js';
import PointsApiService from './points-api-service.js';

const AUTHORIZATION = 'Basic G5flmyeZ9jbtPBUhDiygdfgduytthkdgdjilk';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const siteTripMainContainer = document.querySelector('.trip-main');
const siteFiltersContainer = document.querySelector('.trip-controls__filters');
const siteTripEventsContainer = document.querySelector('.trip-events');
const newEventButtonContainer = document.querySelector('.trip-main__event-add-btn');

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION),
});

newEventButtonContainer.addEventListener('click', handleNewEventButtonClick);

const presenterMain = new PresenterMain({
  presenterTripMain: siteTripMainContainer,
  filtersContainer: siteFiltersContainer,
  presenterContainer: siteTripEventsContainer,
  pointsModel,
  onNewPointDestroy: handleNewPointFormClose,
  newEventButtonContainer
});

function handleNewPointFormClose() {
  newEventButtonContainer.disabled = false;
  presenterMain.createNoPoints();
}

function handleNewEventButtonClick() {
  presenterMain.createPoint();
  newEventButtonContainer.disabled = true;
}

presenterMain.init();
pointsModel.init();

