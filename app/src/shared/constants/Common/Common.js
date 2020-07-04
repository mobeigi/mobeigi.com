const OWNER = {
  firstName: 'Mo',
  lastName: 'Beigi',
  fullName: () => [OWNER.firstName, OWNER.lastName].join(' '),
};

const ANALYTICS = {
  gaTrackingId: 'UA-35338966-1',
};

const WEBSITE = {
  baseURL: 'https://mobeigi.com',
  titlePrefix: 'Mo Beigi: ',
  foundingYear: 2012,
};

const SERVER = {
  baseURL: 'https://mobeigi.com/api',
};

const COMMON = {
  ANALYTICS,
  OWNER,
  SERVER,
  WEBSITE,
};

export default COMMON;
