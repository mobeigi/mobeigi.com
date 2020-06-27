import React from 'react';

import { StyledIFrameContainer, StyledIFrame } from './styled';

const TradePage = () => (
  <StyledIFrameContainer>
    <StyledIFrame
      title="google-spreadsheet-trades"
      src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQsBCcRwfXoi9lHSseTZExNeM-Mw0gAVw7vBsz7TzLfPuZLfcWOaB865blkhvYRbcZb3m0WKLInoOL4/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false"
    />
  </StyledIFrameContainer>
);

export default TradePage;
