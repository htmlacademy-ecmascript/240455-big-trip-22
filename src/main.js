import PresenterHeader from './presenter/presenter-header.js';
import PresenterMain from './presenter/presenter-main.js';

const siteHeaderElement = document.querySelector('header');
const siteTripEventsContainer = document.querySelector('.trip-events');
const presenterHeader = new PresenterHeader({presenterContainer: siteHeaderElement});
const presenterMain = new PresenterMain({presenterContainer: siteTripEventsContainer});

presenterHeader.init();
presenterMain.init();
