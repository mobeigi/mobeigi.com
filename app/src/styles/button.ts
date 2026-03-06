import { styled } from 'styled-components';

const BaseButton = styled.button``;

export const PrimaryButton = styled(BaseButton)``;

export const SecondaryButton = styled(BaseButton)`
  color: var(--theme-status-secondary-complement);
  background-color: var(--theme-status-secondary-base);

  &:hover {
    background-color: var(--theme-status-secondary-highlight);
  }

  &:active {
    background-color: var(--theme-status-secondary-base);
  }

  &:focus,
  &:focus-visible {
    box-shadow: 0 0 0 0.25em color-mix(in srgb, var(--theme-status-secondary-base) 50%, transparent);
  }
`;

export const StylelessButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;

  &:hover {
    background: none;
  }

  &:active {
    background: none;
  }

  &:focus,
  &:focus-visible {
    background: none;
    box-shadow: none;
  }
`;
