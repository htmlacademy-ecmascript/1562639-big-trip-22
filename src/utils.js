import dayjs from 'dayjs';
import {DateFormat} from './const.js';


const getRandomNumber = (number) => {
  const result = Math.random() * number;
  return Math.floor(result);
};

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

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

  const days = diffDate.getDate();
  const hours = diffDate.getUTCHours();
  const minutes = diffDate.getMinutes();

  function formatDays() {
    return (days < 10) ? `0${days - 1}` : days - 1;
  }
  function formatHours() {
    return (hours && hours < 10 || hours === 0) ? `0${hours}` : hours;
  }
  function formatMinutes() {
    return (minutes && minutes < 10 || minutes === 0) ? `0${minutes}` : minutes;
  }

  if (diffDate.getDate() <= 1 && diffDate.getUTCHours() !== 0) {
    return `${formatHours()}H ${formatMinutes()}M`;
  } else if (diffDate.getDate() <= 1 && diffDate.getUTCHours() === 0) {
    return `${formatMinutes()}M`;
  } else if (diffDate.getDate() > 1) {
    return `${formatDays()}D ${formatHours()}H ${formatMinutes()}M`;
  }
}

export {getRandomNumber, getRandomArrayElement, humanizePointDate, humanizePointTime, humanizePointDuration, humanizeAddPointDate};
