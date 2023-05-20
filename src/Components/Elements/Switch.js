import styled from '@emotion/styled/macro';
import { css } from '@emotion/core';

export const Switch = styled.div`
  background: #fff;
  border-radius: 2rem;
  border: 1px solid #e7e8f2;
  cursor: pointer;
  display: block;
  width: 38px;
  height: 21px;
  position: relative;

  span {
    font-size: 8px;
    letter-spacing: -0.2px;
    float: right;
    margin: 4px 1px 4px 0;
    color: #aaa;
  }

  &:after {
    background: #e7e8f2;
    border-radius: 1.8rem;
    content: '';
    left: 0.1rem;
    position: absolute;
    top: 0.05rem;
    transition: all 0.2s;
    width: 17px;
    height: 17px;
  }

  ${({ checked }) =>
    checked &&
    css`
      border-color: #574cc1;
      &:after {
        background: #574cc1;
        left: calc(100% - 0.1rem);
        transform: translateX(-100%);
      }
    `}
`;
