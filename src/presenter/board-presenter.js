import PointsListView from '../view/points-list-view.js';
import SortingView from '../view/sorting-view';
import FilterView from '../view/filter-view.js';
import {RenderPosition, render, remove} from '../framework/render.js';
import NoEventView from '../view/no-event-view.js';
import PointPresenter from './point-presenter.js';
import { SortType, UpdateType, UserAction } from '../const.js';
import {sortPointByDay, sortPointByDuration, sortPointByPrice} from '../utils/point.js';
import {generateSorting} from '../mock/sorting.js';
import NewEventButtonView from '../view/new-event-button-view.js';
import AddNewPointView from '../view/add-new-point-view.js';
import FilterModel from '../model/filter-model';

export default class BoardPresenter {
  #headerContainer = null;
  #boardContainer = null;
  #pointsModel = null;
  #filterModel = new FilterModel();

  #pointListComponent = new PointsListView();
  #sortComponent = null;
  #filterComponent = null;
  #noEventComponent = new NoEventView();
  #newEventComponent = new AddNewPointView();

  #destinations = null;
  #offers = null;

  #pointPresenters = new Map();

  #currentSortType = SortType.DAY;
  #sortingState = generateSorting(this.#currentSortType);

  #filters = [
    {
      type: 'everything',
      count: 0,
    },
  ];

  constructor({headerContainer, boardContainer, pointsModel, filterModel}) {
    this.#headerContainer = headerContainer;
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.DAY:
        return [...this.#pointsModel.points].sort(sortPointByDay);
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
    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    // В зависимости от типа изменений решаем, что делать:
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялась стоимость)
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда точка удалена или добавлена новая)
        this.#clearPointList();
        this.#renderSort();
        this.#renderPointsList();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this.#clearPointList({resetSortType: true});
        this.#renderPointsList();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    // - Сортируем задачи
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
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
      onDataChange: this.#handleViewAction,
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
    render(this.#noEventComponent, this.#boardContainer, RenderPosition.AFTEREND);
  }

  #clearPointList({resetSortType = false} = {}) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    remove(this.#sortComponent);
    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderPointsList() {
    render(this.#pointListComponent, this.#boardContainer);

    for (let i = 0; i < this.points.length; i++) {
      this.#renderPoints(this.points[i]);
    }
  }

  #renderFilter() {
    this.#filterComponent = new FilterView({
      filters: this.#filters,
      currentFilterType: 'everything',
      onFilterTypeChange: () => {}
    });
    render(this.#filterComponent, this.#headerContainer);
    render(new NewEventButtonView({onClick: this.#handleNewEventClick}), this.#headerContainer, RenderPosition.AFTEREND);

  }

  #handleNewEventClick = () => {
    render(this.#newEventComponent, this.#pointListComponent.element, RenderPosition.AFTERBEGIN);
  };

  #renderBoard() {
    this.#renderSort();
    this.#renderFilter();
    this.#renderPointsList();
    if (this.#pointsModel.points.length === 0) {
      this.#renderNoPoints();
    }
  }
}

