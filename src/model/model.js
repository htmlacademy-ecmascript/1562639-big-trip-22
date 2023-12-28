import { POINT_COUNT } from '../const';
import { mockDestinations } from '../mock/destination';
import { mockOffers } from '../mock/offers';
import { getRandomPoint } from '../mock/point';

export default class PointsModel {
  points = Array.from({length: POINT_COUNT}, getRandomPoint);
  offers = mockOffers;
  destinations = mockDestinations;
  // constructor() {
  //   this.points = [];
  //   this.destinations = [];
  //   this.offers = [];
  // }

  // init() {
  //   this.points = Array.from({length: POINT_COUNT}, getRandomPoint);
  //   this.offers = mockOffers;
  //   this.destinations = mockDestinations;
  // }

  getPoints() {
    return this.points;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }
  // constructor() {
  //   this.points = [];
  //   this.destinations = [];
  //   this.offers = [];
  // }

  // init() {
  //   this.points = points;
  //   this.offers = offers;
  //   this.destinations = destinations;
  // }


  // getPoints() {
  //   return this.points;
  // }

  // getOffers() {
  //   return this.offers;
  // }

  // getOfferByType(type) {
  //   const allOffers = this.getOffer();
  //   return allOffers.find((offer) => offer.type === type);
  // }

  // getOfferById(type, itemsId) {
  //   const offersType = this.getOfferByType(type);

  //   return offersType.offers.filter((item) => itemsId.find((id) => item.id === id));
  // }

  // getDestinations() {
  //   return this.destinations;
  // }

  // getDestinationById(id) {
  //   const allDestination = this.getDestination();
  //   return allDestination.find((item) => item.id === id);
  // }
}
