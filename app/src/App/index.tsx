import React, { useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

import * as jquery from 'jquery';
import { AppWrapper, HeaderWrapper, MainWrapper, FooterWrapper } from './styled';
import { NavBar } from '../shared/components/NavBar';
import { Homepage } from '../Homepage';
import { NotFoundPage } from '../NotFoundPage';
import { TradePage } from '../TradePage';
import { Footer } from '../shared/components/Footer';
import { COMMON } from '../shared/constants/Common';

// Add jQuery to window object
declare global {
  interface Window {
    $: any;
    jQuery: any;
  }
}

window.$ = jquery || {};
window.jQuery = jquery || {};

// Load all of Bootstrap’s jQuery plugins onto the jQuery object
require('bootstrap');

// Init Google Analytics
ReactGA.initialize(COMMON.ANALYTICS.gaTrackingId);

export const App = () => {
  const location = useLocation();

  const printConsoleMessage = () => {
    const msg =
      '%c  __  __         ____       _       _ \n |  \\/  |       |  _ \\     (_)     (_)\n | \\  / | ___   | |_) | ___ _  __ _ _ \n | |\\/| |/ _ \\  |  _ < / _ \\ |/ _` | |\n | |  | | (_) | | |_) |  __/ | (_| | |\n |_|  |_|\\___/  |____/ \\___|_|\\__, |_|\n                               __/ |  \n                              |___/   ' +
      '%c\n ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ' +
      '\n\n Welcome! Need to contact me? https://mobeigi.com/blog/contact/ ' +
      '\n ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ';

    // eslint-disable-next-line no-console
    console.log(
      msg,
      'font-size: 18px; font-family: monospace; color: #6699CC;',
      'font-size: 12px; font-family: monospace; color: #6699CC;'
    );
  };

  // Fired on load
  useEffect(() => {
    printConsoleMessage();
  }, []);

  // Fired on every route change
  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search });
  }, [location]);

  return (
    <AppWrapper>
      <HeaderWrapper>
        <Switch>
          {/* Pages */}
          <Route exact path="/" render={() => null} /> {/* Homepage no nav bar */}
          <Route
            exact
            path="/trades"
            component={() => (
              <NavBar pageName="Trades" pageSocialButton={{ brandStyle: 'fas', iconName: 'fa-sack-dollar' }} />
            )}
          />
          {/* Catch All */}
          <Route
            component={() => (
              <NavBar
                pageName="404 Not Found"
                pageSocialButton={{ brandStyle: 'fas', iconName: 'fa-exclamation-circle' }}
              />
            )}
          />
        </Switch>
      </HeaderWrapper>
      <MainWrapper>
        <Switch>
          {/* Pages */}
          <Route exact path="/" component={Homepage} />
          <Route exact path="/trades" component={TradePage} />

          {/* Catch All */}
          <Route component={NotFoundPage} />
        </Switch>
      </MainWrapper>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </AppWrapper>
  );
};
