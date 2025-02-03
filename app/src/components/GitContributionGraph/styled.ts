'use client';

import styled from 'styled-components';

export const GitContributionGraphContainer = styled.div`
  display: flex;
  width: 100%;
  height: 165px;

  /* Hide tap highlight in webkit browsers on mobile */
  -webkit-tap-highlight-color: transparent;
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
