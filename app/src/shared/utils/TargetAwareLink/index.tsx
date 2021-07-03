/**
 * TargetAwareLink
 * Will either return Link or Anchor link depending on if link is an internal/external link.
 */

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';

type TargetAwareLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  LinkProps & {
    forceReload?: boolean;
  };

export const TargetAwareLink = ({ to, forceReload = false, children, ...props }: TargetAwareLinkProps) =>
  forceReload || /^https?:\/\//.test(to.toString()) ? (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <a href={to.toString()} {...props}>
      {children}
    </a>
  ) : (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <RouterLink to={to} {...props}>
      {children}
    </RouterLink>
  );
