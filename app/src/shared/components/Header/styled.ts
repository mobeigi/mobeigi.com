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
  background-image: url(${(props) => props.image});
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  display: inline-block;
  background-size: ${(props) => props.width}px ${(props) => props.height}px;
  background-repeat: no-repeat;
`;

LogoDiv.defaultProps = {
  image: '',
  width: 150,
  height: 150,
};

export default { TopComponent, LogoDiv };
