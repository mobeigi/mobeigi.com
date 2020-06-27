import styled from 'styled-components';

export const StyledIFrameContainer = styled.div`
  width: 90%;
  height: 0;
  margin: 0 auto;
  padding-top: 30%;
  position: relative
`;

export const StyledIFrame = styled.iframe`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

export default { StyledIFrameContainer, StyledIFrame };
