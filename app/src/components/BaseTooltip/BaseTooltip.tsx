'use client';

import { useTheme } from 'next-themes';
import { BaseTooltipWrapper, StyledTooltip } from './styled';
import { resolvedThemeToThemeMode } from '@/utils/theme';
import { BaseTooltipProps } from './types';

// Provides a base tooltip that has been styled.
// It is best practice to store one copy of this tooltip and reuse it for performance and to avoid various DOM render bugs
export const BaseTooltip = ({ id, isOpen }: BaseTooltipProps) => {
  const { resolvedTheme } = useTheme();
  const resolvedThemeMode = resolvedThemeToThemeMode(resolvedTheme);

  return (
    <BaseTooltipWrapper>
      <StyledTooltip id={id} place="bottom" opacity={1.0} className={`rt-theme-${resolvedThemeMode}`} isOpen={isOpen} />
    </BaseTooltipWrapper>
  );
};
