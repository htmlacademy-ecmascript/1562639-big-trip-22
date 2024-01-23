import PointsListView from '../view/points-list-view.js';
import SortingView from '../view/sorting-view';
import {render} from '../framework/render.js';
import NoEventView from '../view/no-event-view.js';
import PointPresenter from './point-presenter.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;

  #pointListComponent = new PointsListView();
  #sortComponent = new SortingView();
  #noEventComponent = new NoEventView();

  #boardPoints = [];
  #destinations = null;
  #offers = null;

  #pointPresenters = new Map();

  constructor({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];
    this.#destinations = this.#pointsModel.destinations;
    this.#offers = this.#pointsModel.offers;

    this.#renderBoard();
  }

  #renderPoints(point, destinations, offers) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element
    });

    pointPresenter.init(point, destinations, offers);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderSort() {
    render(this.#sortComponent, this.#boardContainer);
  }

  #renderNoPoints() {
    if (this.#boardPoints.length === 0) {
      render(this.#noEventComponent, this.#boardContainer);
    }
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderPointsList() {
    render(this.#pointListComponent, this.#boardContainer);

    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoints(this.#boardPoints[i], this.#destinations, this.#offers);
    }
  }

  #renderBoard() {
    this.#renderNoPoints();
    this.#renderSort();

    this.#renderPointsList();
  }
}
