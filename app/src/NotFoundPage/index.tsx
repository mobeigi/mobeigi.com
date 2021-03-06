import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { StyledNotFoundPage } from './styled';
import { COMMON } from '../shared/constants/Common';
import { MonospacedParagraph } from '../shared/styles/common';

export const NotFoundPage = () => (
  <StyledNotFoundPage>
    <Helmet>
      <title>
        {COMMON.WEBSITE.titlePrefix}
        404 Not Found
      </title>
      <link rel="canonical" href={`${COMMON.WEBSITE.baseURL}/404`} />
    </Helmet>
    <MonospacedParagraph>
      Uh oh! A 404 Not Found error, thats not good.
      <br />
      Try visiting the{' '}
      <Link to="/" title="Homepage">
        homepage
      </Link>{' '}
      instead.
    </MonospacedParagraph>
  </StyledNotFoundPage>
);
