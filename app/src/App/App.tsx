import React, { useEffect } from 'react';
import {
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';
import ReactGA from 'react-ga';
import { useMediaQuery } from 'react-responsive';
import MediaQuery from '../shared/utils/MediaQuery';

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
  const isTablet = useMediaQuery(MediaQuery.tabletDimensions);
  const isMobile = useMediaQuery(MediaQuery.mobileDimensions);

  // Desktop
  let responsiveEmFontSize = 1.0;
  if (isTablet) { responsiveEmFontSize *= MediaQuery.tabletSizeModifier; }
  if (isMobile) { responsiveEmFontSize *= MediaQuery.mobileSizeModifier; }

  const printConsoleMessage = () => {
    const msg = '%c  __  __         ____       _       _ \n |  \\/  |       |  _ \\     (_)     (_)\n | \\  / | ___   | |_) | ___ _  __ _ _ \n | |\\/| |/ _ \\  |  _ < / _ \\ |/ _` | |\n | |  | | (_) | | |_) |  __/ | (_| | |\n |_|  |_|\\___/  |____/ \\___|_|\\__, |_|\n                               __/ |  \n                              |___/   '
      + '%c\n ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ '
      + '\n\n Welcome! Need to contact me? https://mobeigi.com/blog/contact/ '
      + '\n ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ';

    // eslint-disable-next-line no-console
    console.log(msg, 'font-size: 18px; font-family: monospace; color: #6699CC;', 'font-size: 12px; font-family: monospace; color: #6699CC;');
  };

  // Fired on load
  useEffect(() => {
    printConsoleMessage();
  }, []);

  // Fired on every route change
  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);

  return (
    <div className="App" style={{ fontSize: `${responsiveEmFontSize}em` }}>
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
