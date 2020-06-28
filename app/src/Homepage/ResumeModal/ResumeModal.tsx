import React from 'react';
import Modal from 'react-modal';

import COMMON from '../../shared/constants/Common';
import COLOURS from '../../shared/constants/Colors';

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
    minWidth: '500px',
    maxWidth: '35%',
    color: COLOURS.white,
  },
};

type Props = {
    isOpen: boolean,
    onRequestClose: () => void,
}

type State = {
  isAuthCorrect: boolean,
}

class ResumeModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isAuthCorrect: false,
    };
  }

  componentDidUpdate(prevProps: Props) {
    const { isOpen } = this.props;
    if (prevProps.isOpen !== isOpen) {
      if (isOpen) {
        document.title = `${COMMON.WEBSITE.titlePrefix}My Resume`;
      }
    }
  }

    onAuthKeyInput = (e: React.FormEvent<HTMLInputElement>) => {
      // Check auth
      const inputPassword = e.currentTarget.value;
      let isAuthCorrect = false;
      if (inputPassword === 'temp test') {
        isAuthCorrect = true;
      }
      this.setState((prevState) => ({
        ...prevState,
        isAuthCorrect,
      }));
    };

    render() {
      const { isOpen, onRequestClose } = this.props;
      const { isAuthCorrect } = this.state;
      return (
        <Modal
          isOpen={isOpen}
          onRequestClose={onRequestClose}
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
          <form method="post" action="/resume/download.php" id="resume-form" name="resume-form">
            <div className="modal-body" style={{ textAlign: 'center' }}>
              Please enter an auth key to download my Résumé.
              <br />
              <br />
              <label htmlFor="authKeyInput">
                Auth Key&nbsp;
                <input id="authKeyInput" name="auth_key" type="password" maxLength={32} onInput={this.onAuthKeyInput} />
              </label>
              <p id="authKeyStatus" />
            </div>
            <div className="modal-footer">
              <button id="resumeDownloadButton" type="submit" className="btn btn-primary" aria-label="Download" disabled={!isAuthCorrect}>Download</button>
              <button type="button" className="btn btn-secondary" aria-label="Close" onClick={onRequestClose}>Close</button>
            </div>
          </form>
        </Modal>
      );
    }
}

export default ResumeModal;
