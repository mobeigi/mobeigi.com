import React from 'react';
import TargetAwareLink from '../../utils/TargetAwareLink';

import { StyledFooter } from './styled';
import COMMON from '../../constants/Common';

const footerItemList = [
  { link: '/', text: 'Home' },
  { link: '/blog', forceReload: true, text: 'Blog' },
  { link: '/blog/projects', forceReload: true, text: 'Projects' },
  { link: '/blog/easter-eggs', forceReload: true, text: 'Easter Eggs' },
  { link: '/blog/about', forceReload: true, text: 'About Me' },
  { link: '/blog/contact', forceReload: true, text: 'Contact Me' },
  { link: '/blog/feed/rss', forceReload: true, text: 'RSS' },
];

const Footer : React.FunctionComponent = () => {
  const footerItems = footerItemList.map<React.ReactNode>(
    (footerItem) => (
      <TargetAwareLink
        key={footerItem.text}
        to={footerItem.link}
        forceReload={footerItem.forceReload}
      >
        {footerItem.text}
      </TargetAwareLink>
    ),
  ).reduce((prev, curr) => [prev, '|', curr]);

  return (
    <StyledFooter>
      <p>
        {footerItems}
      </p>
      <p>
        Copyright &copy;
        {` ${COMMON.WEBSITE.foundingYear} - ${new Date().getFullYear()}. `}
        {` ${COMMON.OWNER.fullName()}. `}
        All rights reserved.
      </p>
    </StyledFooter>
  );
};

export default Footer;
