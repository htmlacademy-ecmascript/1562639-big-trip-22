const TYPE_POINT = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const DESCRIPTION = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Cras aliquet varius magna, non porta ligula feugiat eget.', 'Fusce tristique felis at fermentum pharetra.', 'Aliquam id orci ut lectus varius viverra.', 'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.', 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.', 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.', 'Sed sed nisi sed augue convallis suscipit in sed felis.', 'Aliquam erat volutpat.', 'Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'];
const POINT_COUNT = 4;

const MINUTES_IN_HOURS = 60;
const HOURS_IN_DAY = 24;
const MINUTES_IN_DAYS = MINUTES_IN_HOURS * HOURS_IN_DAY;

const DateFormat = {
  FULL_DATE: 'DD/MM/YY HH:mm',
  DATE: 'MMM D',
  TIME: 'HH:mm',
  DURATION_MINUTES: 'mm[M]',
  DURATION_HOURS_MINUTES: 'HH[H] mm[M]',
  DURATION_DAYS_HOURS_MINUTES: 'DD[D] HH[H] mm[M]',
};

const getDefaultPoint = () => ({
  basePrice: 0,
  dateFrom: new Date(). toISOString(),
  dateTo: new Date().toISOString(),
  destination: 0,
  isFavorite: false,
  offers: [],
  type: TYPE_POINT[0],
});

export {TYPE_POINT, DESCRIPTION, POINT_COUNT, MINUTES_IN_HOURS, MINUTES_IN_DAYS, DateFormat, getDefaultPoint};
