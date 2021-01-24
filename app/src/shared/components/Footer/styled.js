import styled from 'styled-components';
import COLOURS from '../../constants/Colors';

export const StyledFooter = styled.footer`
  display: flex;
  padding: 30px 10px 30px;
  text-align: center;
  font-size: 0.75rem;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 85px; /* Height of the footer */
  color: ${COLOURS.grey};

  a {
    color: ${COLOURS.grey};
  }
`;

export const FlexOuterItem = styled.p`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const LinkWrapper = styled.span`
  margin: 0 10px;
`;

export default { StyledFooter };
