import { IconWrapper } from '@/styles/icon';
import styled from 'styled-components';

export const ContainerNav = styled.nav`
  display: flex;

  & ul {
    display: flex;
    gap: 0.4em;

    flex-direction: column;
    margin: 0 0 0 1em;

    & li {
      display: flex;
      padding: 0;
    }
  }
`;

export const SubcategoryContainer = styled.div`
  display: flex;
  gap: 0.4em;
  color: var(--theme-text-link);
`;

export const CategoryIconWrapper = styled(IconWrapper)`
  svg {
    fill: var(--theme-text-link);
  }
`;
