import FilterView from './view/filter-view';
import BoardPresenter from './presenter/board-presenter';
import {render} from './render';

const siteHeaderElement = document.querySelector('.page-header');
const siteFilterContainer = siteHeaderElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const siteTripEventsElement = siteMainElement.querySelector('.trip-events');
const boardPresenter = new BoardPresenter({boardContainer: siteTripEventsElement});

render(new FilterView(), siteFilterContainer);

boardPresenter.init();
