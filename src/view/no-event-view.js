import AbstractView from '../framework/view/abstract-view';
import { TextNoEvent, FilterType } from '../const';

const noPointTextType = {
  [FilterType.EVERYTHING]: TextNoEvent.EVERYTHING,
  [FilterType.PAST]: TextNoEvent.PAST,
  [FilterType.PRESENT]: TextNoEvent.PRESENT,
  [FilterType.FUTURE]: TextNoEvent.FUTURE,
};

function createNoPointTemplate(filterType) {
  const noPointTextValue = noPointTextType[filterType];

  return (
    `<p class="trip-events__msg">
      ${noPointTextValue}
    </p>`
  );
}

export default class NoEventView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPointTemplate(this.#filterType);
  }
}
