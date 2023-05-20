import styled from '@emotion/styled/macro';
import { css } from '@emotion/core';

export const Textarea = styled.textarea`
  -moz-appearance: none;
  -webkit-appearance: none;
  appearence: none;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0.4rem;
  border: solid 0.1rem #dededf;
  color: ${({ theme, textColor }) => theme.colors[textColor]};
  display: block;
  font-size: 1rem;
  font-family: 'Lato', sans-serif;
  margin: 0;
  outline: none;
  padding: 0.5rem 1.5rem;
  width: 100%;
  min-height: 10rem;

  &:disabled {
    background-color: rgba(128, 128, 128, 0.12);
  }

  &::placeholder {
    color: #b5b5b5;
  }

  ${props => {
    if (props.addonPosition) {
      return css`
        padding-${props.addonPosition}: 0.5rem;
      `;
    }
  }}
`;

Textarea.defaultProps = {
  backgroundColor: 'input',
  textColor: 'inputText',
};
