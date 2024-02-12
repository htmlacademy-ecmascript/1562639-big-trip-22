import Observable from '../framework/observable.js';
import { POINT_COUNT } from '../const';
import { mockDestinations } from '../mock/destination';
import { mockOffers } from '../mock/offers';
import { getRandomPoint } from '../mock/point';

export default class PointsModel extends Observable {
  #pointsApiService = null;
  #points = Array.from({length: POINT_COUNT}, getRandomPoint).map((item, i) => ({...item, id: i + 1}));
  #offers = mockOffers;
  #destinations = mockDestinations;

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;

    this.#pointsApiService.points.then((points) => {
      console.log(points);
    });
  }

  get points() {
    return this.#points;
  }

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

}
