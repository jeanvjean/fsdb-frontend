import { css } from '@emotion/core';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const TextTag = ({ tag: Component, children, ...props }) => {
  return <Component {...props}>{children}</Component>;
};

export const StyledText = styled(TextTag)`
  color: ${({ theme, color }) => theme.colors[color]};
  &:visited {
    color: ${({ theme, color }) => theme.colors[color]};
  }
  display: inline;
  font-size: ${({ theme, size }) => theme.fontSizes[size]};
  /* line-height: 1; */
  text-align: ${({ align }) => align};
  text-decoration: ${({ decoration }) => decoration};
  text-transform: ${({ transform }) => transform};
  width: ${({ width }) => width};
  padding-left: ${({ pl }) => pl ? pl : 0};
  padding-right: ${({ pr }) => pr ? pr : 0};
  font-weight: ${({ fw }) => fw ? fw : 'normal'};

  ${({ ellipsize }) =>
    ellipsize &&
    css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `}
`;

export const Text = ({ children, ...props }) => <StyledText {...props}>{children}</StyledText>;

TextTag.propTypes = {
  /**
   * Can be HTML tag or component. Takes in the HTML tag as string or a nextjs/react component
   */
  tag: PropTypes.node,
  /**
   * Represents the hypertext reference link
   */
  href: PropTypes.string,
};

Text.propTypes = {
  /**
   * The text alignment
   */
  align: PropTypes.oneOf(['center', 'initial', 'left', 'right']),
  /**
   * The text color
   */
  color: PropTypes.string,
  /**
   * CSS property for text decoration
   */
  decoration: PropTypes.oneOf([
    'none',
    'overline',
    'line-through',
    'underline',
    'underline overline',
  ]),
  /**
   * CSS Property for transforming text
   */
  transform: PropTypes.oneOf(['none', 'uppercase', 'lowercase', 'capitalize']),
  /**
   * Font weight of the text
   */
  weight: PropTypes.oneOf(['normal', 'medium', 'semiBold', 'bold']),
  /**
   * The size of the text.
   */
  size: PropTypes.oneOf(['inherit', 'mini', 'tiny', 'small', 'normal', 'medium', 'big', 'large']),
  /**
   * Content of the text
   */
  children: PropTypes.node.isRequired,
  /**
   * Clips overflowed text and displays a custom string. An example is (...)
   */
  ellipsize: PropTypes.bool,
  /**
   * Can be HTML tag or component. Takes in the HTML tag as string or a nextjs/react component
   */
  tag: PropTypes.node,
  /**
   * Represents the hypertext reference link
   */
  href: PropTypes.string,
};

TextTag.defaultProps = {
  tag: 'span',
  href: '',
};
Text.defaultProps = {
  align: 'initial',
  color: 'inherit',
  decoration: 'none',
  size: 'inherit',
  weight: 'normal',
  ellipsize: false,
  transform: 'none',
  tag: 'span',
  href: '',
};
