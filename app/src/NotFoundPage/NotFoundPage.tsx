import React from 'react';
import { Link } from 'react-router-dom';
import { MonospacedParagraph } from '../shared/styles/common';

const NotFoundPage = () => (
  <MonospacedParagraph>
    Uh oh! A 404 error, thats not good.
    <br />
    Try visiting the
    {' '}
    <Link to="/" title="Homepage">homepage</Link>
    {' '}
    instead.
  </MonospacedParagraph>
);

export default NotFoundPage;
