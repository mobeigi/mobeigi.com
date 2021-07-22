import styled from 'styled-components';
import { COLORS } from '../../shared/constants/Colors';

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
  align-self: flex-end;
  line-height: 0.9;
`;

export const TagLineWrapper = styled.div`
  font-size: 1.65em;
  font-weight: 100;
  margin: 14px 0 14px 0;
  color: ${COLORS.grey};
`;
