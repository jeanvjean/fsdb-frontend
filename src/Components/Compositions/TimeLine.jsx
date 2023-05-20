import React from 'react';
import styled from '@emotion/styled/macro';
import { css } from '@emotion/core';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0;
  position: relative;
  width: 100%;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.black};
  display: inline-block;
  font-size: ${({ theme }) => theme.fontSizes.xSmall};
  line-height: 1.6;
  text-align: left;
  width: 100%;
  word-break: break-word;
  margin-bottom: -0.05rem;
`;

const Square = styled.div`
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.mediumBue};
  cursor: pointer;
  display: flex;
  height: 0.45rem;
  justify-content: center;
  position: relative;
  transition: all 0.1s;
  width: 0.5rem;
  margin-right: 1rem;
  ${({ today, theme }) =>
    today &&
    css`
      background-color: ${theme.colors.mediumBue};
    `}
`;

const Step = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex: 1;
  position: relative;
  width: 100%;

  &:first-of-type {
    &:before {
      display: none;
    }
  }
  &:not(:first-of-type) {
    margin-top: 0.3rem;
    &::before {
      background-color: ${({ theme }) => theme.colors.mediumBue};
      bottom: calc(100% - 0.3rem);
      content: '';
      height: 0.95rem;
      left: 0.22rem;
      position: absolute;
      width: 1px;
    }
  }

  ${({ active, theme }) =>
    active &&
    css`
      @media (max-width: ${(p) => p.theme.breaks.MD}) {
        &:not(:last-child) {
          &::before {
            background-color: ${theme.colors.mediumBue};
          }
        }
      }
    `}
`;

export const Timeline = ({ active, steps, today }) => {
  return (
    <Wrapper>
      {steps && steps.map((x, i) => (
        <Step key={i} active={i <= active}>
          <Square today={today} />
          <Text>{x}</Text>
        </Step>
      ))}
    </Wrapper>
  );
};
