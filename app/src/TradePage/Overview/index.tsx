import React from 'react';
import moment from 'moment';
import { useSpring, animated } from 'react-spring';

import TimeWeightedReturnChart from './TimeWeightedReturnChart';
import type { Props } from './types';
import { StyledTable } from '../common/styled';
import { StatisticValue, TimeWeightedReturnChartContainer } from './styled';
import {
  getCurrentFinancialYearStartDate,
  getTradesInRange,
  filterStockTrades,
  filterOptionTrades,
  getDepositWithdrawalInRange,
  getEquitySummaryInBaseInRange,
  getEquitySummaryInBaseForDay,
  getTimeWeightedReturn,
} from './utils';

const Overview = ({
  trades, lastUpdated, depositsWithdrawals, equitySummaryInBase,
}: Props) => {
  // Perform statisitc calculations
  const currentFinancialYearStartDate = getCurrentFinancialYearStartDate();
  const currentFinancialYearTrades = getTradesInRange({
    trades,
    from: currentFinancialYearStartDate,
    to: new Date(),
  });
  const stockTradingFrequency = filterStockTrades({ trades: currentFinancialYearTrades }).length
    / currentFinancialYearTrades.length;
  const optionTradingFrequency = filterOptionTrades({ trades: currentFinancialYearTrades }).length
    / currentFinancialYearTrades.length;
  const currentFinancialYearDepositWithdrawal = getDepositWithdrawalInRange(
    {
      depositsWithdrawals,
      from: currentFinancialYearStartDate,
      to: new Date(),
    },
  );

  const currentFinancialYearNetDepositWithdrawal = currentFinancialYearDepositWithdrawal
    .reduce((accumulator, current) => accumulator + (current.amount * current.fxRateToBase), 0);

  const currentFinancialYearStartDateEquitySummaryInBase = getEquitySummaryInBaseForDay(
    {
      equitySummaryInBase,
      date: currentFinancialYearStartDate,
    },
  );

  const currentFinancialYearEquitySummaryInBase = getEquitySummaryInBaseInRange({
    equitySummaryInBase,
    from: currentFinancialYearStartDate,
    to: new Date(),
  });

  const timeWeightedReturnData = getTimeWeightedReturn({
    equitySummaryInBase: currentFinancialYearEquitySummaryInBase,
    depositsWithdrawals: currentFinancialYearDepositWithdrawal,
  });

  if (!currentFinancialYearStartDateEquitySummaryInBase) {
    throw new Error(`Failed to get getEquitySummaryInBaseForDay for date ${currentFinancialYearStartDate}`);
  }

  const totalCostBasis = currentFinancialYearNetDepositWithdrawal
    + currentFinancialYearStartDateEquitySummaryInBase.total;
  const currentNetLiquidity = equitySummaryInBase.slice(-1)[0].total;
  const fytdReturn = (currentNetLiquidity - totalCostBasis) / totalCostBasis;

  // Set up animation
  const countAnimationConfig = {
    from: { number: 0 },
    config: { duration: 1500 },
  };

  const fytdReturnAnimation = useSpring({
    ...countAnimationConfig,
    number: fytdReturn * 100,
  });

  const averageTradesAnimation = useSpring({
    ...countAnimationConfig,
    number: currentFinancialYearTrades.length / 12,
  });

  const currentFinancialYearTradesAnimation = useSpring({
    ...countAnimationConfig,
    number: currentFinancialYearTrades.length,
  });

  const stockTradingFrequencyAnimation = useSpring({
    ...countAnimationConfig,
    number: stockTradingFrequency * 100,
  });

  const optionTradingFrequencyAnimation = useSpring({
    ...countAnimationConfig,
    number: optionTradingFrequency * 100,
  });

  return (
    <div>
      <h2>Overview</h2>
      <p>
        Tracked from the start of the current Australian Financial Year (
        <strong>
          {`FY${moment(currentFinancialYearStartDate).year().toString().substr(2)}/${moment(currentFinancialYearStartDate).add(1, 'year').year().toString()
            .substr(2)}`}
        </strong>
        )
      </p>
      {lastUpdated}
      <TimeWeightedReturnChartContainer>
        <TimeWeightedReturnChart data={timeWeightedReturnData} />
      </TimeWeightedReturnChartContainer>
      <br />
      <StyledTable className="table table-hover table-active">
        <thead>
          <tr>
            <th>Statistic</th>
            <th>Description</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Return (%)</td>
            <td>
              Computed as difference between net liquidity and cost basis.
            </td>
            <td>
              <StatisticValue className={`badge ${fytdReturn > 0 ? 'badge-success' : 'badge-danger'}`}>
                <animated.span>
                  {fytdReturnAnimation.number.interpolate((val) => val.toFixed(2))}
                </animated.span>
                %
              </StatisticValue>
            </td>
          </tr>
          <tr>
            <td>Average Trades per month</td>
            <td>Excludes Forex transactions.</td>
            <td>
              <StatisticValue className="badge badge-light">
                <animated.span>
                  {averageTradesAnimation.number.interpolate((val) => Number(val.toFixed(2)))}
                </animated.span>
              </StatisticValue>

            </td>
          </tr>
          <tr>
            <td>Total Trades</td>
            <td>Excludes Forex transactions.</td>
            <td>
              <StatisticValue className="badge badge-light">
                <animated.span>
                  {currentFinancialYearTradesAnimation.number.interpolate((val) => Math.floor(val))}
                </animated.span>
              </StatisticValue>

            </td>
          </tr>
          <tr>
            <td>Stock Trading Frequency (%)</td>
            <td>Percentage of trades with shares as the financial instrument.</td>
            <td>
              <StatisticValue className="badge badge-light">
                <animated.span>
                  {stockTradingFrequencyAnimation.number.interpolate((val) => val.toFixed(2))}
                </animated.span>
                %
              </StatisticValue>

            </td>
          </tr>
          <tr>
            <td>Option Trading Frequency (%)</td>
            <td>Percentage of trades with options as the financial instrument.</td>
            <td>
              <StatisticValue className="badge badge-light">
                <animated.span>
                  {optionTradingFrequencyAnimation.number.interpolate((val) => val.toFixed(2))}
                </animated.span>
                %
              </StatisticValue>

            </td>
          </tr>
        </tbody>
      </StyledTable>

    </div>
  );
};

export default Overview;
