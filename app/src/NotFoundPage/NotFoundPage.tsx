import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import COMMON from '../shared/constants/Common';

import { MonospacedParagraph } from '../shared/styles/common';

const NotFoundPage = () => {
  useEffect(() => {
    document.title = `${COMMON.WEBSITE.titlePrefix}404 error`;
  });
  return (
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
};

export default NotFoundPage;
