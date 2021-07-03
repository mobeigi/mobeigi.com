import React, { PropsWithChildren } from 'react';
import { useSpring, animated } from 'react-spring';

export const FadeIn = ({ children }: PropsWithChildren<{}>) => {
  const style = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 250 },
    reset: true,
  });

  return <animated.div style={style}>{children}</animated.div>;
};
