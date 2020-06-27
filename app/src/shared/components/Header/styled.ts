import styled from 'styled-components';

export const TopComponent = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

type LogoDivProps = {
  image?: string;
  width?: string;
  height?: string;
};

export const LogoDiv = styled.div<LogoDivProps>`
  background-image: url(${(props) => props.image});
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: inline-block;
  background-size: ${(props) => props.width} ${(props) => props.height};
  background-repeat: no-repeat;
`;

LogoDiv.defaultProps = {
  image: '',
  width: '150px',
  height: '150px',
};

export default { TopComponent, LogoDiv };
