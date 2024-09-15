import validator from 'validator';

export const validateDisplayName = (displayName: string): true | string =>
  (displayName && displayName.length <= 20) || 'Display name must be between 1 and 20 characters.';

export const validateEmail = (email: string): true | string => validator.isEmail(email) || 'Invalid email format.';
