import React from 'react';

import type { TooltipProps } from './types';
import {
  TooltipContainer,
  DateWrapper,
  Icon,
  ReturnContainer,
  ReturnRow,
  IconContainer,
  SeriesNameContainer,
  ReturnPercentageContainer,
} from './styled';
import { getNiceDate, getReturnColor } from './utils';

export const Tooltip = ({ portfolioData, marketData }: TooltipProps) => {
  const date = portfolioData && getNiceDate({ date: portfolioData.date });
  return (
    <TooltipContainer>
      <DateWrapper>{date}</DateWrapper>
      <ReturnContainer>
        {portfolioData && (
          <ReturnRow>
            <IconContainer>
              <Icon color={portfolioData.color} />
            </IconContainer>
            <SeriesNameContainer>{portfolioData.seriesName}</SeriesNameContainer>
            <ReturnPercentageContainer
              color={getReturnColor({ returnPercentage: Number(portfolioData.returnPercentage) })}
            >
              {portfolioData.returnPercentage}%
            </ReturnPercentageContainer>
          </ReturnRow>
        )}
        {marketData && (
          <ReturnRow>
            <IconContainer>
              <Icon color={marketData.color} />
            </IconContainer>
            <SeriesNameContainer>{marketData.seriesName}</SeriesNameContainer>
            <ReturnPercentageContainer
              color={getReturnColor({ returnPercentage: Number(marketData.returnPercentage) })}
            >
              {marketData.returnPercentage}%
            </ReturnPercentageContainer>
          </ReturnRow>
        )}
      </ReturnContainer>
    </TooltipContainer>
  );
};
