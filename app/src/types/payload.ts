import { APIError } from 'payload';

// TODO: Check if these validation types are exported in the future from payload itself
export type ValidationFieldError = {
  field: string;
  message: string;
};

export interface ValidationError {
  collection?: string;
  errors: ValidationFieldError[];
  global?: string;
}

export type ValidationErrorResponse = {
  errors: Array<APIError<ValidationError>>;
};
