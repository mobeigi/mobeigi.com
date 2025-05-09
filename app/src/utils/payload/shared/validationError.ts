import { ValidationErrorResponse } from '@/types/payload';

/**
 * Extracts and combines error messages from a ValidationErrorResponse.
 */
export const extractValidationErrorResponseMessage = (response: ValidationErrorResponse): string =>
  response.errors
    .flatMap((apiError) => {
      const validationErrorResponse = apiError.data;
      const globalMessage = validationErrorResponse.global || '';
      const fieldMessages = validationErrorResponse.errors.map((error) => error.message);
      return [globalMessage, ...fieldMessages].filter(Boolean);
    })
    .join(',');
