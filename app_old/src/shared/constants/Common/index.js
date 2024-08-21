const reactIsInDevelomentMode = () => process.env.NODE_ENV === 'development';

const OWNER = {
  firstName: 'Mo',
  lastName: 'Beigi',
  fullName: () => [OWNER.firstName, OWNER.lastName].join(' '),
};

const ANALYTICS = {
  gaTrackingId: 'G-41ZEE01DTM',
};

const WEBSITE = {
  baseURL: reactIsInDevelomentMode() ? 'http://localhost:3001' : 'https://mobeigi.com',
  siteName: 'Mo Beigi',
  titlePrefix: 'Mo Beigi: ',
  foundingYear: 2012,
};

const SERVER = {
  baseURL: reactIsInDevelomentMode() ? 'http://localhost:3000' : 'https://mobeigi.com/api',
};

export const COMMON = {
  ANALYTICS,
  OWNER,
  SERVER,
  WEBSITE,
};
