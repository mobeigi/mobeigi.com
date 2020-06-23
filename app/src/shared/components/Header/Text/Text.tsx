import React from 'react';

import StyledText from './styled';

interface Props {}

const Text = ({ children }: React.Props<Props>) => (
  <StyledText>
    {children}
  </StyledText>
);

export default Text;
