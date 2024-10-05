'use client';

import styled from 'styled-components';

export const DarkModeSwitchWrapper = styled.div`
  display: flex;
  justify-content: center;

  // Prevent button from triggering clicks as we will programatially call it
  pointer-events: none;

  button:focus,
  button:focus-visible {
    box-shadow: none;
  }
`;
