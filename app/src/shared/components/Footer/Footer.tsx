import React from 'react';
import Link from '../../utils/Link';

import { StyledFooter } from './styled';
import COMMON from '../../constants/Common';

const footerItemList = [
  { link: '/', text: 'Home' },
  { link: '/blog', text: 'Blog' },
  { link: '/blog/projects', text: 'Projects' },
  { link: '/blog/easter-eggs', text: 'Easter Eggs' },
  { link: '/blog/about', text: 'About Me' },
  { link: '/blog/contact', text: 'Contact Me' },
  { link: '/blog/feed/rss', text: 'RSS' },
];

const Footer : React.FunctionComponent = () => {
  const footerItems = footerItemList.map<React.ReactNode>(
    (footerItem) => <Link key={footerItem.text} to={footerItem.link}>{footerItem.text}</Link>,
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
