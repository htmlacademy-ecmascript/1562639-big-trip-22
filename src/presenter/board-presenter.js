import PointsListView from '../view/points-list-view.js';
import SortingView from '../view/sorting-view';
import {RenderPosition, render, remove} from '../framework/render.js';
import NoEventView from '../view/no-event-view.js';
import PointPresenter from './point-presenter.js';
import { SortType, UpdateType, UserAction, FilterType } from '../const.js';
import {sortPointByDay, sortPointByDuration, sortPointByPrice} from '../utils/point.js';
import {generateSorting} from '../mock/sorting.js';
import NewEventButtonView from '../view/new-event-button-view.js';
import AddNewPointView from '../view/add-new-point-view.js';
import FilterPresenter from '../presenter/filter-presenter.js';
import {filter} from '../utils/utils.js';

export default class BoardPresenter {
  #headerContainer = null;
  #boardContainer = null;
  #pointsModel = null;
  #filterModel = null;

  #pointListComponent = new PointsListView();
  #sortComponent = null;
  #noEventComponent = null;
  #newEventComponent = new AddNewPointView();

  #destinations = null;
  #offers = null;

  #pointPresenters = new Map();
  #filterType = FilterType.EVERYTHING;
  #currentSortType = SortType.DAY;
  #sortingState = generateSorting(this.#currentSortType);

  constructor({headerContainer, boardContainer, pointsModel, filterModel}) {
    this.#headerContainer = headerContainer;
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortPointByDay);
      case SortType.TIME:
        return filteredPoints.sort(sortPointByDuration);
      case SortType.PRICE:
        return filteredPoints.sort(sortPointByPrice);
    }
    return filteredPoints.sort(sortPointByDay);
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
        if (this.points.length === 0) {
          this.#renderNoPoints();
        }
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this.#clearPointList({resetSortType: true});
        this.#renderSort();
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
    this.#noEventComponent = new NoEventView({
      filterType: this.#filterType
    });

    render(this.#noEventComponent, this.#boardContainer, RenderPosition.AFTEREND);
  }

  #clearPointList({resetSortType = false} = {}) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);

    if (this.#noEventComponent) {
      remove(this.#noEventComponent);
    }

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
    const filterPresenter = new FilterPresenter({
      filterContainer: this.#headerContainer,
      filterModel: this.#filterModel,
      pointsModel: this.#pointsModel,
    });
    filterPresenter.init();
  }

  #renderNewEventButton() {
    render(new NewEventButtonView({onClick: this.#handleNewEventClick}), this.#headerContainer, RenderPosition.AFTEREND);
  }

  #handleNewEventClick = () => {
    render(this.#newEventComponent, this.#pointListComponent.element, RenderPosition.AFTERBEGIN);
  };

  #renderBoard() {
    this.#renderSort();
    this.#renderFilter();
    this.#renderNewEventButton();
    this.#renderPointsList();
    if (this.points.length === 0) {
      this.#renderNoPoints();
    }
  }
}

