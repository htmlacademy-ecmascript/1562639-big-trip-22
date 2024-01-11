import PointsListView from '../view/points-list-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import SortingView from '../view/sorting-view';
import {render} from '../framework/render.js';
import { getDefaultPoint } from '../const.js';

export default class BoardPresenter {
  pointListComponent = new PointsListView();

  constructor({boardContainer, pointsModel}) {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.boardPoints = [...this.pointsModel.getPoints()];

    const destinations = this.pointsModel.getDestinations();
    const offers = this.pointsModel.getOffers();

    render(new SortingView(), this.boardContainer);
    render(this.pointListComponent, this.boardContainer);
    render(new EditPointView({point: getDefaultPoint(), destinations: destinations, offers: offers}), this.pointListComponent.element);
    render(new EditPointView({point: this.boardPoints[0], destinations: destinations, offers: offers}), this.pointListComponent.element);

    for (let i = 1; i < this.boardPoints.length; i++) {
      render(new PointView({point: this.boardPoints[i], destinations: destinations, offers: offers}), this.pointListComponent.element);
    }
  }
}
