import styled from 'styled-components';
import { COLORS } from '../../constants/Colors';

export const Nav = styled.nav`
  display: flex;
  justify-content: flex-start;
  height: 4rem;
  background: rgba(90, 90, 90, 0.6) url(/images/bg/bg-nav.jpg) repeat;
  border-bottom: 3px solid ${COLORS.darkGrey};
`;

export const HeaderWrapper = styled.div`
  font-size: 0.45rem;
  a:hover {
    text-decoration: none;
  }
`;

export const NavItems = styled.div`
  display: flex;
  font-size: 1.75em;
  padding-left: 25px;
  align-self: flex-end;
  * {
    padding-left: 10px;
  }
`;

export const PageName = styled.div`
  font-weight: bold;
`;
