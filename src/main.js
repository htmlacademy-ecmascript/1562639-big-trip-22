import PointsModel from './model/points-model';
import BoardPresenter from './presenter/board-presenter';
import FilterModel from './model/filter-model';

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
});

boardPresenter.init();
