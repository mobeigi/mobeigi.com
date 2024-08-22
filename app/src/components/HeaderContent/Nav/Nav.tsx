'use client';

import { NavContainer, StyledLink } from './styled';
import { usePathname } from 'next/navigation';
import { pages } from '@/constants/pages';

export const Nav = () => {
  const pathname = usePathname();

  console.log(pathname);
  return (
    <NavContainer>
      {pages.map((page) => {
        const active = pathname === page.href;
        return (
          <StyledLink key={page.name} href={page.href} $active={active}>
            {page.name}
          </StyledLink>
        );
      })}
    </NavContainer>
  );
};

export default Nav;
