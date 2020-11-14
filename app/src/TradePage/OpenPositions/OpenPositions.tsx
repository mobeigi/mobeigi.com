import React from 'react';
import { StyledTable } from '../common/styled';
import TargetAwareLink from '../../shared/utils/TargetAwareLink';
import {
  calcTotalPrice, getPutOrCallFullText, displayFractionAsPercentage, getOpenPositionTotalPrice,
} from '../common/utils';
import type { Props } from './types';

const OpenPositions = ({ openPositions, lastUpdated }: Props) => (
  <div>
    <h2>Open Positions</h2>
    <br />
    {'Holding '}
    <strong>{openPositions.length}</strong>
    {' positions.'}
    {lastUpdated}
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
          <th>Weight</th>
        </tr>
      </thead>
      <tbody>
        {openPositions
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
              <td>
                {displayFractionAsPercentage(
                  {
                    fraction:
                  (openPosition.position * openPosition.markPrice)
                  / getOpenPositionTotalPrice({ openPositions }),
                  },
                )}
              </td>
            </tr>
          ))}
      </tbody>
    </StyledTable>
  </div>
);

export default OpenPositions;
