import React, { useState, createRef, FormEvent } from 'react';
import Modal from 'react-modal';
import Axios from 'axios';
import { Helmet } from 'react-helmet-async';

import { InvalidStatus, ValidStatus } from './styled';
import { COMMON } from '../../shared/constants/Common';
import { COLORS } from '../../shared/constants/Colors';
import './react-modal-global-style.css';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },

  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: 'fit-content',
    color: COLORS.white,
  },
};

type Props = {
  isOpen: boolean;
  onRequestClose: () => void;
};

const baseState = {
  authKey: '',
  isAuthCorrect: false,
};

export const ResumeModal = ({ isOpen, onRequestClose }: Props) => {
  const [state, setState] = useState(baseState);
  const authKeyInput = createRef<HTMLInputElement>();

  const onAuthKeyInput = (e: FormEvent<HTMLInputElement>) => {
    const authKey = e.currentTarget.value;
    setState((prevState) => ({
      ...prevState,
      authKey,
    }));

    // Check auth
    Axios.post('/resume/auth', { authKey })
      .then((response) => {
        let isAuthCorrect = false;
        if (response.status === 204) {
          isAuthCorrect = true;
        }

        setState((prevState) => ({
          ...prevState,
          isAuthCorrect,
        }));
      })
      .catch(() => {
        setState((prevState) => ({
          ...prevState,
          isAuthCorrect: false,
        }));
      });
  };

  const onAfterOpen = () => {
    authKeyInput?.current?.focus();
  };

  const onAfterClose = () => {
    setState(baseState);
  };

  const { authKey, isAuthCorrect } = state;
  return (
    <>
      {isOpen && (
        <Helmet>
          <title>
            {COMMON.WEBSITE.titlePrefix}
            My Resume
          </title>
          <link rel="canonical" href={`${COMMON.WEBSITE.baseURL}#resume`} />
        </Helmet>
      )}

      <Modal
        isOpen={isOpen}
        closeTimeoutMS={300}
        onAfterOpen={onAfterOpen}
        onRequestClose={onRequestClose}
        onAfterClose={onAfterClose}
        contentLabel="Resume Modal"
        className="modal-content"
        style={customStyles}
      >
        <div className="modal-header">
          <h5 className="modal-title">My Résumé</h5>
          <button type="button" className="close" aria-label="Close" onClick={onRequestClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form method="post" action={`${COMMON.SERVER.baseURL}/resume/download`} id="resume-form" name="resume-form">
          <div className="modal-body" style={{ textAlign: 'center' }}>
            <p>Please enter an auth key to download my Résumé.</p>
            <br />
            <label htmlFor="authKeyInput">
              <span>Auth Key&nbsp;</span>
              <input
                ref={authKeyInput}
                id="authKeyInput"
                name="authKey"
                type="password"
                maxLength={32}
                onInput={onAuthKeyInput}
              />
            </label>
            {authKey.trim() !== '' &&
              (isAuthCorrect ? (
                <ValidStatus>Valid Auth Key</ValidStatus>
              ) : (
                <InvalidStatus>Invalid Auth Key</InvalidStatus>
              ))}
          </div>
          <div className="modal-footer">
            <button
              id="resumeDownloadButton"
              type="submit"
              className="btn btn-primary"
              aria-label="Download"
              disabled={!isAuthCorrect}
            >
              Download
            </button>
            <button type="button" className="btn btn-secondary" aria-label="Close" onClick={onRequestClose}>
              Close
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
