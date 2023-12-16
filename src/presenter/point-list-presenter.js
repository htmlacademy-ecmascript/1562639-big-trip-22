import PointsListView from '../view/points-list-view.js';
import PointView from '../view/point-view.js';
// import AddNewPointView from '../view/add-new-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import {render} from '../render.js';

export default class PointsListPresenter {
  pointListComponent = new PointsListView();

  constructor({pointListContainer}) {
    this.pointListContainer = pointListContainer;
  }

  init() {
    render(this.pointListComponent, this.pointListContainer);
    // render(new AddNewPointView, this.pointListComponent.getElement());
    render(new EditPointView, this.pointListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.pointListComponent.getElement());
    }
  }
}
