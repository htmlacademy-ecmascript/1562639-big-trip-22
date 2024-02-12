import PointView from '../view/point-view.js';
import {render, replace, remove} from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
import { UserAction, UpdateType } from '../const.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #point = [];
  #destinations = null;
  #offers = null;
  #mode = Mode.DEFAULT;

  constructor({destinations, offers, pointListContainer, onDataChange, onModeChange}) {
    this.#destinations = destinations;
    this.#offers = offers;
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onEditClick: this.#handleOpenEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#pointEditComponent = new EditPointView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: this.#handleFormSubmit,
      onCloseEditClick: this.#handleCloseEditClick,
      onDeleteClick: this.#handleDeleteClick,
      isEditMode: true,
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  }

  #replacePointToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  };

  #handleOpenEditClick = () => {
    this.#replacePointToForm();
  };

  #handleCloseEditClick = () => {
    this.#pointEditComponent.reset(this.#point);
    this.#replaceFormToPoint();

  };

  #handleFavoriteClick = () => {
    this.#handleDataChange (
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      { ...this.#point, isFavorite: !this.#point.isFavorite }
    );
  };

  #handleFormSubmit = (point) => {
    this.#replaceFormToPoint(point);
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      point);
  };

  #handleDeleteClick = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point
    );
  };
}
