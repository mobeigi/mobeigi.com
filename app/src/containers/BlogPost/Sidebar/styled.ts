'use client';

import styled from 'styled-components';

export const SidebarContainer = styled.div`
  display: block;

  padding-left: 1em;
  padding-right: 1em;
  padding-top: 1em;
  padding-bottom: 1em;
  box-sizing: border-box;

  /* Remove top margin from first childfor consistent layout (start position) */
  :first-child {
    margin-top: 0;
  }
`;

export const CustomFieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;

  p {
    margin: 0;
  }
`;
