import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Axios from 'axios';
import moment from 'moment';
import 'moment-timezone';
import { MoonLoader } from 'react-spinners';

import { COLORS } from '../shared/constants/Colors';
import { LoaderCss } from '../shared/styles/common';
import { TargetAwareLink } from '../shared/utils/TargetAwareLink';
import type { State } from './types';
import { NavTab } from './types';
import type { OpenPosition, Trade, DepositsWithdrawal, EquitySummaryInBase } from './common/types';
import { COMMON } from '../shared/constants/Common';
import { FadeIn } from '../shared/components/FadeIn';
import { Nav, TabContainer } from './styled';

import { Overview } from './Overview';
import { OpenPositions } from './OpenPositions';
import { TradeHistory } from './TradeHistory';
import { StockTwitsWidget } from './StockTwitsWidget';

export const TradePage = () => {
  const [state, setState] = React.useState<State>({
    trades: [],
    openPositions: [],
    whenGenerated: null,
    timezone: 'Australia/Sydney',
    depositsWithdrawals: [],
    equitySummaryInBase: [],
    currentNavTab: NavTab.Overview,
    loading: true,
    error: false,
  });
  const location = useLocation();

  useEffect(() => {
    Axios.get('/trades/Last365CalendarDays')
      .then((response) => {
        if (response.status === 200) {
          const trades = response.data.trades
            .reverse()
            .filter((trade: Trade) => trade.symbol !== 'AUD.USD') // filter currency conversion trades
            .map((trade: Trade) => ({
              ...trade,
              tradeID: Number(trade.tradeID),
              strike: Number(trade.strike) || null,
              expiry: trade.expiry ? new Date(trade.expiry) : null,
              dateTime: new Date(trade.dateTime),
              quantity: Number(trade.quantity),
              tradePrice: Number(trade.tradePrice),
              ibCommission: Number(trade.ibCommission),
            }));

          const openPositions = response.data.openPositions.map((openPosition: OpenPosition) => ({
            ...openPosition,
            strike: Number(openPosition.strike) || null,
            expiry: openPosition.expiry ? new Date(openPosition.expiry) : null,
            position: Number(openPosition.position),
            markPrice: Number(openPosition.markPrice),
          }));

          const depositsWithdrawals = response.data.depositsWithdrawals.map(
            (depositsWithdrawal: DepositsWithdrawal) => ({
              ...depositsWithdrawal,
              dateTime: new Date(depositsWithdrawal.dateTime),
              amount: Number(depositsWithdrawal.amount),
              fxRateToBase: Number(depositsWithdrawal.fxRateToBase),
            })
          );

          const equitySummaryInBase = response.data.equitySummaryInBase.map(
            (equitySummaryInBaseEntry: EquitySummaryInBase) => ({
              ...equitySummaryInBaseEntry,
              reportDate: new Date(equitySummaryInBaseEntry.reportDate),
              total: Number(equitySummaryInBaseEntry.total),
              totalLong: Number(equitySummaryInBaseEntry.totalLong),
              totalShort: Number(equitySummaryInBaseEntry.totalShort),
            })
          );

          setState((prevState: State) => ({
            ...prevState,
            whenGenerated: new Date(response.data.whenGenerated),
            timezone: response.data.timezone,
            trades,
            openPositions,
            depositsWithdrawals,
            equitySummaryInBase,
            loading: false,
          }));
        } else {
          setState((prevState: State) => ({
            ...prevState,
            error: true,
            loading: false,
          }));
        }
      })
      .catch(() => {
        setState((prevState: State) => ({
          ...prevState,
          error: true,
          loading: false,
        }));
      });
  }, []);

  const updateCurrentNavTab = ({ e, newNavTab }: { e: React.MouseEvent<HTMLElement>; newNavTab: NavTab }) => {
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

  const lastUpdated = (
    <p>
      <strong>Last Updated: </strong>
      {state.whenGenerated &&
        new Intl.DateTimeFormat('en-GB', {
          year: 'numeric',
          month: 'long',
          day: '2-digit',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        }).format(state.whenGenerated)}
      {` ${moment.tz(state.timezone).zoneName()}`}
    </p>
  );

  return (
    <>
      <Helmet>
        <title>
          {COMMON.WEBSITE.titlePrefix}
          Trades
        </title>
        <link rel="canonical" href={`${COMMON.WEBSITE.baseURL}/trades`} />
      </Helmet>

      <MoonLoader css={LoaderCss} size={50} color={COLORS.white} loading={state.loading} />

      {state.error && (
        <FadeIn>
          <p>There was an error fetching the requested trade data.</p>
          <p>Please try again later or report this problem to the administrator.</p>
        </FadeIn>
      )}

      {!state.loading && !state.error && (
        <>
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
                  trades={state.trades}
                  lastUpdated={lastUpdated}
                  depositsWithdrawals={state.depositsWithdrawals}
                  equitySummaryInBase={state.equitySummaryInBase}
                />
              </FadeIn>
            )) ||
              (state.currentNavTab === NavTab.OpenPositions && (
                <FadeIn>
                  <OpenPositions openPositions={state.openPositions} lastUpdated={lastUpdated} />
                </FadeIn>
              )) ||
              (state.currentNavTab === NavTab.TradeHistory && (
                <FadeIn>
                  <TradeHistory trades={state.trades} lastUpdated={lastUpdated} timezone={state.timezone} />
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
        </>
      )}
    </>
  );
};
