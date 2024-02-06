import PresenterMain from './presenter/presenter-main.js';
import PointsModel from './model/points-model.js';
import PointsApiService from './points-api-service.js';

const AUTHORIZATION = 'Basic G5flmyeZ9tPBUhDi';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const siteTripMainContainer = document.querySelector('.trip-main');
const siteFiltersContainer = document.querySelector('.trip-controls__filters');
const siteTripEventsContainer = document.querySelector('.trip-events');
const newEventButtonElement = document.querySelector('.trip-main__event-add-btn');

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION),
  newEventButtonElement,
});

newEventButtonElement.addEventListener('click', handleNewEventButtonClick);

const presenterMain = new PresenterMain({
  presenterTripMain: siteTripMainContainer,
  filtersContainer: siteFiltersContainer,
  presenterContainer: siteTripEventsContainer,
  pointsModel,
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
pointsModel.init()
  .finally(() => {
    newEventButtonElement.disabled = false;
  });

