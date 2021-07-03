/**
 * TargetAwareLink
 * Will either return Link or Anchor link depending on if link is an internal/external link.
 */

/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';

type TargetAwareLink = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  LinkProps & {
    forceReload?: boolean;
  };

const Link = ({ to, forceReload = false, children, ...props }: TargetAwareLink) =>
  forceReload || /^https?:\/\//.test(to.toString()) ? (
    <a href={to.toString()} {...props}>
      {children}
    </a>
  ) : (
    <RouterLink to={to} {...props}>
      {children}
    </RouterLink>
  );

export default Link;
