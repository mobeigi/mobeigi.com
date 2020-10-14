import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Axios from 'axios';
import moment from 'moment';
import 'moment-timezone';
import { MoonLoader } from 'react-spinners';
import COLORS from '../shared/constants/Colors';
import { LoaderCss, FadeInDiv } from '../shared/styles/common';
import TargetAwareLink from '../shared/utils/TargetAwareLink';

import { StyledTable } from './styled';
import type { OpenPosition, State, Trade } from './types';
import { calcTotalPrice, getPutOrCallFullText } from './utils';
import COMMON from '../shared/constants/Common';

const TradePage = () => {
  const [state, setState] = React.useState<State>({
    trades: [],
    openPositions: [],
    whenGenerated: null,
    timezone: 'Australia/Sydney',
    loading: true,
    error: false,
  });

  useEffect(() => {
    Axios.get('/trades/Last365CalendarDays')
      .then((response) => {
        if (response.status === 200) {
          const trades = response.data.trades.reverse()
            .filter((trade : Trade) => trade.symbol !== 'AUD.USD') // filter currency conversion trades
            .map((trade : Trade) => ({
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

          setState((prevState) => ({
            ...prevState,
            whenGenerated: new Date(response.data.whenGenerated),
            timezone: response.data.timezone,
            trades,
            openPositions,
            loading: false,
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            error: true,
            loading: false,
          }));
        }
      })
      .catch(() => {
        setState((prevState) => ({
          ...prevState,
          error: true,
          loading: false,
        }));
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>
          {COMMON.WEBSITE.titlePrefix}
          Trades
        </title>
        <link rel="canonical" href={`${COMMON.WEBSITE.baseURL}/trades`} />
      </Helmet>

      <MoonLoader
        css={LoaderCss}
        size={50}
        color={COLORS.white}
        loading={state.loading}
      />

      {state.error && (
      <FadeInDiv>
        <p>There was an error fetching the requested trades.</p>
      </FadeInDiv>
      )}
      {!state.loading && !state.error && (
        <FadeInDiv>
          <p>
            {'Showing '}
            <strong>{state.trades.length}</strong>
            {' trades over the last '}
            <strong>365</strong>
            {' days.'}
          </p>
          <p>
            <strong>Last Updated: </strong>
            {state.whenGenerated && new Intl.DateTimeFormat('en-GB', {
              year: 'numeric',
              month: 'long',
              day: '2-digit',
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
            }).format(state.whenGenerated)}
            {` ${moment.tz(state.timezone).zoneName()}`}
          </p>
          <br />
          <h2>Open Positions</h2>
          <br />
          <StyledTable className="table table-hover table-active">
            <thead>
              <tr>
                <th>Quantity</th>
                <th>Symbol</th>
                <th>Strike</th>
                <th>Put / Call</th>
                <th>Expiry</th>
                <th>Last Price Per Unit</th>
                <th>Total Price</th>
                <th>Currency</th>
              </tr>
            </thead>
            <tbody>
              {state.openPositions
                .map((openPosition) => (
                  <tr key={openPosition.symbol}>
                    <td>{openPosition.position}</td>
                    <td>
                      <TargetAwareLink
                        to={`https://finance.yahoo.com/quote/${openPosition.symbol.split(' ')[0]}`}
                        title={`${openPosition.symbol.split(' ')[0]} (${openPosition.description})`}
                        aria-label={`${openPosition.symbol.split(' ')[0]} (${openPosition.description})`}
                        rel="external nofollow"
                      >
                        {openPosition.symbol.split(' ')[0]}
                      </TargetAwareLink>
                    </td>
                    <td>{openPosition?.strike?.toFixed(0)}</td>
                    <td>{getPutOrCallFullText({ putCall: openPosition.putCall })}</td>
                    <td>
                      {openPosition.expiry && new Intl.DateTimeFormat('en-GB', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit',
                      }).format(openPosition.expiry)}

                    </td>
                    <td>{openPosition.markPrice.toFixed(2)}</td>
                    <td>
                      {calcTotalPrice({
                        pricePerShare: openPosition.markPrice,
                        quantity: openPosition.position,
                        isOptionContract: !!openPosition.putCall,
                      })
                        .toFixed(2)}
                    </td>
                    <td>{openPosition.currency}</td>
                  </tr>
                ))}
            </tbody>
          </StyledTable>
          <br />
          <br />
          <h2>Trades</h2>
          <br />
          <StyledTable className="table table-hover table-active">
            <thead>
              <tr>
                <th>
                  Date
                  <br />
                  (
                  {moment.tz(state.timezone).zoneName()}
                  )
                </th>
                <th>Buy / Sell</th>
                <th>Quantity</th>
                <th>Symbol</th>
                <th>Strike</th>
                <th>Put / Call</th>
                <th>Expiry</th>
                <th>Price Per Unit</th>
                <th>Total Price</th>
                <th>Commission</th>
                <th>Currency</th>
              </tr>
            </thead>
            <tbody>
              {state.trades
                .map((trade) => (
                  <tr key={trade.tradeID}>
                    <td>
                      {new Intl.DateTimeFormat('en-GB', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                      }).format(trade.dateTime)}
                    </td>
                    <td>
                      {trade.quantity >= 0 ? <span className="badge badge-success">BUY</span>
                        : <span className="badge badge-danger">SELL</span> }
                    </td>
                    <td>{Math.abs(trade.quantity)}</td>
                    <td>
                      <TargetAwareLink
                          to={`https://finance.yahoo.com/quote/${trade.symbol.split(' ')[0]}`}
                          title={`${trade.symbol.split(' ')[0]} (${trade.description})`}
                          aria-label={`${trade.symbol.split(' ')[0]} (${trade.description})`}
                          rel="external nofollow"
                      >
                        {trade.symbol.split(' ')[0]}
                      </TargetAwareLink>
                    </td>
                    <td>{trade?.strike?.toFixed(0)}</td>
                    <td>{getPutOrCallFullText({ putCall: trade.putCall })}</td>
                    <td>
                      {trade.expiry && new Intl.DateTimeFormat('en-GB', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit',
                      }).format(trade.expiry)}

                    </td>
                    <td>{trade.tradePrice.toFixed(2)}</td>
                    <td>
                      {calcTotalPrice({
                        pricePerShare: trade.tradePrice,
                        quantity: trade.quantity,
                        isOptionContract: !!trade.putCall,
                      })
                        .toFixed(2)}
                    </td>
                    <td>{trade.ibCommission.toFixed(2)}</td>
                    <td>{trade.currency}</td>
                  </tr>
                ))}
            </tbody>
          </StyledTable>
        </FadeInDiv>
      )}
    </>
  );
};

export default TradePage;
