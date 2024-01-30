import PointsModel from './model/model';
import BoardPresenter from './presenter/board-presenter';

const siteHeaderElement = document.querySelector('.page-header');
const siteFilterContainer = siteHeaderElement.querySelector('.trip-main__trip-controls');
const siteMainElement = document.querySelector('.page-main');
const siteTripEventsElement = siteMainElement.querySelector('.trip-events');

const pointsModel = new PointsModel();

const boardPresenter = new BoardPresenter({
  headerContainer: siteFilterContainer,
  boardContainer: siteTripEventsElement,
  pointsModel,
});

boardPresenter.init();
