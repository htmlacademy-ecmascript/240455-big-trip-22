export default class DestinationsModel {

  constructor(service) {
    this.service = service;
    this.destinations = this.service.getDestinations();
  }

  get() {
    return this.destinations;
  }
}
