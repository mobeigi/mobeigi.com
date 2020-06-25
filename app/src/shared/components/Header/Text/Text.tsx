import React from 'react';

import StyledText from './styled';

type Props = {
  style?: any,
}

const Text = ({ children, ...props }: React.PropsWithChildren<Props>) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <StyledText {...props}>
    {children}
  </StyledText>
);

export default Text;
