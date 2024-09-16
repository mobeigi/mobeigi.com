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
  LabelDetails,
  LabelContainer,
} from './styled';

import { LexicalComposer, type InitialConfigType } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { SerializedEditorState } from 'lexical';

import { useEffect, useId, useState } from 'react';
import {
  validateDisplayName as payloadValidateDisplayName,
  validateEmail as payloadValidateEmail,
  validateContent as payloadValidateContent,
} from '@/payload/collections/Comments/validators';
import { PrimaryButton, SecondaryButton } from '@/styles/button';

const LeaveComment = ({ postId, parentCommentId, canCancel = false, onCancel, onSuccess }: LeaveCommentProps) => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState<SerializedEditorState | null>(null);
  const [errors, setErrors] = useState<Map<string, string>>(new Map());
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [editor] = useLexicalComposerContext();

  /**
   * Ensure editor is not editable during a submission
   */
  useEffect(() => {
    editor.setEditable(!isSubmitting);
  }, [isSubmitting, editor]);

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
      setIsSubmitting(true);

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

      if (response.ok) {
        // TODO: success toast
        if (onSuccess) {
          onSuccess();
        }
      } else {
        // TODO: toast error
        console.error('Error submitting comment. Received non-ok response.');
      }
    } catch (err) {
      console.error('Error submitting comment:', err);
      // TODO: toast error
    } finally {
      setIsSubmitting(false);
    }
  };
  const isDisplayNameError = (errors.get('displayName') ?? []).length > 0;
  const isEmailError = (errors.get('email') ?? []).length > 0;
  const isContentError = (errors.get('content') ?? []).length > 0;
  const isError = isDisplayNameError || isEmailError || isContentError;

  const id = useId();
  const displayNameUniqueId = `leave-comment-displayName-${id}`;
  const emailUniqueId = `leave-comment-email-${id}`;

  return (
    <LeaveCommentContainer>
      <TopInputRow>
        <InputFieldWrapper>
          <InputWithError $isError={isDisplayNameError}>
            <LabelContainer>
              <label htmlFor={displayNameUniqueId}>Display Name</label>
              <LabelDetails>
                <span>(required)</span>
              </LabelDetails>
            </LabelContainer>
            <input
              type="text"
              id={displayNameUniqueId}
              value={displayName}
              disabled={isSubmitting}
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
            <LabelContainer>
              <label htmlFor={emailUniqueId}>Email</label>
              <LabelDetails>
                <span>(will not be published)</span>
                <span>(required)</span>
              </LabelDetails>
            </LabelContainer>
            <input
              type="text"
              id={emailUniqueId}
              value={email}
              disabled={isSubmitting}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
            />
            {isEmailError && <InputError>{errors.get('email')}</InputError>}
          </InputWithError>
        </InputFieldWrapper>
      </TopInputRow>

      <RichTextPlugin
        contentEditable={
          <ContentEditableWrapper $isError={isContentError}>
            <ContentEditable contentEditable={false} />
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
      {isContentError && <InputError>{errors.get('content')}</InputError>}

      <ActionRow>
        {canCancel && (
          <SecondaryButton onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </SecondaryButton>
        )}
        <PrimaryButton onClick={handleCommentSubmit} disabled={isSubmitting || isError}>
          Comment
        </PrimaryButton>
      </ActionRow>
    </LeaveCommentContainer>
  );
};

export const LeaveCommentWithEditor = (props: LeaveCommentProps) => {
  const onLexicalEditorError = (error: Error) => {
    console.error(error);
    // TODO: toast error
  };

  const initialConfig: InitialConfigType = {
    namespace: 'LeaveCommentEditor',
    theme: {},
    onError: onLexicalEditorError,
  };
  return (
    <>
      <LexicalComposer initialConfig={initialConfig}>
        <LeaveComment {...props} />
      </LexicalComposer>
    </>
  );
};
