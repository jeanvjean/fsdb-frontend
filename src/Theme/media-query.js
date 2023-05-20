import { css } from '@emotion/core';
import breaks from './breakpoints';

export const mq = Object.keys(breaks).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${breaks[label]}) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});
