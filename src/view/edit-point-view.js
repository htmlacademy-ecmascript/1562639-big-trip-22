import { TYPE_POINT } from '../const.js';
import { humanizeAddPointDate } from '../utils/point.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const upFirstLetter = (word) => `${word[0].toUpperCase()}${word.slice(1)}`;
const formatOfferTitle = (title) => title.split(' '). join('_');

function createEditPointTemplate(point, destinations, offers, isEditMode) {
  const pointDestination = destinations.find((dest) => dest.id === point.destination);
  const typeOffers = offers.find((off) => off.type === point.type)?.offers ?? [];
  const pointOffers = typeOffers.filter((typeOffer) => point.offers.includes(typeOffer.id));
  const {dateFrom, dateTo, basePrice, type} = point;
  const {name, description, pictures} = pointDestination || {};
  const pointId = point.id || 0;
  const addPointTimeFrom = humanizeAddPointDate(dateFrom);
  const addPointTimeTo = humanizeAddPointDate(dateTo);


  return `
      <li class="trip-events__item">
        <form class="event event--edit" action="#" method="post">
          <header class="event__header">
            <div class="event__type-wrapper">
              <label class="event__type  event__type-btn" for="event-type-toggle-${pointId}">
                <span class="visually-hidden">Choose event type</span>
                  <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
              </label>
              <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${pointId}" type="checkbox">
              <div class="event__type-list">
                <fieldset class="event__type-group">
                  <legend class="visually-hidden">Event type</legend>
                  ${TYPE_POINT.map((pointType) => (
    `<div class="event__type-item">
                    <input id="event-type-${pointType}-${pointId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType}" ${pointType === type ? 'checked' : ''}>
                    <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-${pointId}">${upFirstLetter(pointType)}</label>
                  </div>`
  )).join('')}
                </fieldset>
              </div>
            </div>

            <div class="event__field-group  event__field-group--destination">
              <label class="event__label  event__type-output" for="event-destination-${pointId}">
                ${type}
              </label>
              <input class="event__input  event__input--destination" id="event-destination-${pointId}" type="text" name="event-destination" value="${name || ''}" list="destination-list-${pointId}" required>
              <datalist id="destination-list-${pointId}">
                ${destinations.map((destination) => `<option value="${destination.name}"></option>`).join('')}
              </datalist>
            </div>

            <div class="event__field-group  event__field-group--time">
              <label class="visually-hidden" for="event-start-time-${pointId}">From</label>
              <input class="event__input  event__input--time" id="event-start-time-${pointId}" type="text" name="event-start-time" value="${addPointTimeFrom}" required>
              &mdash;
              <label class="visually-hidden" for="event-end-time-${pointId}">To</label>
              <input class="event__input  event__input--time" id="event-end-time-${pointId}" type="text" name="event-end-time" value="${addPointTimeTo}" required>
            </div>

            <div class="event__field-group  event__field-group--price">
              <label class="event__label" for="event-price-${pointId}">
                <span class="visually-hidden">Price</span>
                &euro;
              </label>
              <input class="event__input  event__input--price" id="event-price-${pointId}" type="number" min="1" step="1" name="event-price" value="${basePrice}" required>
            </div>

            <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
            <button class="event__reset-btn" type="reset">${isEditMode ? 'Delete' : 'Cancel'}</button>
            ${pointId ? (
    `<button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>`
  ) : ''}

          </header>
          <section class="event__details">
  ${typeOffers.length ?
    `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
        ${typeOffers.map((typeOffer) => (
    `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${formatOfferTitle(typeOffer.title)}-${pointId}" data-offer-id=${typeOffer.id} type="checkbox" name="event-offer-${formatOfferTitle(typeOffer.title)}" ${pointOffers.map((offer) => offer.id).includes(typeOffer.id) ? 'checked' : ''}>
      <label class="event__offer-label" for="event-offer-${formatOfferTitle(typeOffer.title)}-${pointId}">
          <span class="event__offer-title">${typeOffer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${typeOffer.price}</span>
        </label>
      </div>`
  )).join('')}
    </div>
  </section>`
    : ''}

      ${pointDestination ? (
    `<section class="event__section  event__section--destination">
  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
  <p class="event__destination-description">${description}</p>
  ${pictures.length ? (
      `<div class="event__photos-container">
  <div class="event__photos-tape">
  ${pictures.map((pic) => `<img class="event__photo" src="${pic.src}" alt="${pic.description}">`)}
  </div>
              </div>`
    ) : ''}
  </section>`
  ) : ''}

          </section>
        </form>
      </li>`;
}

