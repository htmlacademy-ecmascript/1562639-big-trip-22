import PointsModel from './model/model';
import FilterView from './view/filter-view';
import BoardPresenter from './presenter/board-presenter';
import {render} from './framework/render.js';
import NewEventButtonView from './view/new-event-button-view.js';
import {generateFilter} from './mock/filter.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteHeaderContainer = siteHeaderElement.querySelector('.page-header__container');
const siteFilterContainer = siteHeaderElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const siteTripEventsElement = siteMainElement.querySelector('.trip-events');

const pointsModel = new PointsModel();

const boardPresenter = new BoardPresenter({
  boardContainer: siteTripEventsElement,
  // headerContainer: siteHeaderContainer,
  pointsModel,
});

const filters = generateFilter(pointsModel.points);

render(new FilterView({filters}), siteFilterContainer);
render(new NewEventButtonView(), siteHeaderContainer);

boardPresenter.init();
