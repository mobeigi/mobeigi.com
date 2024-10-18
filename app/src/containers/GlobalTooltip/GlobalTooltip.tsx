'use client';

import { useTheme } from 'next-themes';
import { GlobalTooltipWrapper, StyledTooltip } from './styled';
import { resolvedThemeToThemeMode } from '@/utils/theme';

// Provides a top level tooltip that can be reused by the entire app
// It is best practice to store one copy of this tooltip and reuse it for performance and to avoid various DOM render bugs
export const GlobalTooltip = () => {
  const { resolvedTheme } = useTheme();
  const resolvedThemeMode = resolvedThemeToThemeMode(resolvedTheme);

  return (
    <GlobalTooltipWrapper>
      <StyledTooltip id={`base-tooltip`} place="bottom" opacity={1.0} className={`rt-theme-${resolvedThemeMode}`} />
    </GlobalTooltipWrapper>
  );
};
