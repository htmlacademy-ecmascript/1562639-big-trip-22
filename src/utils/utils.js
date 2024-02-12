import {FilterType} from '../const';
import dayjs from 'dayjs';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.PAST]: (points) => points.filter((point) => dayjs().isAfter(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => dayjs(point.dateFrom).isSame(dayjs(), 'D')),
  [FilterType.FUTURE]: (points) => points.filter((point) => dayjs().isBefore(point.dateFrom)),
};

export {filter};
