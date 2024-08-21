import styled from 'styled-components';

type StyledLogoProps = {
  image?: string;
  width?: number;
  height?: number;
};

export const StyledLogo = styled.div<StyledLogoProps>`
  background-image: url(${({ image = '' }) => image});
  width: ${({ width = 150 }) => width}px;
  height: ${({ height = 150 }) => height}px;
  background-size: ${(props) => props.width}px ${(props) => props.height}px;
  background-repeat: no-repeat;
`;
