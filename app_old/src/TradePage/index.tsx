import React, { useEffect, useState, MouseEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import moment from 'moment';
import 'moment-timezone';
import { MoonLoader } from 'react-spinners';

import { COLORS } from '../shared/constants/Colors';
import { LoaderCss } from '../shared/styles/common';
import { TargetAwareLink } from '../shared/utils/TargetAwareLink';
import type { State } from './types';
import { NavTab } from './types';
import { COMMON } from '../shared/constants/Common';
import { FadeIn } from '../shared/components/FadeIn';
import { StyledTradePage, Nav, TabContainer } from './styled';
import {
  getLast365CalendarDays,
  getMarketDailyOpenClose,
  transformLast365CalendarDays,
  transformMarketDailyOpenClose,
} from './services';

import { Overview } from './Overview';
import { OpenPositions } from './OpenPositions';
import { TradeHistory } from './TradeHistory';
import { StockTwitsWidget } from './StockTwitsWidget';

export const TradePage = () => {
  const [state, setState] = useState<State>({
    last365CalendarDays: null,
    marketDailyOpenClose: null,
    currentNavTab: NavTab.Overview,
    loading: true,
    error: false,
  });
  const location = useLocation();

  useEffect(() => {
    const last365CalendarDaysPromise = getLast365CalendarDays();
    const marketDailyOpenClosePromise = getMarketDailyOpenClose();

    Promise.all([last365CalendarDaysPromise, marketDailyOpenClosePromise])
      .then((values) => {
        const last365CalendarDays = values[0];
        const marketDailyOpenClose = values[1];

        if (last365CalendarDays === null || marketDailyOpenClose === null) {
          setState((prevState: State) => ({
            ...prevState,
            last365CalendarDays: null,
            marketDailyOpenClose: null,
            error: true,
            loading: false,
          }));
          return;
        }

        const transformedLast365CalendarDays = transformLast365CalendarDays({ last365CalendarDays });
        const transformedMarketDailyOpenClose = transformMarketDailyOpenClose({
          marketDailyOpenClose,
        });

        setState((prevState: State) => ({
          ...prevState,
          last365CalendarDays: transformedLast365CalendarDays,
          marketDailyOpenClose: transformedMarketDailyOpenClose,
          error: false,
          loading: false,
        }));
      })
      .catch(() => {
        setState((prevState: State) => ({
          ...prevState,
          last365CalendarDays: null,
          marketDailyOpenClose: null,
          error: true,
          loading: false,
        }));
      });
  }, []);

  useEffect(() => {
    // Set initial nav tab on page load
    if (location.hash) {
      const newNavTab: NavTab = location.hash.substr(1) as NavTab;
      if (Object.values(NavTab).includes(newNavTab)) {
        setState((prevState: State) => ({
          ...prevState,
          currentNavTab: newNavTab,
        }));
      }
    }
  }, []);

  const updateCurrentNavTab = ({ e, newNavTab }: { e: MouseEvent<HTMLElement>; newNavTab: NavTab }) => {
    // Prevent changing location to same nav tab
    if (state.currentNavTab === newNavTab) {
      e.preventDefault();
      return false;
    }

    // Update currentNavTab
    setState((prevState: State) => ({
      ...prevState,
      currentNavTab: newNavTab,
    }));

    return true;
  };

  const header = (
    <Helmet>
      <title>
        {COMMON.WEBSITE.titlePrefix}
        Trades
      </title>
      <link rel="canonical" href={`${COMMON.WEBSITE.baseURL}/trades`} />
    </Helmet>
  );

  if (state.error) {
    return (
      <StyledTradePage>
        {header}
        <FadeIn>
          <p>There was an error fetching the requested trade data.</p>
          <p>Please try again later or report this problem to the administrator.</p>
        </FadeIn>
      </StyledTradePage>
    );
  }

  if (state.loading) {
    return (
      <StyledTradePage>
        {header}
        <MoonLoader css={LoaderCss} size={50} color={COLORS.white} loading={state.loading} />
      </StyledTradePage>
    );
  }

  if (!state.last365CalendarDays || !state.marketDailyOpenClose) {
    return (
      <StyledTradePage>
        {header}
        <FadeIn>
          <p>There was an unexpected error.</p>
          <p>Please try again later or report this problem to the administrator.</p>
        </FadeIn>
      </StyledTradePage>
    );
  }

  const lastUpdated = (
    <p>
      <strong>Last Updated: </strong>
      {new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      }).format(state.last365CalendarDays.whenGenerated)}
      {` ${moment.tz(state.last365CalendarDays.timezone).zoneName()}`}
    </p>
  );

  return (
    <StyledTradePage>
      {header}

      {/* Nav */}
      <Nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a
          className="navbar-brand"
          href="#overview"
          onClick={(e) => updateCurrentNavTab({ e, newNavTab: NavTab.Overview })}
        >
          Trades
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#trades-nav"
          aria-controls="trades-nav"
          aria-expanded="false"
          aria-label="Toggle trades navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="trades-nav">
          <ul className="navbar-nav mr-auto">
            <li className={`nav-item ${state.currentNavTab === NavTab.Overview && 'active'}`}>
              <a
                className="nav-link"
                href="#overview"
                onClick={(e) => updateCurrentNavTab({ e, newNavTab: NavTab.Overview })}
              >
                Overview
              </a>
            </li>
            <li className={`nav-item ${state.currentNavTab === NavTab.OpenPositions && 'active'}`}>
              <a
                className="nav-link"
                href="#openpositions"
                onClick={(e) => updateCurrentNavTab({ e, newNavTab: NavTab.OpenPositions })}
              >
                Open Positions
              </a>
            </li>
            <li className={`nav-item ${state.currentNavTab === NavTab.TradeHistory && 'active'}`}>
              <a
                className="nav-link"
                href="#tradehistory"
                onClick={(e) => updateCurrentNavTab({ e, newNavTab: NavTab.TradeHistory })}
              >
                Trade History
              </a>
            </li>
            <li className={`nav-item ${state.currentNavTab === NavTab.StockTwits && 'active'}`}>
              <a
                className="nav-link"
                href="#stocktwits"
                onClick={(e) => updateCurrentNavTab({ e, newNavTab: NavTab.StockTwits })}
              >
                StockTwits
              </a>
            </li>
          </ul>
        </div>
      </Nav>

      {/* Tab Containers */}
      <TabContainer>
        {(state.currentNavTab === NavTab.Overview && (
          <FadeIn>
            <Overview
              trades={state.last365CalendarDays.trades}
              lastUpdated={lastUpdated}
              depositsWithdrawals={state.last365CalendarDays.depositsWithdrawals}
              equitySummaryInBase={state.last365CalendarDays.equitySummaryInBase}
              marketDailyOpenClose={state.marketDailyOpenClose}
            />
          </FadeIn>
        )) ||
          (state.currentNavTab === NavTab.OpenPositions && (
            <FadeIn>
              <OpenPositions openPositions={state.last365CalendarDays.openPositions} lastUpdated={lastUpdated} />
            </FadeIn>
          )) ||
          (state.currentNavTab === NavTab.TradeHistory && (
            <FadeIn>
              <TradeHistory
                trades={state.last365CalendarDays.trades}
                lastUpdated={lastUpdated}
                timezone={state.last365CalendarDays.timezone}
              />
            </FadeIn>
          )) ||
          (state.currentNavTab === NavTab.StockTwits && (
            <FadeIn>
              <div>
                <h2>
                  StockTwits (
                  <TargetAwareLink
                    to="https://stocktwits.com/mobeigi"
                    title="StockTwits (@mobeigi)"
                    aria-label="StockTwits (@mobeigi)"
                    rel="external nofollow"
                  >
                    @mobeigi
                  </TargetAwareLink>
                  )
                </h2>
                <br />
                <StockTwitsWidget />
              </div>
            </FadeIn>
          ))}
      </TabContainer>
    </StyledTradePage>
  );
};
