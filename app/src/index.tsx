import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Axios from 'axios';
import { COMMON } from './shared/constants/Common';
import { App } from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <StrictMode>
    <Router>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Router>
  </StrictMode>,
  rootElement
);
// Set app element
if (rootElement != null) {
  Modal.setAppElement(rootElement);
}

// Set Axios base url
Axios.defaults.baseURL = COMMON.SERVER.baseURL;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
