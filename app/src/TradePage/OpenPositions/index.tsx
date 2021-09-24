import React from 'react';
import { StyledTable } from '../common/styled';
import { TargetAwareLink } from '../../shared/utils/TargetAwareLink';
import {
  calcSecurityTotalPrice,
  getPutOrCallFullText,
  getOpenPositionTotalPrice,
  isOptionContract,
  CreateGoogleFinanceQuoteUrl,
} from '../common/utils';
import type { Props } from './types';
import { HoldingsPieChart } from './HoldingsPieChart';
import { OpenPositionsContainer, HoldingsPieChartContainer } from './styles';

export const OpenPositions = ({ openPositions, lastUpdated }: Props) => {
  const openPositionTotalPrice = getOpenPositionTotalPrice({ openPositions });

  return (
    <div>
      <h2>Open Positions</h2>
      <br />
      {'Holding '}
      <strong>{openPositions.length}</strong>
      {' positions.'}
      {lastUpdated}
      <OpenPositionsContainer>
        <HoldingsPieChartContainer>
          <HoldingsPieChart
            data={openPositions.map((openPosition) => {
              const currentPositionTotalPrice = calcSecurityTotalPrice({
                pricePerShare: openPosition.markPrice,
                quantity: openPosition.position,
                isOptionContract: isOptionContract({ position: openPosition }),
              });
              const weight = (currentPositionTotalPrice / openPositionTotalPrice) * 100;
              return {
                value: currentPositionTotalPrice,
                name: openPosition.symbol.split(' ')[0],
                description: openPosition.description,
                weight,
              };
            })}
          />
        </HoldingsPieChartContainer>
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
            {openPositions.map((openPosition) => {
              const currentPositionTotalPrice = calcSecurityTotalPrice({
                pricePerShare: openPosition.markPrice,
                quantity: openPosition.position,
                isOptionContract: isOptionContract({ position: openPosition }),
              });
              const weight = (currentPositionTotalPrice / openPositionTotalPrice) * 100;
              const symbol = openPosition.symbol.split(' ')[0];
              const googleFinanceQuoteUrl = CreateGoogleFinanceQuoteUrl({
                symbol,
                exchange: openPosition.underlyingListingExchange || openPosition.listingExchange,
              });
              return (
                <tr key={openPosition.symbol}>
                  <td>{openPosition.position}</td>
                  <td>
                    <TargetAwareLink
                      to={googleFinanceQuoteUrl}
                      title={`${symbol} (${openPosition.description})`}
                      aria-label={`${symbol} (${openPosition.description})`}
                      rel="external nofollow"
                    >
                      {symbol}
                    </TargetAwareLink>
                  </td>
                  <td>{openPosition?.strike?.toFixed(0)}</td>
                  <td>{getPutOrCallFullText({ putCall: openPosition.putCall })}</td>
                  <td>
                    {openPosition.expiry &&
                      new Intl.DateTimeFormat('en-GB', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit',
                        timeZone: 'America/New_York',
                      }).format(openPosition.expiry)}
                  </td>
                  <td>{openPosition.markPrice.toFixed(2)}</td>
                  <td>{currentPositionTotalPrice.toFixed(2)}</td>
                  <td>{openPosition.currency}</td>
                  <td>{weight.toFixed(2)}%</td>
                </tr>
              );
            })}
          </tbody>
        </StyledTable>
      </OpenPositionsContainer>
    </div>
  );
};
