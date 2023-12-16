import SortingView from './view/sorting-view';
import FilterView from './view/filter-view';
import PointsListPresenter from './presenter/point-list-presenter';
import {render} from './render';

const siteHeaderElement = document.querySelector('.page-header');
const siteFilterContainer = siteHeaderElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const siteTripEventsElement = siteMainElement.querySelector('.trip-events');
const pointListPresenter = new PointsListPresenter({pointListContainer: siteTripEventsElement});

render(new FilterView(), siteFilterContainer);
render(new SortingView(), siteTripEventsElement);

pointListPresenter.init();
