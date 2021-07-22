import styled from 'styled-components';
import { COLORS } from '../../constants/Colors';

export const Nav = styled.nav`
  display: flex;
  justify-content: flex-start;
  height: 3rem;
  background: rgba(90, 90, 90, 0.6) url(/images/bg/bg-nav.jpg) repeat;
  border-bottom: 3px solid ${COLORS.darkGrey};
`;

export const HeaderWrapper = styled.div`
  font-size: 0.3rem;
  a:hover {
    text-decoration: none;
  }
`;

export const NavItems = styled.div`
  display: flex;
  font-size: 1em;
  padding-left: 25px;
  align-items: center;
  margin-top: 0.6em;
  * {
    margin-left: 10px;
  }
`;

export const PageName = styled.div`
  font-weight: bold;
  user-select: none;
`;

export const PageIconWrapper = styled.div`
  font-size: 1.25em;
`;
