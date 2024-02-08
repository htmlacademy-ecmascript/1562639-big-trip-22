import { SORTING } from '../const.js';

function generateSorting() {
  return SORTING.map((value) => ({
    value,
    isDisabled: value === 'event' || value === 'offers',
  }));
}

export { generateSorting };
