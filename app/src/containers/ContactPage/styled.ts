'use client';

import styled from 'styled-components';

export const ContactBodyContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  gap: 1em;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile.maxWidth}px) {
    flex-direction: column;
  }
`;
