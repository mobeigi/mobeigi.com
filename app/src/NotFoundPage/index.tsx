import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import COMMON from '../shared/constants/Common';
import { MonospacedParagraph } from '../shared/styles/common';

const NotFoundPage = () => (
  <>
    <Helmet>
      <title>
        {COMMON.WEBSITE.titlePrefix}
        404 Error
      </title>
      <link rel="canonical" href={`${COMMON.WEBSITE.baseURL}/404`} />
    </Helmet>
    <MonospacedParagraph>
      Uh oh! A 404 error, thats not good.
      <br />
      Try visiting the{' '}
      <Link to="/" title="Homepage">
        homepage
      </Link>{' '}
      instead.
    </MonospacedParagraph>
  </>
);

export default NotFoundPage;
