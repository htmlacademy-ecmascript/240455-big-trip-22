import { render } from '../render.js';
import Sorting from '../view/sorting.js';
import EventsList from '../view/events-list.js';
import EventsListItem from '../view/events-list-item.js';
import Event from '../view/event.js';
import NewPoint from '../view/new-point.js';

export default class PresenterMain {
  constructor ({presenterContainer, destinationModel, offersModel, pointsModel}) {
    this.presenterContainer = presenterContainer;
    this.destinationModel = destinationModel;
    this.offersModel = offersModel;
    this.pointsModel = pointsModel;
  }

  init() {
    this.destination = [...this.destinationModel.get()];
    this.offers = [...this.offersModel.get()];
    this.points = [...this.pointsModel.get()];

    this.sortingComponent = new Sorting(); //сортировка
    this.eventsListComponent = new EventsList(); //ul
    this.eventListItemComponent = new EventsListItem(); //li
    this.formComponent = new NewPoint({point: this.points[0], offers: this.offers, destination: this.destination});

    render(this.sortingComponent, this.presenterContainer); //сортировка
    render(this.eventsListComponent, this.presenterContainer); //список ul
    render(this.eventListItemComponent, this.eventsListComponent.getElement()); // пункт списка li
    render(this.formComponent, this.eventListItemComponent.getElement()); //кладем форму в первый li

    for (let i = 1; i < this.points.length; i++) {
      render(new EventsListItem(), this.eventsListComponent.getElement()); //рендерим li
      render(new Event({point: this.points[i], offers: this.offers, destination: this.destination}), this.eventsListComponent.getElement().lastElementChild); //рендерим point в li
    }
  }
}
