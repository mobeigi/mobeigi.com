import styled, { css } from 'styled-components';

const reemKufiFontFace = () => css`
  // https://fonts.googleapis.com/css?family=Reem+Kufi
  /* arabic */
  @font-face {
    font-family: 'Reem Kufi';
    font-style: normal;
    font-weight: 400;
    src: local('Reem Kufi Regular'), local('ReemKufi-Regular'),
      url(https://fonts.gstatic.com/s/reemkufi/v7/2sDcZGJLip7W2J7v7wQzbWW5O7w.woff2) format('woff2');
    unicode-range: U+0600-06FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE80-FEFC;
  }
  /* latin */
  @font-face {
    font-family: 'Reem Kufi';
    font-style: normal;
    font-weight: 400;
    src: local('Reem Kufi Regular'), local('ReemKufi-Regular'),
      url(https://fonts.gstatic.com/s/reemkufi/v7/2sDcZGJLip7W2J7v7wQzaGW5.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC,
      U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
`;

const StyledText = styled.span`
  ${reemKufiFontFace}
  font-family: 'Reem Kufi', sans-serif;
`;

export default StyledText;
