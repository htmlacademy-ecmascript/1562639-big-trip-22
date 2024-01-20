import AbstractView from '../framework/view/abstract-view';
import { TextNoEvent } from '../const';

function createNoPointTemplate() {
  return (
    `<p class="trip-events__msg">
      ${TextNoEvent.EVERYTHING}
    </p>`
  );
}

export default class NoEventView extends AbstractView {
  get template() {
    return createNoPointTemplate();
  }
}
