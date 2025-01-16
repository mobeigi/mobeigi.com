import { ValidationError } from 'payload';

export type ValidationErrorResponse = {
  errors: Array<ValidationError>;
};
