import AbstractView from '../framework/view/abstract-view.js';
import { SortType} from '../const.js';

function createSortingTemplate(sorting, currentSort) {
  const sortType = Object.values(SortType);
  return `
  (<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${sorting.map((item) => `<div class="trip-sort__item  trip-sort__item--${item.value}">
      <input
        id="sort-${item.value}"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${item.value}"
        ${sortType.includes(item.value) ? `data-sort-type="${item.value}"` : ''}
        ${item.value === currentSort ? 'checked' : ''}
        ${item.isDisabled ? 'disabled' : ''}
        >
      <label class="trip-sort__btn" for="sort-${item.value}">${item.value}</label>
    </div>`)}
  </form>) `;
}

export default class SortingView extends AbstractView {
  #handleSortTypeChange = null;
  #sorting = null;
  #currentSort = null;

  constructor({onSortTypeChange, sorting, currentSort}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.#sorting = sorting;
    this.#currentSort = currentSort;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortingTemplate(this.#sorting, this.#currentSort);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
