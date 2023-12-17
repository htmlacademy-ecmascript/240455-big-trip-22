const PHOTOS_COUNT = 3;

const TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];

const OFFERS = [
  'Upgrade to a business class', //taxi
  'Choose the radio station', //taxi
  'Choose temperature', //taxi
  'Infotainment system', //bus
  'Order meal', //bus
  'Choose seats', //bus
  'Book a taxi at the arrival point', //train
  'Order a breakfast', //train
  'Wake up at a certain time', //train
  'Choose meal', //flight
  'Choose seats', //flight
  'Upgrade to comfort class', //flight
  'Choose the time of check-in', //check-in
  'Choose the time of check-out', //check-in
  'Add breakfast', //check-in
  'Add luggage', //ship
  'Business lounge', //ship
  'With automatic transmission', //drive
  'With air conditioning', //drive
  'Choose live music', //restaurant
  'Choose VIP area' //restaurant
];

const CITIES = [
  'Moscow',
  'Novosibirsk',
  'Yekaterinburg',
  'Kazan',
  'Athens',
  'Ozark',
];

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

export { TYPES, OFFERS, CITIES, DESCRIPTIONS, PHOTOS_COUNT };
