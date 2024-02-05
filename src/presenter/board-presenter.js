import PointsListView from '../view/points-list-view.js';
import SortingView from '../view/sorting-view';
import FilterView from '../view/filter-view.js';
import {RenderPosition, render, remove} from '../framework/render.js';
import NoEventView from '../view/no-event-view.js';
import PointPresenter from './point-presenter.js';
import { SortType } from '../const.js';
import {sortPointByDay, sortPointByDuration, sortPointByPrice} from '../utils/point.js';
import {generateSorting} from '../mock/sorting.js';
import { generateFilter } from '../mock/filter.js';
import NewEventButtonView from '../view/new-event-button-view.js';

export default class BoardPresenter {
  #headerContainer = null;
  #boardContainer = null;
  #pointsModel = null;

  #pointListComponent = new PointsListView();
  #sortComponent = null;
  #filterComponent = null;
  #noEventComponent = new NoEventView();

  #destinations = null;
  #offers = null;

  #pointPresenters = new Map();

  #currentSortType = SortType.DAY;
  #sortingState = generateSorting(this.#currentSortType);

  #filters = null;

  constructor({headerContainer, boardContainer, pointsModel}) {
    this.#headerContainer = headerContainer;
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.TIME:
        return [...this.#pointsModel.points].sort(sortPointByDuration);
      case SortType.PRICE:
        return [...this.#pointsModel.points].sort(sortPointByPrice);
    }
    return [...this.#pointsModel.points].sort(sortPointByDay);
  }

  init() {
    this.#destinations = this.#pointsModel.destinations;
    this.#offers = this.#pointsModel.offers;
    this.#filters = generateFilter([...this.#pointsModel.points]);
    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleSortTypeChange = (sortType) => {
    // - Сортируем задачи
    if (this.#currentSortType === sortType) {
      return;
    }
    // - Очищаем список
    this.#clearPointList();
    // - Рендерим список заново
    this.#rerenderSort();
    this.#renderPointsList();
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
      onSortTypeChange: this.#handleSortTypeChange,
      sorting: this.#sortingState,
      currentSort: this.#currentSortType,
    });
    render(this.#sortComponent, this.#boardContainer);
  }

  #rerenderSort() {
    remove(this.#sortComponent);
    this.#renderSort();
  }

  #renderNoPoints() {
    if (this.#pointsModel.points.length === 0) {
      render(this.#noEventComponent, this.#boardContainer, RenderPosition.AFTEREND);
    }
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderPointsList() {
    render(this.#pointListComponent, this.#boardContainer);

    for (let i = 0; i < this.#pointsModel.points.length; i++) {
      this.#renderPoints(this.#pointsModel.points[i]);
    }
  }

  #renderFilter() {
    this.#filterComponent = new FilterView({filters: this.#filters});
    render(this.#filterComponent, this.#headerContainer);
    render(new NewEventButtonView(), this.#headerContainer, RenderPosition.AFTEREND);

  }

  #renderBoard() {
    this.#renderNoPoints();
    this.#renderSort();
    this.#renderFilter();
    this.#renderPointsList();
  }
}
