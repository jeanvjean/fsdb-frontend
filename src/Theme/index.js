import colors from './colors';
import breaks from './breakpoints';
import fontSizes from './fontSizes';
import fontFamilies from './fontFamilies';
import { mq } from './media-query';
import { heading } from './typography';

export const theme = {
  colors,
  breaks: [...Object.values(breaks)],
  breaks,
  fontSizes,
  fontFamilies,
  heading,
  mq,
};
