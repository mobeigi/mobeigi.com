'use client';

import { LeaveCommentProps } from './types';
import {
  ContentEditableWrapper,
  TopInputRow,
  ActionRow,
  LeaveCommentContainer,
  InputFieldWrapper,
  InputError,
  InputWithError,
} from './styled';

import { LexicalComposer, type InitialConfigType } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { SerializedEditorState } from 'lexical';

import { useState } from 'react';
import {
  validateDisplayName as payloadValidateDisplayName,
  validateEmail as payloadValidateEmail,
  validateContent as payloadValidateContent,
} from '@/payload/collections/Comments/validators';

export const LeaveComment = ({ postId, parentCommentId, canCancel = false, onCancel }: LeaveCommentProps) => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState<SerializedEditorState | null>(null);
  const [errors, setErrors] = useState<Map<string, string>>(new Map());

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

  // Lexical config
  const onLexicalEditorError = (error: Error) => {
    console.error(error);
    // TODO: toast error
  };

  const initialConfig: InitialConfigType = {
    namespace: 'LeaveCommentEditor',
    theme: {},
    onError: onLexicalEditorError,
  };

  // Validation
  const validateDisplayName = (displayName: string): boolean => {
    resetErrors('displayName');

    const validateDisplayNameResult = payloadValidateDisplayName(displayName);
    if (validateDisplayNameResult !== true) {
      updateErrors('displayName', validateDisplayNameResult);
      return false;
    }
    return true;
  };

  const validateEmail = (email: string): boolean => {
    resetErrors('email');

    const validateEmailResult = payloadValidateEmail(email);
    if (validateEmailResult !== true) {
      updateErrors('email', validateEmailResult);
      return false;
    }
    return true;
  };

  const validateContent = (content: SerializedEditorState | null): boolean => {
    resetErrors('content');

    const validateContentResult = payloadValidateContent(content);
    if (validateContentResult !== true) {
      updateErrors('content', validateContentResult);
      return false;
    }
    return true;
  };

  const validateAll = (): boolean => {
    return [validateDisplayName(displayName), validateEmail(email), validateContent(content)].every(
      (value) => value === true,
    );
  };

  const handleCommentSubmit = async () => {
    const isAllValid = validateAll();
    if (!isAllValid) {
      return;
    }
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          displayName,
          email,
          content: JSON.stringify(content),
          parent: parentCommentId || undefined,
          post: postId,
        }),
      });

      if (!response.ok) {
        console.error('Error submitting comment. Received non-ok response.');
        // TODO: toast error
      } else {
        // TODO: success toast
      }
    } catch (err) {
      console.error('Error submitting comment:', err);
      // TODO: toast error
    }
  };
  const isDisplayNameError = (errors.get('displayName') ?? []).length > 0;
  const isEmailError = (errors.get('email') ?? []).length > 0;
  const isContentError = (errors.get('content') ?? []).length > 0;
  const isError = isDisplayNameError || isEmailError || isContentError;

  return (
    <LeaveCommentContainer>
      <TopInputRow>
        <InputFieldWrapper>
          <InputWithError $isError={isDisplayNameError}>
            <label htmlFor="displayName">Display Name:</label>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={(e) => {
                setDisplayName(e.target.value);
                validateDisplayName(e.target.value);
              }}
            />
            {isDisplayNameError && <InputError>{errors.get('displayName')}</InputError>}
          </InputWithError>
        </InputFieldWrapper>

        <InputFieldWrapper>
          <InputWithError $isError={isEmailError}>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
            />
            {isEmailError && <InputError>{errors.get('email')}</InputError>}
          </InputWithError>
        </InputFieldWrapper>
      </TopInputRow>

      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
          contentEditable={
            <ContentEditableWrapper $isError={isContentError}>
              <ContentEditable />
            </ContentEditableWrapper>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin
          ignoreSelectionChange={true}
          onChange={(editorState) => {
            editorState.read(() => {
              const serializedContent = editorState.toJSON();
              setContent(serializedContent);
              validateContent(serializedContent);
            });
          }}
        />
        <HistoryPlugin />
      </LexicalComposer>
      {isContentError && <InputError>{errors.get('content')}</InputError>}

      <ActionRow>
        {canCancel && <button onClick={onCancel}>Cancel</button>}
        <button onClick={handleCommentSubmit} disabled={isError}>
          Comment
        </button>
      </ActionRow>
    </LeaveCommentContainer>
  );
};
