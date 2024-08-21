import styled from 'styled-components';

export const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
  min-height: 100%;
  position: relative; /* Footer position fix */
`;

export const HeaderWrapper = styled.header`
  flex: 0 1 auto;
`;

export const MainWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1 1 auto;
`;

export const FooterWrapper = styled.footer`
  flex: 0 1 85px;
`;
