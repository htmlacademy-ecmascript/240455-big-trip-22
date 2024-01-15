import { render, replace } from '../framework/render.js';
import { isEscapeKey } from '../utils/common.js';
import EventsListItem from '../view/events-list-item.js';
import EditablePoint from '../view/editable-point.js';
import Event from '../view/event.js';

export default class PresenterPoint {
  #destinationModel = null;
  #offersModel = null;
  #eventsListComponent = null;

  constructor({destinationModel, offersModel, eventsListComponent}) {
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
    this.#eventsListComponent = eventsListComponent;
  }

  init(point) {
    const escKeyDownHandler = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        replaceFormToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };
    const destinationId = point.destination;
    const destination = this.#destinationModel.getById(destinationId);
    const type = point.type;
    const offers = this.#offersModel.getByType(type);
    const list = this.#eventsListComponent.element;
    const listItem = new EventsListItem();
    const form = new EditablePoint({
      point,
      offers,
      destination,
      onClick: () => {
        replaceFormToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onFormSubmit: () => {
        replaceFormToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
    });
    const event = new Event({
      point,
      offers,
      destination,
      onClick: () => {
        replaceEventToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceFormToEvent() {
      replace(event, form);
    }

    function replaceEventToForm() {
      replace(form, event);
    }

    render(listItem, list); //рендерим li
    render(event, listItem.element); //рендерим точку в li
  }
}
