import { POINT_COUNT } from '../const';
import { mockDestinations } from '../mock/destination';
import { mockOffers } from '../mock/offers';
import { getRandomPoint } from '../mock/point';

export default class PointsModel {
  #points = Array.from({length: POINT_COUNT}, getRandomPoint).map((item, i) => ({...item, id: i + 1}));
  #offers = mockOffers;
  #destinations = mockDestinations;

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

}
