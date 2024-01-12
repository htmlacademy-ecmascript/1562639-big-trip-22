import PointsListView from '../view/points-list-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import SortingView from '../view/sorting-view';
import {render} from '../framework/render.js';
import { getDefaultPoint } from '../const.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;

  #pointListComponent = new PointsListView();

  #boardPoints = [];
  #destinations = null;
  #offers = null;

  constructor({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];

    this.#destinations = this.#pointsModel.destinations;
    this.#offers = this.#pointsModel.offers;

    render(new SortingView(), this.#boardContainer);
    render(this.#pointListComponent, this.#boardContainer);
    render(new EditPointView({point: getDefaultPoint(), destinations: this.#destinations, offers: this.#offers}), this.#pointListComponent.element);
    render(new EditPointView({point: this.#boardPoints[0], destinations: this.#destinations, offers: this.#offers}), this.#pointListComponent.element);

    for (let i = 1; i < this.#boardPoints.length; i++) {
      render(new PointView({point: this.#boardPoints[i], destinations: this.#destinations, offers: this.#offers}), this.#pointListComponent.element);
    }
  }
}
