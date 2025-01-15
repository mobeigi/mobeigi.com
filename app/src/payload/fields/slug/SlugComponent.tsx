'use client';

import React, { useCallback, useEffect } from 'react';
import { useField, Button, TextInput, FieldLabel, useFormFields } from '@payloadcms/ui';
import type { TextFieldClientProps } from 'payload';

import { formatSlug } from './formatSlug';
import './index.scss';

type SlugComponentProps = {
  fieldToUse: string;
  checkboxFieldPath: string;
} & TextFieldClientProps;

export const SlugComponent: React.FC<SlugComponentProps> = ({
  field,
  fieldToUse,
  checkboxFieldPath: checkboxFieldPathFromProps,
  path,
  readOnly: readOnlyFromProps,
}) => {
  const { label } = field;

  const checkboxFieldPath = path?.includes('.') ? `${path}.${checkboxFieldPathFromProps}` : checkboxFieldPathFromProps;

  const { value, setValue } = useField<string>({ path: path || field.name });

  const { value: checkboxValue, setValue: setCheckboxValue } = useField<boolean>({
    path: checkboxFieldPath,
  });

  const fieldToUseValue = useFormFields(([fields]) => {
    return fields[fieldToUse].value as string;
  });

  useEffect(() => {
    if (checkboxValue) {
      if (fieldToUseValue) {
        const formattedSlug = formatSlug(fieldToUseValue);

        if (value !== formattedSlug) setValue(formattedSlug);
      } else {
        if (value !== '') setValue('');
      }
    }
  }, [fieldToUseValue, checkboxValue, setValue, value]);

  const handleLock = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setCheckboxValue(!checkboxValue);
    },
    [checkboxValue, setCheckboxValue],
  );

  const readOnly = readOnlyFromProps || checkboxValue;

  return (
    <div className="field-type slug-field-component">
      <div className="label-wrapper">
        <FieldLabel htmlFor={`field-${path}`} label={label} />

        <Button className="lock-button" buttonStyle="none" onClick={handleLock} aria-label="Lock Button">
          {checkboxValue ? 'Unlock' : 'Lock'}
        </Button>
      </div>

      <TextInput value={value} onChange={setValue} path={path || field.name} readOnly={Boolean(readOnly)} />
    </div>
  );
};
