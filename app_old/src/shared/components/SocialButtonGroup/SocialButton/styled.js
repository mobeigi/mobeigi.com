import styled from 'styled-components';
import { COLORS } from '../../../constants/Colors';

export const StyledSocialButton = styled.div`
  display: inline-block;
  color: ${COLORS.grey};
`;

export const StyledSocialButtonWithHover = styled(StyledSocialButton)`
  &:hover {
    color: ${COLORS.white};
  }
`;
