import { css } from "@emotion/core";
import styled from "@emotion/styled";

export const Label = styled.label`
  display: flex;
  flex-flow: column nowrap;
  font-weight: 600;
  position: relative;
  flex: 1;
  font-size: ${({ theme }) => theme.fontSizes.small};
  ${({ error, theme }) =>
    error ? `color: ${theme.colors.red};` : `color: ${theme.colors.black2}`};
  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `};
`;
