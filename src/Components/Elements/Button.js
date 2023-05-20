import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Spinner } from './Spinner';

const StyledButton = styled.button`
  padding: 6px 20px;
  line-height: 14px;
  border-radius: 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: solid 2px transparent;
  -webkit-font-smoothing: antialiased;
  margin: 0;
  font-weight: 500;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  white-space: nowrap;
  background-image: none;
  background-color: ${({ bg, theme }) => theme.colors[bg]};
  color: ${({ color, theme }) => theme.colors[color]};
  margin-top: ${({ mt }) => mt};
  margin-bottom: ${({ mb }) => mb};
  margin-left: ${({ ml }) => ml};
  margin-right: ${({ mr }) => mr};
  -webkit-transition: all 0.15s;
  transition: all 0.15s;
  /* -webkit-box-shadow: 0 1px 6px rgba(57, 73, 76, 0.3);
  box-shadow: 0 1px 6px rgba(57, 73, 76, 0.3); */
  outline: none;

  &:hover {
    -webkit-box-shadow: 0 1px 7px rgba(57, 73, 76, 0.5);
    box-shadow: 0 1px 7px rgba(57, 73, 76, 0.5);
    transition: all 0.3s ease-in-out;
  }
  &:focus{
    outline: none;
  }
  &:disabled {
    opacity: 0.7;
    cursor: no-drop;
    box-shadow: 0;
    transition: 0;
    transform: translate(0);
    &:hover {
      -webkit-box-shadow: 0 0 0;
      box-shadow: 0 0 0;
    }
  }
  ${({ noShadow }) =>
    noShadow &&
    css`
      box-shadow: 0 0 0;
      &:hover {
        box-shadow: 0 0 0;
      }
    `}
`;

export const Button = ({ loading, children, ...props }) => {
  return <StyledButton {...props}>{loading ? <Spinner size="0.8rem" /> : children}</StyledButton>;
};
