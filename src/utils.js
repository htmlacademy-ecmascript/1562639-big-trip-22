import dayjs from 'dayjs';

const DATE_FORMAT = {
  full: 'DD/MM/YY HH:mm',
  date: 'MMM D',
  time: 'HH:mm',
  duration: 'HH[H] mm[M]',
};

// const DATE_FORMAT = 'MMM D';
// const TIME_FORMAT = 'HH:mm';
// const DURATION_FORMAT = 'HH[H] mm[M]';

const getRandomNumber = (number) => {
  const result = Math.random() * number;
  return Math.floor(result);
};

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizeAddPointDate(date) {
  return date ? dayjs(date).format(DATE_FORMAT.full) : '';
}

function humanizePointDate(date) {
  return date ? dayjs(date).format(DATE_FORMAT.date) : '';
}

function humanizePointTime(time) {
  return time ? dayjs(time).format(DATE_FORMAT.time) : '';
}

// function humanizePointDuration(duration) {
//   return duration ? dayjs(duration).format(DURATION_FORMAT) : '';
// }

function humanizePointDuration (timeTo, timeFrom) {
  return timeFrom && timeTo ? dayjs(timeTo).diff(timeFrom, 'minute') : '';
}

export {getRandomNumber, getRandomArrayElement, humanizePointDate, humanizePointTime, humanizePointDuration, humanizeAddPointDate};
