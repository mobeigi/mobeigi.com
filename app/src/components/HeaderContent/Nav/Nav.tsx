'use client';

import { ContainerNav, DesktopNav, DropdownMenu, MobileNav, StyledLink } from './styled';
import { usePathname } from 'next/navigation';
import { pages } from '@/constants/links';
import { useState } from 'react';
import { IconWrapperBubbleButton } from '@/styles/icon';
import MenuSvg from '@/assets/icons/boxicons/bx-menu.svg';

interface NavInnerProps {
  onLinkClick?: () => void;
}

const NavInner = ({ onLinkClick }: NavInnerProps) => {
  const pathname = usePathname();
  return (
    <ContainerNav aria-label="Main navigation">
      {pages.map((page) => {
        const active = pathname === page.href;
        return (
          <StyledLink key={page.name} href={page.href} $active={active} onClick={onLinkClick}>
            {page.name}
          </StyledLink>
        );
      })}
    </ContainerNav>
  );
};

export const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <>
      <DesktopNav>
        <NavInner />
      </DesktopNav>
      <MobileNav>
        <IconWrapperBubbleButton onClick={toggleMenu}>
          <MenuSvg />
        </IconWrapperBubbleButton>
        {isMenuOpen && (
          <DropdownMenu>
            <NavInner onLinkClick={() => setIsMenuOpen(false)} />
          </DropdownMenu>
        )}
      </MobileNav>
    </>
  );
};

export default Nav;
