import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Axios from 'axios';

import { StyledTable } from './styled';
import type { State, Trade } from './types';
import { calcTotalPrice } from './utils';
import COMMON from '../shared/constants/Common';

const TradePage = () => {
  const [state, setState] = React.useState<State>({
    trades: [],
    whenGenerated: null,
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
              strike: Number(trade.strike),
              dateTime: new Date(trade.dateTime),
              quantity: Number(trade.quantity),
              tradePrice: Number(trade.tradePrice),
              ibCommission: Number(trade.ibCommission),
            }));

          setState((prevState) => ({
            ...prevState,
            whenGenerated: new Date(response.data.whenGenerated),
            trades,
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            error: true,
          }));
        }
      })
      .catch(() => {
        setState((prevState) => ({
          ...prevState,
          error: true,
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
      {state.error
        ? <p>There was an error fetching the requested trades.</p>
        : (
          <>
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
            </p>
            <br />
            <StyledTable className="table table-hover table-active">
              <thead>
                <tr>
                  <th>
                    Date
                    <br />
                    (SYD)
                  </th>
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
                      <td>{trade.quantity}</td>
                      <td>{trade.symbol}</td>
                      <td>{trade.strike.toFixed(0)}</td>
                      <td>{trade.putCall}</td>
                      <td>{trade.expiry}</td>
                      <td>{trade.tradePrice.toFixed(2)}</td>
                      <td>
                        {calcTotalPrice({
                          pricePerShare: trade.tradePrice,
                          quantity: trade.quantity,
                          isOptionContract: trade.putCall !== '',
                        })
                          .toFixed(2)}
                      </td>
                      <td>{trade.ibCommission.toFixed(2)}</td>
                      <td>{trade.currency}</td>
                    </tr>
                  ))}
              </tbody>
            </StyledTable>
          </>
        )}
    </>
  );
};

export default TradePage;
