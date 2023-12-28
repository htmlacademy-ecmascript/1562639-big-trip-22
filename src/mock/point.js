import { getRandomNumber, getRandomArrayElement } from '../utils';
import { TYPE_POINT } from '../const';
// import { mockDestination } from './destination';

const mockPoint = [
  {
    id: '1',
    basePrice: getRandomNumber(10000),
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: '1',
    isFavorite: false,
    offers: [
      '1',
      '2',
      '8',
      '11'
    ],
    type: getRandomArrayElement(TYPE_POINT)
  },
  {
    id: '2',
    basePrice: 1200,
    dateFrom: '2019-07-15T06:48:56.845Z',
    dateTo: '2019-07-18T11:22:13.375Z',
    destination: '2',
    isFavorite: false,
    offers: [
      '2',
      '4',
      '5'
    ],
    type: getRandomArrayElement(TYPE_POINT)
  },
  {
    id: '3',
    basePrice: 1500,
    dateFrom: '2019-08-20T08:35:56.845Z',
    dateTo: '2019-08-21T11:22:13.375Z',
    destination: '3',
    isFavorite: false,
    offers: [
    ],
    type: getRandomArrayElement(TYPE_POINT)
  },
  {
    id: '4',
    basePrice: 700,
    dateFrom: '2019-03-20T12:10:56.845Z',
    dateTo: '2019-03-21T11:22:13.375Z',
    destination: '4',
    isFavorite: true,
    offers: [
      '3'
    ],
    type: getRandomArrayElement(TYPE_POINT)
  }
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoint);
}

export {getRandomPoint, mockPoint};