export default class EditPointView extends AbstractStatefulView {
  #destinations = null;
  #offers = null;
  #handleFormSubmit = null;
  #handleCloseEditClick = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #handleDeleteClick = null;
  #isEditMode = null;

  constructor({point, destinations, offers, onFormSubmit, onCloseEditClick, onDeleteClick, isEditMode}) {
    super();
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseEditClick = onCloseEditClick;
    this.#handleDeleteClick = onDeleteClick;
    this.#isEditMode = isEditMode;

    this._setState(EditPointView.parsePointToState(point));
    this._restoreHandlers();
  }

  get template() {
    return createEditPointTemplate(this._state.point, this.#destinations, this.#offers, this.#isEditMode);
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  reset (point) {
    this.updateElement(
      EditPointView.parsePointToState(point)
    );
  }

  _restoreHandlers = () => {
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#onCloseEditClick);

    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#typeChangeHandler);

    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);

    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#offersChangeHandler);

    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#priceChangeHandler);

    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#formDeleteClickHandler);

    this.#setDatepickers();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditPointView.parseStateToPoint(this._state));
  };

  #onCloseEditClick = (evt) => {
    evt.preventDefault();
    this.#handleCloseEditClick();
  };

  #typeChangeHandler = (evt) => {
    this.updateElement({point: {...this._state.point, type: evt.target.value, offers: []}});
  };

  #destinationChangeHandler = (evt) => {
    const selectedDestination = this.#destinations.find((pointDestination) => pointDestination.name === evt.target.value);
    const selectedDestinationId = (selectedDestination) ? selectedDestination.id : null;
    this.updateElement({point: {...this._state.point, destination: selectedDestinationId}});
  };

  #offersChangeHandler = () => {
    const checkedBoxes = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));

    this._setState({point: {...this._state.point, offers: checkedBoxes.map((element) => element.dataset.offerId)}});
  };

  #priceChangeHandler = (evt) => {
    this._setState({point: {...this._state.point, basePrice: evt.target.value}});
  };

  #dateFromCloseHandler = ([userDate]) => {
    this._setState({point: {...this._state.point, dateFrom: userDate}});
    this.#datepickerTo.set('minDate', this._state.point.dateFrom);
  };

  #dateToCloseHandler = ([userDate]) => {
    this._setState({point: {...this._state.point, dateTo: userDate}});
    this.#datepickerFrom.set('maxDate', this._state.point.dateTo);
  };

  #setDatepickers = () => {
    const [dateFromElement, dateToElement] = this.element.querySelectorAll('.event__input--time');
    const commonConfig = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      locale: {firstDayOfWeek: 1},
      'time_24h': true,
    };

    this.#datepickerFrom = flatpickr(
      dateFromElement,
      {
        ...commonConfig,
        defaultDate: this._state.point.dateFrom,
        onClose: this.#dateFromCloseHandler,
        maxDate: this._state.point.dateTo
      }
    );

    this.#datepickerTo = flatpickr(
      dateToElement,
      {
        ...commonConfig,
        defaultDate: this._state.point.dateTo,
        onClose: this.#dateToCloseHandler,
        minDate: this._state.point.dateFrom
      }
    );
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditPointView.parseStateToPoint(this._state));
  };

  static parsePointToState(point) {
    return {point};
  }

  static parseStateToPoint(state) {
    return state.point;
  }
}
