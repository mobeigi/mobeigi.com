'use client';

import { ContainerNav, StyledLink } from './styled';
import { usePathname } from 'next/navigation';
import { pages } from '@/constants/links';

export const Nav = () => {
  const pathname = usePathname();

  return (
    <ContainerNav aria-label="Main navigation">
      {pages.map((page) => {
        const active = pathname === page.href;
        return (
          <StyledLink key={page.name} href={page.href} $active={active}>
            {page.name}
          </StyledLink>
        );
      })}
    </ContainerNav>
  );
};

export default Nav;
