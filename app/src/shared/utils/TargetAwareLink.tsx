/**
 * TargetAwareLink
 * Will either return Link or Anchor link depending on if link is an internal/external link.
*/

/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';

interface TargetAwareLink extends LinkProps {
  forceReload?: boolean,
}

const Link: React.FunctionComponent<TargetAwareLink> = ({
  to, forceReload = false, children, ...props
}: TargetAwareLink) => (
  (forceReload || (/^https?:\/\//.test(to.toString())))
    ? (
      <a href={to.toString()} {...props}>
        {children}
      </a>
    )
    : <RouterLink to={to} {...props}>{children}</RouterLink>);

export default Link;
