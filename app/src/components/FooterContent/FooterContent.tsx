import Image from 'next/image';
import { Copyright, FooterContainer, FooterContents, InfoArea, FooterNav, LogoWrapper } from './styled';
import { COPYRIGHT_START_YEAR, SITE_TITLE } from '@/constants/app';
import { essentials, legal, networks, pages } from '@/constants/links';
import Link from 'next/link';

export const FooterContent = () => (
  <FooterContainer>
    <FooterContents>
      <LogoWrapper>
        <Image
          src="/images/signature/mo-signature.svg"
          alt="TODO"
          width={256}
          height={70}
          quality={100}
          draggable={false}
        />
      </LogoWrapper>
      <FooterNav>
        <div>
          <p>{SITE_TITLE}</p>
          <ul>
            {pages.map((page) => (
              <li key={page.name}>
                <Link href={page.href}>{page.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p>Essentials</p>
          <ul>
            {essentials.map((essential) => (
              <li key={essential.name}>
                <Link href={essential.href}>{essential.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p>Networks</p>
          <ul>
            {networks.map((network) => (
              <li key={network.name}>
                <Link href={network.href}>{network.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p>Legal</p>
          <ul>
            {legal.map((legal) => (
              <li key={legal.name}>
                <Link href={legal.href}>{legal.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </FooterNav>
      <InfoArea>
        <p>TODO: Build info</p>
        <Copyright>
          <span>
            Copyright © {COPYRIGHT_START_YEAR} - {new Date().getFullYear()} &middot; {SITE_TITLE}
          </span>
          <span>All rights reserved</span>
        </Copyright>
      </InfoArea>
    </FooterContents>
  </FooterContainer>
);
