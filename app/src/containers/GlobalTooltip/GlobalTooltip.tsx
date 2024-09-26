import { GlobalTooltipWrapper, StyledTooltip } from './styled';

// Provides a top level tooltip that can be reused by the entire app
// It is best practice to store one copy of this tooltip and reuse it for performance and to avoid various DOM render bugs
// TODO: Tooltip needs to support themes other than just dark
export const GlobalTooltip = () => (
  <GlobalTooltipWrapper>
    <StyledTooltip id={`base-tooltip`} place="top" variant="dark" opacity={0.9} />
  </GlobalTooltipWrapper>
);
