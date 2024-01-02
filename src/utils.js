import dayjs from 'dayjs';
import {MINUTES_IN_HOURS, MINUTES_IN_DAYS, DateFormat} from './const.js';


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
  const diff = dayjs(end).diff(start, 'minute');
  let days;
  let hours;
  let minutes;
  function formatDays() {
    return (days && days < 10) ? `0${days}` : days;
  }
  function formatHours() {
    return (hours && hours < 10 || hours === 0) ? `0${hours}` : hours;
  }
  function formatMinutes() {
    return (minutes && minutes < 10 || minutes === 0) ? `0${minutes}` : minutes;
  }

  if (diff > (MINUTES_IN_DAYS)) {
    days = Math.floor(diff / MINUTES_IN_DAYS);
    hours = Math.floor((diff % MINUTES_IN_DAYS / MINUTES_IN_HOURS));
    minutes = (diff % MINUTES_IN_DAYS % MINUTES_IN_HOURS);
    return `${formatDays()}D ${formatHours()}H ${formatMinutes()}M`;
  } else if (diff > MINUTES_IN_HOURS) {
    hours = Math.floor(diff / MINUTES_IN_HOURS);
    minutes = diff % MINUTES_IN_HOURS;
    return `${formatHours()}H ${formatMinutes()}M`;
  } else if (diff < MINUTES_IN_HOURS) {
    minutes = diff;
    return `${formatMinutes()}M`;
  }
  // switch (diff) {
  //   case diff < MINUTES_IN_HOURS:
  //     return dayjs(diff).format(DateFormat.DURATION_MINUTES);
  //   case diff > MINUTES_IN_HOURS && diff < MINUTES_IN_HOURS * HOURS_IN_DAY:
  //     return dayjs(diff).format(DateFormat.DURATION_HOURS_MINUTES);
  //   default:
  //     return dayjs(diff).format(DateFormat.DURATION_DAYS_HOURS_MINUTES);
  // }
}

export {getRandomNumber, getRandomArrayElement, humanizePointDate, humanizePointTime, humanizePointDuration, humanizeAddPointDate};
