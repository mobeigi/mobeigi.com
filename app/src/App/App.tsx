import React from 'react';

import Header from '../shared/components/Header';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../shared/styles/bootstrap-themes/slate.min.css';
import '../shared/styles/reset.css';
import '../shared/styles/styles.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <main><Header /></main>
      <footer />
    </div>
  );
}

export default App;
