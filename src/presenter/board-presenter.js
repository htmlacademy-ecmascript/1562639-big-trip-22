import PointsListView from '../view/points-list-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import SortingView from '../view/sorting-view';
import {render} from '../render.js';
// import { getDefaultPoint } from '../const.js';

export default class BoardPresenter {
  pointListComponent = new PointsListView();

  constructor({boardContainer, pointsModel}) {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.boardPoints = [...this.pointsModel.getPoints()];
    // const points = this.pointsModel.getPoints();
    // const destinations = this.pointsModel.getDestination();
    // const offers = this.pointsModel.getOffers();

    render(new SortingView(), this.boardContainer);
    render(this.pointListComponent, this.boardContainer);
    render(new EditPointView({point: this.boardPoints[0]}), this.pointListComponent.getElement());
    // render(new EditPointView(getDefaultPoint(), destinations, offers), this.pointListComponent.getElement());
    // render(new EditPointView(points[1], destinations, offers), this.pointListComponent.getElement());

    for (let i = 1; i < this.boardPoints.length; i++) {
      render(new PointView({point: this.boardPoints[i]
        // destinations: this.pointsModel.getDestination(),
        // offers: this.pointsModel.getOffers(),
      }), this.pointListComponent.getElement());
    }
    // for (const point of points) {
    //   render(new PointView(point, destinations,offers), this.pointListComponent.getElement);
    // }
  }
}
