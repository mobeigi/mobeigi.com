import React, { useEffect } from 'react';
import {
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';
import ReactGA from 'react-ga';

import Header from '../shared/components/Header';
import Homepage from '../Homepage';
import NotFoundPage from '../NotFoundPage';
import TradePage from '../TradePage';
import Footer from '../shared/components/Footer';
import COMMON from '../shared/constants/Common';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../shared/assets/bootstrap-themes/slate.css';
import './SlateOverrides.css';
import './reset.css';
import './App.css';

// Init Google Analytics
ReactGA.initialize(COMMON.ANALYTICS.gaTrackingId);

const App : React.FunctionComponent = () => {
  const location = useLocation();

  // Fired on every route change
  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);

  return (
    <div className="App">
      <main>
        <Header />
        <br />
        <Switch>
          {/* Pages */}
          <Route exact path="/" component={Homepage} />
          <Route exact path="/trades" component={TradePage} />

          {/* Catch All */}
          <Route component={NotFoundPage} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
};

export default App;
