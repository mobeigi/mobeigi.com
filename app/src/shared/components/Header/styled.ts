import styled from 'styled-components';

export const TopComponent = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

type LogoDivProps = {
  image?: String;
  width?: String;
  height?: String;
}

export const LogoDiv = styled.div<LogoDivProps>`
  background-image: url(${(props: any) => props.image});
  width: ${(props: any) => props.width};
  height: ${(props: any) => props.height};
  display: inline-block;
  background-size: ${(props: any) => props.width} ${(props: any) => props.height};
  background-repeat: no-repeat;
`;

LogoDiv.defaultProps = {
  image: '',
  width: '150px',
  height: '150px',
};

export default { TopComponent, LogoDiv };
