const OWNER = {
  firstName: 'Mo',
  lastName: 'Beigi',
  fullName: () => [OWNER.firstName, OWNER.lastName].join(' '),
};

const WEBSITE = {
  foundingYear: 2012,
};

const COMMON = {
  OWNER,
  WEBSITE,
};

export default COMMON;
