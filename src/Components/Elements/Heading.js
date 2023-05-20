import { css } from '@emotion/core';
import styled from '@emotion/styled';

const HeadingTag = ({ type: Component, children, ...props }) => (
  <Component {...props}>{children}</Component>
);

export const StyledHeading = styled(HeadingTag)`
  color: ${({ theme, color }) => (color ? theme.colors[color] : theme.colors.black)};
  &:visited {
    color: ${({ theme, color }) => theme.colors[color]};
  }
  display: block;
  font-weight: ${({ weight }) => weight};
  line-height: 1;
  margin: 0;
  position: relative;
  text-align: ${({ align }) => align};
  ${({ theme, type }) => css`
    font-size: ${theme.heading.mobile[type]};
  `}

  ${({ ellipsize }) =>
    ellipsize &&
    css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `}
`;

export const Heading = ({ children, ...props }) => (
  <StyledHeading {...props}>{children}</StyledHeading>
);
