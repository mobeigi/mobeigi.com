/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';

const Link: React.FunctionComponent<LinkProps> = ({ to, children, ...props }: LinkProps) => (
  ((/^https?:\/\//.test(to.toString())
    ? (
      <a href={to.toString()} {...props}>
        {children}
      </a>
    )
    : <RouterLink to={to} {...props}>{children}</RouterLink>)));

export default Link;
