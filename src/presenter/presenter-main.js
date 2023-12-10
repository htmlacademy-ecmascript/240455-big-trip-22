import {render} from '../render.js';
import SortingView from '../view/sorting-view.js';
import EventsList from '../view/events-list.js';
import EventsListItem from '../view/event-list-item.js';
import FormAddPoint from '../view/new-point-view.js';
import Event from '../view/event.js';


export default class PresenterMain {
  sortingComponent = new SortingView();
  eventsListComponent = new EventsList();
  eventListItemComponent = new EventsListItem();
  formComponent = new FormAddPoint();

  constructor ({presenterContainer}) {
    this.presenterContainer = presenterContainer;
  }

  init() {
    render(this.sortingComponent, this.presenterContainer); //сортировка
    render(this.eventsListComponent, this.presenterContainer); //список ul
    render(this.eventListItemComponent, this.eventsListComponent.getElement()); // пункт списка li
    render(this.formComponent, this.eventListItemComponent.getElement());
    for (let i = 0; i < 3; i++) {
      render(new EventsListItem(), this.eventsListComponent.getElement());
      render(new Event(), this.eventsListComponent.getElement().lastElementChild);
    }
  }
}
