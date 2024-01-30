import { SORTING } from '../const.js';

function generateSorting() {
  return SORTING.map((value) => ({
    value,
    // isChecked: value === sortType,
    isDisabled: value === 'event' || value === 'offers',
  }));
}

export { generateSorting };
