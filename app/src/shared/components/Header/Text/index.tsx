import React, { CSSProperties, PropsWithChildren } from 'react';

import { StyledText } from './styled';

type Props = {
  style?: CSSProperties;
};

export const Text = ({ children, ...props }: PropsWithChildren<Props>) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <StyledText {...props}>{children}</StyledText>
);
