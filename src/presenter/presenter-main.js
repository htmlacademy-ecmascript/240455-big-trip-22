import { render } from '../render.js';
import Sorting from '../view/sorting.js';
import EventsList from '../view/events-list.js';
import EventsListItem from '../view/events-list-item.js';
import Event from '../view/event.js';
import NewPoint from '../view/new-point.js';

export default class PresenterMain {
  sortingComponent = new Sorting();
  eventsListComponent = new EventsList();
  eventListItemComponent = new EventsListItem();
  formComponent = new NewPoint();

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
    console.log(destinationModel);
  }
}
