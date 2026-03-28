import { styled } from 'styled-components';
import { Tooltip } from 'react-tooltip';
import zIndex from '@/styles/zindex';

export const BaseTooltipWrapper = styled.div`
  /* Set desired z-index */
  z-index: ${zIndex.tooltip};

  /* 
   * Make tooltips position fixed
   * Has to be applied to wrapper div around tooltip
   * This also fixes some flickering issues when focusing 
   * from one tooltip directly to another one that is wide on mobile
   */
  position: fixed;

  & .rt-theme-dark {
    --rt-color-dark: var(--theme-tooltip-background);
    --rt-color-white: var(--theme-tooltip-text);
  }

  & .rt-theme-light {
    --rt-color-dark: var(--theme-tooltip-background);
    --rt-color-white: var(--theme-tooltip-text);
  }
`;

export const StyledTooltip = styled(Tooltip)`
  /* This ensures the tooltip contents are never bigger than the viewport itself */
  max-width: 90vw;
  max-height: 90vh;
`;
