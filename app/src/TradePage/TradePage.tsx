import React from 'react';
import { Helmet } from 'react-helmet';

import COMMON from '../shared/constants/Common';

const TradePage = () => (
  <>
    <Helmet>
      <title>
        {COMMON.WEBSITE.titlePrefix}
        Trades
      </title>
      <link rel="canonical" href={`${COMMON.WEBSITE.baseURL}/trades`} />
    </Helmet>
    <p>
      Work in progress. Check back later!
    </p>
  </>
);

export default TradePage;
