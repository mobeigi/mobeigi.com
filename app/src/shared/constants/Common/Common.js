const OWNER = {
  firstName: 'Mo',
  lastName: 'Beigi',
  fullName: () => [OWNER.firstName, OWNER.lastName].join(' '),
};

const ANALYTICS = {
  gaTrackingId: 'UA-35338966-1',
};

const WEBSITE = {
  baseUrl: 'https://mobeigi.com',
  titlePrefix: 'Mo Beigi: ',
  foundingYear: 2012,
};

const COMMON = {
  ANALYTICS,
  OWNER,
  WEBSITE,
};

export default COMMON;
