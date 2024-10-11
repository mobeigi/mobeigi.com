'use client';

import { LeaveCommentProps } from './types';
import { ContentEditableWrapper, TopInputRow, ActionRow, LeaveCommentContainer, InputFieldWrapper } from './styled';

import { LexicalComposer, type InitialConfigType } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { SerializedEditorState, $getRoot, $createParagraphNode, $setSelection, CLEAR_EDITOR_COMMAND } from 'lexical';

import { useEffect, useId, useRef, useState } from 'react';
import {
  validateDisplayName as payloadValidateDisplayName,
  validateEmail as payloadValidateEmail,
  validateContent as payloadValidateContent,
} from '@/payload/collections/Comments/validators';
import { PrimaryButton, SecondaryButton } from '@/styles/button';
import ClipLoader from 'react-spinners/ClipLoader';
import { ButtonLabel, SpinnerOverlay } from '@/styles/spinner';
import { toast } from 'react-toastify';
import { extractValidationErrorResponseMessage } from '@/utils/payload';
import { Comment as PayloadComment } from '@/payload-types';
import { debounce } from 'lodash-es';
import { InputError, InputWithError, LabelContainer, LabelDetails } from '@/styles/input';
import { DEBOUNCE_TIMEOUT_MS } from '@/constants/inputs';
import { ValidationErrorResponse } from '@/types/payload';
import { emptySerializedEditorState } from '@/utils/lexical/state';

const initialDisplayName = '';
const initialEmail = '';
const initialContent: SerializedEditorState = emptySerializedEditorState;
const initialErrors = new Map();
const initialIsSubmitting = false;

const LeaveComment = ({
  postId,
  parentCommentId,
  canCancel = false,
  onCancel,
  onSuccess,
  onError,
  autoFocus,
}: LeaveCommentProps) => {
  const [displayName, setDisplayName] = useState(initialDisplayName);
  const [email, setEmail] = useState(initialEmail);
  const [content, setContent] = useState<SerializedEditorState>(initialContent);
  const [errors, setErrors] = useState<Map<string, string>>(initialErrors);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(initialIsSubmitting);

  const skipNextLexicalOnChangeRef = useRef(false);
  const [editor] = useLexicalComposerContext();

  /**
   * Ensure editor is not editable during a submission.
   */
  useEffect(() => {
    editor.setEditable(!isSubmitting);
  }, [isSubmitting, editor]);

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
    setDisplayName(initialDisplayName);
    setEmail(initialEmail);
    setContent(initialContent);
    setErrors(initialErrors);
    setIsSubmitting(initialIsSubmitting);

    skipNextLexicalOnChangeRef.current = true;
    editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
  };

  /**
   * Validators.
   */
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

  const validateContent = (content: SerializedEditorState): boolean => {
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

  /**
   * Debounced validators.
   */
  const debouncedValidateDisplayName = useRef(
    debounce((displayName: string) => {
      validateDisplayName(displayName);
    }, DEBOUNCE_TIMEOUT_MS),
  ).current;

  const debouncedValidateEmail = useRef(
    debounce((email: string) => {
      validateEmail(email);
    }, DEBOUNCE_TIMEOUT_MS),
  ).current;

  const debouncedValidateContent = useRef(
    debounce((content: SerializedEditorState) => {
      validateContent(content);
    }, DEBOUNCE_TIMEOUT_MS),
  ).current;

  /**
   * Comment submit handler.
   */
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
        reset();
        if (onSuccess) {
          // TODO: better type for this. Does Payload provide one?
          const json = (await response.json()) as { doc: PayloadComment };
          onSuccess(json.doc);
        }
      } else {
        if (onError) {
          const json = (await response.json()) as ValidationErrorResponse;
          const combinedErrorMessage = extractValidationErrorResponseMessage(json);
          onError(Error(`Error submitting comment: ${combinedErrorMessage}`));
        }
      }
    } catch (error) {
      if (onError) {
        if (error instanceof Error) {
          onError(error);
        } else {
          onError(new Error(String(error)));
        }
      }
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
              autoFocus={autoFocus}
              onChange={(e) => {
                setDisplayName(e.target.value);
                debouncedValidateDisplayName(e.target.value);
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
                debouncedValidateEmail(e.target.value);
              }}
            />
            {isEmailError && <InputError>{errors.get('email')}</InputError>}
          </InputWithError>
        </InputFieldWrapper>
      </TopInputRow>

      <RichTextPlugin
        contentEditable={
          <ContentEditableWrapper $isError={isContentError}>
            <ContentEditable disabled={isSubmitting} />
          </ContentEditableWrapper>
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <OnChangePlugin
        ignoreSelectionChange={true}
        onChange={(editorState) => {
          editorState.read(() => {
            if (skipNextLexicalOnChangeRef.current) {
              skipNextLexicalOnChangeRef.current = false;
              return;
            }
            const serializedContent = editorState.toJSON();
            setContent(serializedContent);
            debouncedValidateContent(serializedContent);
          });
        }}
      />
      <ClearEditorPlugin
        onClear={() => {
          // Clear without focusing
          const root = $getRoot();
          const paragraph = $createParagraphNode();
          root.clear();
          root.append(paragraph);
          $setSelection(null);
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
        <PrimaryButton
          onClick={() => {
            void handleCommentSubmit();
          }}
          disabled={isSubmitting || isError}
        >
          <ButtonLabel $isVisible={!isSubmitting}>Comment</ButtonLabel>
          {isSubmitting && (
            <SpinnerOverlay>
              <ClipLoader size={'1em'} />
            </SpinnerOverlay>
          )}
        </PrimaryButton>
      </ActionRow>
    </LeaveCommentContainer>
  );
};

export const LeaveCommentWithEditor = (props: LeaveCommentProps) => {
  const onLexicalEditorError = (error: Error) => {
    console.error(error);
    toast.error(error.message);
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
