import PointsListView from '../view/points-list-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import SortingView from '../view/sorting-view';
import {render} from '../render.js';

export default class BoardPresenter {
  pointListComponent = new PointsListView();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(new SortingView(), this.boardContainer);
    render(this.pointListComponent, this.boardContainer);
    render(new EditPointView(), this.pointListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.pointListComponent.getElement());
    }
  }
}
