import dayjs from 'dayjs';
import {DateFormat} from '../const.js';

function humanizeAddPointDate(date) {
  return date ? dayjs(date).format(DateFormat.FULL_DATE) : '';
}

function humanizePointDate(date) {
  return date ? dayjs(date).format(DateFormat.DATE) : '';
}

function humanizePointTime(time) {
  return time ? dayjs(time).format(DateFormat.TIME) : '';
}

function humanizePointDuration (start, end) {
  const diffDate = new Date(new Date(end) - new Date(start));

  const days = diffDate.getDate() - 1;
  const hours = diffDate.getUTCHours();
  const minutes = diffDate.getMinutes();

  function formatDate(arg) {
    return (arg < 10 || arg === 0) ? `0${arg}` : arg;
  }

  if (diffDate.getDate() <= 1 && diffDate.getUTCHours() !== 0) {
    return `${formatDate(hours)}H ${formatDate(minutes)}M`;
  } else if (diffDate.getDate() <= 1 && diffDate.getUTCHours() === 0) {
    return `${formatDate(minutes)}M`;
  } else if (diffDate.getDate() > 1) {
    return `${formatDate(days)}D ${formatDate(hours)}H ${formatDate(minutes)}M`;
  }
}

function sortPointByDay(pointA, pointB) {
  if ((pointA.dateFrom) > (pointB.dateFrom)) {
    return 1;
  }
  if ((pointA.dateFrom) < (pointB.dateFrom)) {
    return -1;
  }
  return 0;
}

function sortPointByDuration(pointA, pointB) {
  const diffDateA = new Date(new Date(pointA.dateTo) - new Date(pointA.dateFrom));
  const diffDateB = new Date(new Date(pointB.dateTo) - new Date(pointB.dateFrom));
  if (diffDateA < diffDateB) {
    return 1;
  }
  if (diffDateA > diffDateB) {
    return -1;
  }
  return 0;
}

function sortPointByPrice(pointA, pointB) {
  if (Number(pointA.basePrice) < Number(pointB.basePrice)) {
    return 1;
  }
  if (Number(pointA.basePrice) > Number(pointB.basePrice)) {
    return -1;
  }
  return 0;
}


export {humanizePointDate, humanizePointTime, humanizePointDuration, humanizeAddPointDate, sortPointByDay, sortPointByDuration, sortPointByPrice};
