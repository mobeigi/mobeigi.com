import styled from 'styled-components';
import { COLORS } from '../../constants/Colors';

export const StyledFooter = styled.div`
  display: flex;
  padding: 30px 15px 30px;
  text-align: center;
  font-size: 0.75rem;
  height: 85px; /* Height of the footer */
  color: ${COLORS.grey};

  a {
    color: ${COLORS.grey};
  }
`;

export const FlexOuterItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const LinkWrapper = styled.span`
  margin: 0 10px;
`;
