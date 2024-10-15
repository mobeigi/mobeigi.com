'use client';

import { InputError, InputWithError, LabelContainer, LabelDetails } from '@/styles/input';
import { InputFieldWrapper, PingFormContainer } from './styled';
import { PrimaryButton } from '@/styles/button';
import { ButtonLabel, SpinnerOverlay } from '@/styles/spinner';
import ClipLoader from 'react-spinners/ClipLoader';
import { useRef, useState } from 'react';
import { debounce } from 'lodash-es';
import { DEBOUNCE_TIMEOUT_MS } from '@/constants/inputs';
import { toast } from 'react-toastify';
import { ErrorResonse } from '@/types/api/error';
import { validateMessage as apiValidateMessage } from '@/utils/api/contact/ping/validators';

const initialMessage = '';
const initialIsSubmitting = false;
const initialErrors = new Map();

export const PingForm = () => {
  const [message, setMessage] = useState<string>(initialMessage);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(initialIsSubmitting);
  const [errors, setErrors] = useState<Map<string, string>>(initialErrors);

  /**
   * State manipulation.
   */
  const updateErrors = (key: string, value: string) => {
    setErrors((prevErrors) => {
      const newErrors = new Map(prevErrors);
      newErrors.set(key, value);
      return newErrors;
    });
  };

  const resetErrors = (key: string) => {
    setErrors((prevErrors) => {
      const newErrors = new Map(prevErrors);
      newErrors.delete(key);
      return newErrors;
    });
  };

  const reset = () => {
    setMessage(initialMessage);
    setIsSubmitting(initialIsSubmitting);
    setErrors(initialErrors);
  };

  /**
   * Validators.
   */
  const validateMessage = (message: string) => {
    resetErrors('message');

    const validateMessageResult = apiValidateMessage(message);
    if (validateMessageResult !== true) {
      updateErrors('message', validateMessageResult);
      return false;
    }

    return true;
  };

  /**
   * Debounced validators.
   */
  const debouncedValidateMessage = useRef(
    debounce((message: string) => {
      validateMessage(message);
    }, DEBOUNCE_TIMEOUT_MS),
  ).current;

  const cancelInflightDebouncedRequests = () => {
    debouncedValidateMessage.cancel();
  };

  /**
   * Click handler.
   */
  const handleSend = async () => {
    if (!validateMessage(message)) {
      return;
    }

    // Send ping
    try {
      setIsSubmitting(true);

      cancelInflightDebouncedRequests();

      const response = await fetch('/api/custom/contact/ping', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
        }),
      });

      if (response.ok) {
        reset();
        toast.success('Ping sent successfully.');
      } else {
        const json = (await response.json()) as ErrorResonse;
        updateErrors('message', json.error);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isMessageError = (errors.get('message') ?? []).length > 0;

  return (
    <PingFormContainer>
      <InputFieldWrapper>
        <InputWithError $isError={isMessageError}>
          <LabelContainer>
            <label htmlFor="message">Message</label>
            <LabelDetails>
              <span>(required)</span>
            </LabelDetails>
          </LabelContainer>
          <textarea
            id="message"
            value={message}
            rows={3}
            disabled={isSubmitting}
            onChange={(e) => {
              setMessage(e.target.value);
              debouncedValidateMessage(e.target.value);
            }}
          />
          {isMessageError && <InputError>{errors.get('message')}</InputError>}
        </InputWithError>
      </InputFieldWrapper>

      <PrimaryButton
        onClick={() => {
          void handleSend();
        }}
        disabled={isSubmitting || isMessageError}
        aria-label="Send ping"
      >
        <ButtonLabel $isVisible={!isSubmitting}>Send</ButtonLabel>
        {isSubmitting && (
          <SpinnerOverlay>
            <ClipLoader size={'1em'} />
          </SpinnerOverlay>
        )}
      </PrimaryButton>
    </PingFormContainer>
  );
};
