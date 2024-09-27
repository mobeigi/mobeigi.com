'use client';

import styled from 'styled-components';

export const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  background-color: ${({ theme }) => theme.current.frame.background};
  border-bottom: 0.2em solid ${({ theme }) => theme.current.frame.accent};
  box-sizing: border-box;
`;

export const HeaderContents = styled.div`
  display: flex;
  width: 100%;
  max-width: var(--max-layout-width);

  justify-content: space-between;

  padding-left: 1em;
  padding-right: 1em;
  box-sizing: border-box;

  /* Force each child to take up equal width */
  & > * {
    flex: 1 1 0; /* Equal distribution of space */

    /* Allow overflow to ensure equal width even if vw is very limited. 
    This will cause overlapping elements if individual header items are too wide!
    Each child should ensure its not too wide and handle its own overflow.
    */
    min-width: 0;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  gap: 0.2em;
`;

export const LogoWrapper = styled.div`
  display: block;
  position: relative;
  width: 3.5em;
  height: 100%;
  user-select: none;

  img {
    width: auto;
    height: 100%;
    object-fit: contain;
  }
`;

export const SiteTitle = styled.span`
  display: flex;
  align-self: center;
  margin-top: 0.2em;
  font-size: 1.5em;
  font-weight: 700;
  white-space: nowrap;
  user-select: none;
`;

export const NavWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.2em;
`;

export const RightSideNavContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 0.2em;
  font-size: 1.5em;
`;
