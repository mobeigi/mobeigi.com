import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import Header from '../shared/components/Header';
import Homepage from '../Homepage';
import NotFoundPage from '../NotFoundPage';
import TradePage from '../TradePage';
import Footer from '../shared/components/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../shared/assets/bootstrap-themes/slate.min.css';
import './reset.css';
import './App.css';

const App : React.FunctionComponent = () => (
  <div className="App">
    <main>
      <Header />
      <br />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/trades" component={TradePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </main>
    <Footer />
  </div>
);

export default App;
