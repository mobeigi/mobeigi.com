import styled from 'styled-components';
import { css } from '@emotion/core';

export const MonospacedParagraph = styled.p`
    font-family: monospace;
`;

export const StyledButton = styled.button`
    -moz-box-shadow:inset 0px 1px 0px 0px #ffffff;
    -webkit-box-shadow:inset 0px 1px 0px 0px #ffffff;
    box-shadow:inset 0px 1px 0px 0px #ffffff;
    background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #ededed), color-stop(1, #c1c1c1));
    background:-moz-linear-gradient(top, #ededed 5%, #c1c1c1 100%);
    background:-webkit-linear-gradient(top, #ededed 5%, #c1c1c1 100%);
    background:-o-linear-gradient(top, #ededed 5%, #c1c1c1 100%);
    background:-ms-linear-gradient(top, #ededed 5%, #c1c1c1 100%);
    background:linear-gradient(to bottom, #ededed 5%, #c1c1c1 100%);
    filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ededed', endColorstr='#c1c1c1',GradientType=0);
    background-color:#ededed;
    -moz-border-radius:6px;
    -webkit-border-radius:6px;
    border-radius:6px;
    border:1px solid #dcdcdc;
    display:inline-block;
    cursor:pointer;
    color:#777777;
    font-weight:bold;
    padding:6px 24px;
    text-decoration:none;
    text-shadow:0px 1px 0px #ffffff;
    width: fit-content;

    &:hover {
        background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #FFFFFF), color-stop(1, #ededed));
        background:-moz-linear-gradient(top, #FFFFFF 5%, #ededed 100%);
        background:-webkit-linear-gradient(top, #FFFFFF 5%, #ededed 100%);
        background:-o-linear-gradient(top, #FFFFFF 5%, #ededed 100%);
        background:-ms-linear-gradient(top, #FFFFFF 5%, #ededed 100%);
        background:linear-gradient(to bottom, #FFFFFF 5%, #ededed 100%);
        filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#FFFFFF', endColorstr='#ededed',GradientType=0);
        background-color:#dfdfdf;
    }

    &:active {
        position:relative;
        top:1px;
    }
`;

export const LoaderCss = css`
    display: block;
    margin: 0 auto;
`;

export const FadeInDiv = styled.div`
    @keyframes fadein {
        from {
            opacity:0;
        }
        to {
            opacity:1;
        }
    }

    animation: fadein 1s;
`;

export default {
  MonospacedParagraph, StyledButton, LoaderCss, FadeInDiv,
};
