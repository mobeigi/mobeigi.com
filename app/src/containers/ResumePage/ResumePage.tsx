'use client';

import { InputError, InputWithError } from '@/styles/input';
import { InputAreaWrapper, LabelContainer } from './styled';
import React, { useRef, useState } from 'react';
import { PrimaryButton } from '@/styles/button';
import { ButtonLabel, SpinnerOverlay } from '@/styles/spinner';
import ClipLoader from 'react-spinners/ClipLoader';
import { saveAs } from 'file-saver';
import { debounce } from 'lodash-es';
import { DEBOUNCE_TIMEOUT_MS } from '@/constants/inputs';

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
      } else {
        const json = await response.json();
        updateErrors('password', json.error);
      }
    } catch (e) {
      console.log('ERROR');
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
          </LabelContainer>
          <input
            type="password"
            id="resumePassword"
            value={password}
            disabled={isSubmitting}
            autoFocus={true}
            onChange={(e) => {
              setPassword(e.target.value);
              debouncedValidatePassword(e.target.value);
            }}
          />
          {isPasswordError && <InputError>{errors.get('password')}</InputError>}

          <PrimaryButton onClick={handleDownload} disabled={isSubmitting || isPasswordError}>
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
