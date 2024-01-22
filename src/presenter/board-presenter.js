import PointsListView from '../view/points-list-view.js';
import PointView from '../view/point-view.js';
import SortingView from '../view/sorting-view';
import {render, replace} from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
// import FilterView from '../view/filter-view.js';
// import NewEventButtonView from '../view/new-event-button-view.js';
import NoEventView from '../view/no-event-view.js';

export default class BoardPresenter {
  #boardContainer = null;
  // #headerContainer = null;
  #pointsModel = null;

  #pointListComponent = new PointsListView();
  // #filters = new FilterView();
  // #newEventButton = new NewEventButtonView();
  #sortComponent = new SortingView();
  #noEventComponent = new NoEventView();

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

    this.#renderBoard();
  }

  #renderPoints(point, destinations, offers) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      point,
      destinations,
      offers,
      onEditClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      },
    });

    const pointEditComponent = new EditPointView({
      point,
      destinations,
      offers,
      onFormSubmit: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onCloseEditClick: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
    });

    function replacePointToForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToPoint() {
      replace(pointComponent, pointEditComponent);
    }

    render (pointComponent, this.#pointListComponent.element);
  }

  #renderSort() {
    render(this.#sortComponent, this.#boardContainer);
  }

  #renderNoPoints() {
    if (this.#boardPoints.length === 0) {
      render(this.#noEventComponent, this.#boardContainer);
    }
  }

  #renderPointsList() {
    render(this.#pointListComponent, this.#boardContainer);

    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoints(this.#boardPoints[i], this.#destinations, this.#offers);
    }
  }

  #renderBoard() {
    // render(this.#filters, this.#headerContainer);
    // render(this.#newEventButton, this.#headerContainer, RenderPosition.AFTEREND);

    this.#renderNoPoints();
    this.#renderSort();

    this.#renderPointsList();
  }
}
