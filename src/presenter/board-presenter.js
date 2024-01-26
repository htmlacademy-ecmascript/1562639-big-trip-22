import PointsListView from '../view/points-list-view.js';
import SortingView from '../view/sorting-view';
import {RenderPosition, render} from '../framework/render.js';
import NoEventView from '../view/no-event-view.js';
import PointPresenter from './point-presenter.js';
import {updateItem} from '../utils/utils.js';
import { SortType } from '../const.js';
import {sortPointByDay, sortPointByDuration, sortPointByPrice} from '../utils/point.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;

  #pointListComponent = new PointsListView();
  #sortComponent = null;
  #noEventComponent = new NoEventView();

  #boardPoints = [];
  #destinations = null;
  #offers = null;

  #pointPresenters = new Map();

  #currentSortType = SortType.DAY;
  #sourcedBoardPoints = [];

  constructor({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];
    this.#destinations = this.#pointsModel.destinations;
    this.#offers = this.#pointsModel.offers;

    // this.#sourcedBoardPoints = this.#boardPoints.sort(sortPointByDay);

    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #sortPoints(sortType) {
    // 2. Этот исходный массив задач необходим,
    // потому что для сортировки мы будем мутировать
    // массив в свойстве _boardTasks
    switch (sortType) {
      case SortType.TIME:
        this.#boardPoints.sort(sortPointByDuration);
        break;
      case SortType.PRICE:
        this.#boardPoints.sort(sortPointByPrice);
        break;
      default:
        // 3. А когда пользователь захочет "вернуть всё, как было",
        // мы просто запишем в _boardTasks исходный массив
        this.#boardPoints.sort(sortPointByDay);
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    // - Сортируем задачи
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    // - Очищаем список
    // - Рендерим список заново
  };

  #renderPoints(point) {
    const pointPresenter = new PointPresenter({
      destinations: this.#destinations,
      offers: this.#offers,
      pointListContainer: this.#pointListComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderSort() {
    this.#sortComponent = new SortingView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#boardContainer);
  }

  #renderNoPoints() {
    if (this.#boardPoints.length === 0) {
      render(this.#noEventComponent, this.#boardContainer, RenderPosition.AFTEREND);
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
