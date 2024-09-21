'use client';

import styled from 'styled-components';

export const SubcategoryNav = styled.nav`
  display: flex;

  & ul {
    display: flex;
    gap: 0.4em;

    flex-direction: column;
    margin: 0 0 0 1em;

    & li {
      display: flex;
      padding: 0;
    }
  }
`;

export const SubcategoryContainer = styled.div`
  display: flex;
  gap: 0.4em;
`;
