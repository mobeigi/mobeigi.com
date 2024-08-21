import styled from 'styled-components';
import { COLORS } from '../../../constants/Colors';

export const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

export const LogoAndSiteName = styled.div`
  display: flex;
  margin: 0 auto;
`;

export const SiteNameWrapper = styled.div`
  font-size: 5em;
  font-weight: 600;
  color: ${COLORS.alto};
  align-self: center;
  margin-top: 0.3em;
  line-height: 0.9;
  user-select: none;

  &:hover {
    color: ${COLORS.white};
  }
`;
