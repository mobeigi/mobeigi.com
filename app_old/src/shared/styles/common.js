import styled from 'styled-components';
import { css as coreCss } from '@emotion/core';
import { COLORS } from '../constants/Colors';

export const MonospacedParagraph = styled.p`
  font-family: monospace;
`;

export const StyledButton = styled.button`
  -moz-box-shadow: inset 0px 1px 0px 0px #ffffff;
  -webkit-box-shadow: inset 0px 1px 0px 0px #ffffff;
  box-shadow: inset 0px 1px 0px 0px #ffffff;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0.05, ${COLORS.alto}),
    color-stop(1, ${COLORS.grey})
  );
  background: -moz-linear-gradient(top, ${COLORS.alto} 5%, ${COLORS.grey} 100%);
  background: -webkit-linear-gradient(top, ${COLORS.alto} 5%, ${COLORS.grey} 100%);
  background: -o-linear-gradient(top, ${COLORS.alto} 5%, ${COLORS.grey} 100%);
  background: -ms-linear-gradient(top, ${COLORS.alto} 5%, ${COLORS.grey} 100%);
  background: linear-gradient(to bottom, ${COLORS.alto} 5%, ${COLORS.grey} 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='${COLORS.alto}', endColorstr='${COLORS.grey}',GradientType=0);
  background-color: ${COLORS.alto};
  -moz-border-radius: 6px;
  -webkit-border-radius: 6px;
  border-radius: 6px;
  border: 1px solid #dcdcdc;
  display: inline-block;
  cursor: pointer;
  color: #777777;
  font-weight: bold;
  padding: 6px 24px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #ffffff;
  width: fit-content;

  &:hover {
    background: -webkit-gradient(
      linear,
      left top,
      left bottom,
      color-stop(0.05, #ffffff),
      color-stop(1, ${COLORS.white})
    );
    background: -moz-linear-gradient(top, #ffffff 5%, ${COLORS.white} 100%);
    background: -webkit-linear-gradient(top, #ffffff 5%, ${COLORS.white} 100%);
    background: -o-linear-gradient(top, #ffffff 5%, ${COLORS.white} 100%);
    background: -ms-linear-gradient(top, #ffffff 5%, ${COLORS.white} 100%);
    background: linear-gradient(to bottom, #ffffff 5%, ${COLORS.white} 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FFFFFF', endColorstr='${COLORS.white}',GradientType=0);
    background-color: ${COLORS.white};
  }

  &:active {
    position: relative;
    top: 1px;
  }
`;

export const LoaderCss = coreCss`
    display: block;
    margin: 0 auto;
`;
