import styled from 'styled-components';

export const TopComponent = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

type LogoDivProps = {
  image?: string;
  width?: number;
  height?: number;
};

export const LogoDiv = styled.div<LogoDivProps>`
  background-image: url(${({ image = '' }) => image});
  width: ${({ width = 150 }) => width}px;
  height: ${({ height = 150 }) => height}px;
  display: inline-block;
  background-size: ${(props) => props.width}px ${(props) => props.height}px;
  background-repeat: no-repeat;
`;
