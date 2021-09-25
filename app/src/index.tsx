import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Axios from 'axios';
import { COMMON } from './shared/constants/Common';
import { App } from './App';
import reportWebVitals from './reportWebVitals';

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
