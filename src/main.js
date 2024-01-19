import PointsModel from './model/model';
import FilterView from './view/filter-view';
import BoardPresenter from './presenter/board-presenter';
import {render} from './framework/render.js';
import NewEventButtonView from './view/new-event-button-view.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteHeaderContainer = siteHeaderElement.querySelector('.trip-main');
const siteFilterContainer = siteHeaderElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const siteTripEventsElement = siteMainElement.querySelector('.trip-events');

const pointsModel = new PointsModel();

const boardPresenter = new BoardPresenter({
  boardContainer: siteTripEventsElement,
  pointsModel,
});

render(new FilterView(), siteFilterContainer);
render(new NewEventButtonView(), siteHeaderContainer);

boardPresenter.init();
