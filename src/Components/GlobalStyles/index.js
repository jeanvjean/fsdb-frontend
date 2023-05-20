import { css } from '@emotion/core';
import styled from '@emotion/styled';

export const GlobalStyles = css`
@import url('https://fonts.googleapis.com/css?family=Lato:400,700&display=swap');
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  @media print {
    body,
    html,
    #wrapper {
      height: 100%;
      width: 100%;
    }
  }

  body {
    margin: 0;
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    line-height: 1.5;
    color: #8898ab;
    text-align: left;
    background-color: #f5f5f5;
    min-height: 100vh;
    width: 100%;
    overflow-x: hidden;

    .Toastify__toast--success {
      background-color: #574cc1 !important;
    }

  }

  .react-daterange-picker__calendar {
    z-index: 6000 !important;
  }

  .icon_cancel{
    color: #fff !important;
  }

  .optionContainer {
    width: 100%;
    height: 100%;
    border-bottom-left-radius: 15px  !important;
    border-bottom-right-radius: 15px !important;
  }    

  .optionContainer li:hover {
    background: #574CC2 !important;
    color: #ffffff;
  }  

  .optionListContainer {
    border-bottom-left-radius: 15px  !important;
    border-bottom-right-radius: 15px  !important;
  }

  .lhyQmCtWOINviMz0WG_gr {
    background: #574CC2 !important;
  }
`;

export const H3 = styled.h3`
  font-size: ${({ theme: { fontSizes } }) => fontSizes.normal};
  color: ${({ theme }) => theme.colors.black2};
  font-weight: 400;
  line-break: wrap;
`;
