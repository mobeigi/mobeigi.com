import React from 'react';
import { useSpring, animated } from 'react-spring';

const FadeIn: React.FunctionComponent = ({ children }) => {
  const style = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 250 },
    reset: true,
  });

  return <animated.div style={style}>{children}</animated.div>;
};

export default FadeIn;
