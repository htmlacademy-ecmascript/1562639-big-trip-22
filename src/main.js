import {render, RenderPosition} from './framework/render.js';
import PointsModel from './model/points-model';
import BoardPresenter from './presenter/board-presenter';
import FilterModel from './model/filter-model';
import NewEventButtonView from './view/new-event-button-view';
// import AddNewPointView from './view/add-new-point-view.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteFilterContainer = siteHeaderElement.querySelector('.trip-main__trip-controls');
const siteMainElement = document.querySelector('.page-main');
const siteTripEventsElement = siteMainElement.querySelector('.trip-events');

const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter({
  headerContainer: siteFilterContainer,
  boardContainer: siteTripEventsElement,
  pointsModel,
  filterModel,
  onNewPointDestroy: handleNewEventFormClose,
});

const newEventButtonComponent = new NewEventButtonView({
  onClick: handleNewEventButtonClick,
});

function handleNewEventFormClose() {
  newEventButtonComponent.element.disabled = false;
}

function handleNewEventButtonClick() {
  boardPresenter.createPoint();
  // render(new AddNewPointView, siteTripEventsElement, RenderPosition.AFTERBEGIN);
  newEventButtonComponent.element.disabled = true;
}

render(newEventButtonComponent, siteFilterContainer, RenderPosition.AFTEREND);

boardPresenter.init();
