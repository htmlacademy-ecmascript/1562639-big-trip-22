import {FilterType} from '../const';
import dayjs from 'dayjs';

const getRandomNumber = (number) => {
  const result = Math.random() * number;
  return Math.floor(result);
};

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.PAST]: (points) => points.filter((point) => dayjs().isAfter(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => dayjs(point.dateFrom).isSame(dayjs())),
  [FilterType.FUTURE]: (points) => points.filter((point) => dayjs().isBefore(point.dateFrom)),
};

export {filter};

export {getRandomNumber, getRandomArrayElement};
