import {filters} from '../utils/filter.js';

function generateFilter(points) {
  return Object.entries(filters).map(
    ([filterType, filterEvents]) => ({
      type: filterType,
      count: filterEvents(points).length,
    }),
  );
}

export {generateFilter};
