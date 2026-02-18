import styled from 'styled-components';
import { breakpoints } from '@/styles/breakpoints';

export const ContactBodyContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  gap: 1em;

  > div {
    flex: 1;
  }

  @media (max-width: ${breakpoints.mobile.maxWidth}px) {
    flex-direction: column;
    gap: 0;
  }
`;
