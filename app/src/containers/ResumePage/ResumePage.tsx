'use client';

import { InputError, InputWithError, LabelContainer, LabelDetails } from '@/styles/input';
import { InputAreaWrapper } from './styled';
import React, { useRef, useState } from 'react';
import { PrimaryButton } from '@/styles/button';
import { ButtonLabel, SpinnerOverlay } from '@/styles/spinner';
import ClipLoader from 'react-spinners/ClipLoader';
import { saveAs } from 'file-saver';
import { debounce } from 'lodash-es';
import { DEBOUNCE_TIMEOUT_MS } from '@/constants/inputs';
import { toast } from 'react-toastify';
import { ErrorResonse } from '@/types/api/error';

const initialPassword = '';
const initialIsSubmitting = false;
const initialErrors = new Map();

export const ResumePage = () => {
  const [password, setPassword] = useState<string>(initialPassword);
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
    setPassword(initialPassword);
    setIsSubmitting(initialIsSubmitting);
    setErrors(initialErrors);
  };

  /**
   * Validators.
   */
  const validatePassword = (password: string) => {
    resetErrors('password');
    if (password.length === 0) {
      updateErrors('password', 'Password cannot be empty.');
      return false;
    }
    return true;
  };

  /**
   * Debounced validators.
   */
  const debouncedValidatePassword = useRef(
    debounce((password: string) => {
      validatePassword(password);
    }, DEBOUNCE_TIMEOUT_MS),
  ).current;

  const cancelInflightDebouncedRequests = () => {
    debouncedValidatePassword.cancel();
  };

  /**
   * Download handler.
   */
  const handleDownload = async () => {
    if (!validatePassword(password)) {
      return;
    }
    // Download file
    try {
      setIsSubmitting(true);

      cancelInflightDebouncedRequests();

      const response = await fetch('/api/custom/resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: password,
        }),
      });

      if (response.ok) {
        reset();
        saveAs(await response.blob(), 'Mo-Beigi-Resume.pdf');
        toast.success('Resume was downloaded successfully.');
      } else {
        const json = (await response.json()) as ErrorResonse;
        updateErrors('password', json.error);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isPasswordError = (errors.get('password') ?? []).length > 0;

  return (
    <section>
      <h1>Resume</h1>
      <p>You can download my Resume below if I have provided you with the password to unlock it.</p>
      <InputAreaWrapper>
        <InputWithError $isError={isPasswordError}>
          <LabelContainer>
            <label htmlFor="resumePassword">Password</label>
            <LabelDetails>
              <span>(required)</span>
            </LabelDetails>
          </LabelContainer>
          <input
            type="password"
            id="resumePassword"
            value={password}
            disabled={isSubmitting}
            /* eslint-disable-next-line jsx-a11y/no-autofocus */
            autoFocus={true}
            onChange={(e) => {
              setPassword(e.target.value);
              debouncedValidatePassword(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                void handleDownload();
              }
            }}
          />
          {isPasswordError && <InputError>{errors.get('password')}</InputError>}

          <PrimaryButton
            onClick={() => {
              void handleDownload();
            }}
            disabled={isSubmitting || isPasswordError}
            aria-label="Download"
          >
            <ButtonLabel $isVisible={!isSubmitting}>Download</ButtonLabel>
            {isSubmitting && (
              <SpinnerOverlay>
                <ClipLoader size={'1em'} />
              </SpinnerOverlay>
            )}
          </PrimaryButton>
        </InputWithError>
      </InputAreaWrapper>
    </section>
  );
};
