import React from 'react';
import moment from 'moment';
import 'moment-timezone';

import TargetAwareLink from '../../shared/utils/TargetAwareLink';
import { StyledTable } from '../common/styled';
import { calcTotalPrice, getPutOrCallFullText } from '../common/utils';
import type { Props } from './types';

const TradeHistory = ({ trades, lastUpdated, timezone }: Props) => (
  <div>
    <h2>Trades</h2>
    <br />
    <p>
      {'Showing '}
      <strong>{trades.length}</strong>
      {' trades over the last '}
      <strong>365</strong>
      {' days.'}
    </p>
    {lastUpdated}
    <br />
    <StyledTable className="table table-hover table-active">
      <thead>
        <tr>
          <th>
            Date
            <br />({moment.tz(timezone).zoneName()})
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
        {trades.map((trade) => (
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
              {trade.quantity >= 0 ? (
                <span className="badge badge-success">BUY</span>
              ) : (
                <span className="badge badge-danger">SELL</span>
              )}
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
              {trade.expiry &&
                new Intl.DateTimeFormat('en-GB', {
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
              }).toFixed(2)}
            </td>
            <td>{trade.ibCommission.toFixed(2)}</td>
            <td>{trade.currency}</td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  </div>
);

export default TradeHistory;
