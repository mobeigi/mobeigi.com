'use client';

import { useTheme } from 'styled-components';
import { GlobalTooltipWrapper, StyledTooltip } from './styled';

// Provides a top level tooltip that can be reused by the entire app
// It is best practice to store one copy of this tooltip and reuse it for performance and to avoid various DOM render bugs
export const GlobalTooltip = () => {
  const { currentThemeMode } = useTheme();

  return (
    <GlobalTooltipWrapper>
      <StyledTooltip id={`base-tooltip`} place="bottom" opacity={1.0} className={`rt-theme-${currentThemeMode}`} />
    </GlobalTooltipWrapper>
  );
};
